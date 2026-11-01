#!/usr/bin/env python3
"""Rewrite web/admin relative imports to bare package aliases + generate barrels."""
from __future__ import annotations

import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
WEB_SRC = ROOT / "web" / "src"
ADMIN_SRC = ROOT / "admin" / "src"
SHARED = ROOT / "shared_modules"
PORTABLE = ROOT / "portable"

PACKAGE_ROOTS = {
    "@web": WEB_SRC,
    "@admin": ADMIN_SRC,
    "@shared_modules": SHARED,
    "@portable": PORTABLE,
}

# Full import/export-from statement (single or multi-line).
# Do not let trailing \s* eat newlines after the statement.
STMT_RE = re.compile(
    r"(?P<full>"
    r"(?P<indent>^[ \t]*)"
    r"(?P<head>export\s+type\s+|export\s+|import\s+type\s+|import\s+)"
    r"(?P<clause>\*\s+as\s+\w+|\*|\{[^{}]*\}|\w+(?:\s*,\s*\{[^{}]*\})?)"
    r"[ \t]*from[ \t]+['\"](?P<spec>[^'\"]+)['\"]"
    r"[ \t]*;?"
    r")",
    re.M | re.S,
)

DYNAMIC = re.compile(r"""import\(\s*['"]([^'"]+)['"]\s*\)""")


def strip_ext(path: Path) -> str:
    s = path.as_posix()
    for ext in (".ts", ".tsx", ".js", ".jsx", ".mjs", ".mts", ".cts"):
        if s.endswith(ext):
            return s[: -len(ext)]
    return s


def resolve_to_alias(file: Path, spec: str) -> tuple[str, Path] | None:
    if spec.startswith("~/"):
        if (
            WEB_SRC in file.parents
            or str(file).startswith(str(WEB_SRC))
            or str(file).startswith(str(ROOT / "web" / "vitests"))
        ):
            base, alias = WEB_SRC, "@web"
        else:
            base, alias = ADMIN_SRC, "@admin"
        return alias, (base / spec[2:]).resolve()

    if spec.startswith("portable/") or spec == "portable":
        target = (
            (PORTABLE / spec[len("portable/") :]).resolve()
            if spec.startswith("portable/")
            else PORTABLE
        )
        return "@portable", target

    if spec.startswith("modules/") or spec == "modules":
        target = (
            (SHARED / spec[len("modules/") :]).resolve()
            if spec.startswith("modules/")
            else SHARED
        )
        return "@shared_modules", target

    if "shared_modules/" in spec:
        rest = spec.split("shared_modules/", 1)[1]
        return "@shared_modules", (SHARED / rest).resolve()

    if not (spec.startswith("./") or spec.startswith("../")):
        return None

    target = (file.parent / spec).resolve()
    for alias, root in PACKAGE_ROOTS.items():
        try:
            target.relative_to(root.resolve())
            return alias, target
        except ValueError:
            continue
    return None


def find_module_file(target: Path) -> Path | None:
    if target.exists() and target.is_file():
        return target
    for ext in (".ts", ".tsx", ".vue", ".js", ".jsx"):
        p = Path(str(target) + ext)
        if p.exists():
            return p
    if target.is_dir():
        for name in ("index.ts", "index.tsx", "index.vue", "index.js"):
            p = target / name
            if p.exists():
                return p
    return None


def module_export_path(alias: str, file_path: Path) -> str:
    root = PACKAGE_ROOTS[alias].resolve()
    rel = file_path.resolve().relative_to(root)
    s = rel.as_posix()
    if s.endswith((".ts", ".tsx", ".js", ".jsx")):
        s = strip_ext(Path(s))
    if s.endswith("/index"):
        s = s[: -len("/index")]
    return s


def parse_bindings(
    clause: str, is_type_import: bool
) -> list[tuple[str, str | None, bool]]:
    clause = clause.strip()
    results: list[tuple[str, str | None, bool]] = []
    m = re.match(r"^(\w+)\s*,\s*\{([\s\S]*)\}\s*$", clause)
    if m:
        results.append((m.group(1), None, is_type_import))
        clause = "{" + m.group(2) + "}"
    elif re.match(r"^\w+$", clause):
        results.append((clause, None, is_type_import))
        return results
    else:
        ns = re.match(r"^\*\s+as\s+(\w+)$", clause)
        if ns:
            results.append((ns.group(1), "*", is_type_import))
            return results
        if clause.strip() == "*":
            results.append(("*", "*", is_type_import))
            return results

    if clause.startswith("{"):
        inner = clause.strip()[1:-1]
        for part in inner.split(","):
            part = part.strip()
            if not part:
                continue
            t = part.startswith("type ")
            if t:
                part = part[5:].strip()
            if " as " in part:
                remote, local = [x.strip() for x in part.split(" as ", 1)]
            else:
                remote = local = part
            results.append((local, remote, is_type_import or t))
    return results


def should_rewrite_spec(spec: str) -> bool:
    return (
        spec.startswith("./")
        or spec.startswith("../")
        or spec.startswith("~/")
        or "shared_modules/" in spec
        or spec.startswith("portable/")
        or spec.startswith("modules/")
        or spec in ("portable", "modules")
    )


def is_same_package_relative(file: Path, spec: str) -> bool:
    """Keep intra-package relatives — rewriting them to @web/@admin creates cycles."""
    if not (spec.startswith("./") or spec.startswith("../")):
        return False
    resolved = resolve_to_alias(file, spec)
    if not resolved:
        return False
    alias, _target = resolved
    try:
        file.resolve().relative_to(PACKAGE_ROOTS[alias].resolve())
        return True
    except ValueError:
        return False


def pascal_from_path(exp: str) -> str:
    name = Path(exp).name
    if name == "index":
        name = Path(exp).parent.name
    parts = re.split(r"[_\-/]", name)
    return "".join(p[:1].upper() + p[1:] for p in parts if p)


def is_type_head(head: str) -> bool:
    h = head.strip()
    return h.startswith("import type") or h.startswith("export type")


def main() -> None:
    barrel_modules: dict[str, set[str]] = defaultdict(set)
    vue_default_names: dict[tuple[str, str], str] = {}

    files_to_process: list[Path] = []
    for base in (WEB_SRC, ADMIN_SRC):
        files_to_process += list(base.rglob("*.ts"))
        files_to_process += list(base.rglob("*.vue"))
    vitests = ROOT / "web" / "vitests"
    if vitests.exists():
        files_to_process += list(vitests.rglob("*.ts"))

    for f in files_to_process:
        text = f.read_text(errors="ignore")
        for m in STMT_RE.finditer(text):
            spec = m.group("spec")
            if not should_rewrite_spec(spec):
                continue
            # Still register same-package modules in the barrel, but do not rewrite.
            resolved = resolve_to_alias(f, spec)
            if not resolved:
                continue
            alias, target = resolved
            mod = find_module_file(target)
            if not mod:
                print(f"WARN unresolved: {f}:{spec}")
                continue
            exp = module_export_path(alias, mod)
            barrel_modules[alias].add(exp)
            for local, remote, _ in parse_bindings(
                m.group("clause"), is_type_head(m.group("head"))
            ):
                if remote is None and mod.suffix == ".vue":
                    vue_default_names[(alias, exp)] = local

        for m in DYNAMIC.finditer(text):
            spec = m.group(1)
            if not should_rewrite_spec(spec):
                continue
            if is_same_package_relative(f, spec):
                # Keep dynamic relative paths (esp. .vue) for code-splitting.
                resolved = resolve_to_alias(f, spec)
                if resolved:
                    alias, target = resolved
                    mod = find_module_file(target)
                    if mod:
                        barrel_modules[alias].add(module_export_path(alias, mod))
                continue
            resolved = resolve_to_alias(f, spec)
            if not resolved:
                continue
            alias, target = resolved
            mod = find_module_file(target)
            if mod:
                barrel_modules[alias].add(module_export_path(alias, mod))

    for alias in list(barrel_modules):
        barrel_modules[alias].discard("index")
        # Client barrels must not re-export Nitro/server modules (Vue boundary).
        barrel_modules[alias] = {
            m
            for m in barrel_modules[alias]
            if m != "server"
            and not m.startswith("server/")
            and m != "index.server"
        }

    print("Barrel module counts:")
    for a, mods in sorted(barrel_modules.items()):
        print(f"  {a}: {len(mods)}")

    def write_app_barrel(alias: str, modules: set[str]) -> None:
        root = PACKAGE_ROOTS[alias]
        lines = [
            f"/** Auto-generated package barrel — import via `{alias}`. */",
            "",
        ]
        for exp in sorted(modules):
            vue_path = root / f"{exp}.vue"
            if vue_path.exists():
                name = vue_default_names.get((alias, exp)) or pascal_from_path(exp)
                vue_default_names[(alias, exp)] = name
                lines.append(f"export {{ default as {name} }} from './{exp}.vue'")
            else:
                lines.append(f"export * from './{exp}'")
        lines.append("")
        out = root / "index.ts"
        out.write_text("\n".join(lines))
        print(f"Wrote {out} ({len(modules)} exports)")

    write_app_barrel("@web", barrel_modules.get("@web", set()))
    write_app_barrel("@admin", barrel_modules.get("@admin", set()))

    skip_roots = {
        WEB_SRC / "index.ts",
        WEB_SRC / "index.server.ts",
        ADMIN_SRC / "index.ts",
        ADMIN_SRC / "index.server.ts",
    }
    changed_files = 0

    for f in files_to_process:
        if f in skip_roots:
            continue
        text = f.read_text(errors="ignore")
        original = text

        def repl_stmt(m: re.Match[str]) -> str:
            indent = m.group("indent")
            head = m.group("head")
            clause = m.group("clause").strip()
            spec = m.group("spec")
            if not should_rewrite_spec(spec):
                return m.group(0)
            # Intra-package relatives stay relative (avoids @web ↔ module cycles).
            if is_same_package_relative(f, spec):
                return m.group(0)
            resolved = resolve_to_alias(f, spec)
            if not resolved:
                return m.group(0)
            alias, target = resolved
            mod = find_module_file(target)
            if not mod:
                return m.group(0)

            # Normalize clause whitespace for output
            flat_clause = re.sub(r"\s+", " ", clause).strip()

            if flat_clause == "*":
                return f"{indent}{head}* from '{alias}'"

            is_type = is_type_head(head)
            bindings = parse_bindings(clause, is_type)
            if not bindings:
                return m.group(0)

            new_parts: list[str] = []
            namespace = None
            for local, remote, is_t in bindings:
                if remote is None:
                    if mod.suffix == ".vue":
                        exp = module_export_path(alias, mod)
                        name = vue_default_names.get((alias, exp), local)
                        new_parts.append(
                            local if name == local else f"{name} as {local}"
                        )
                    else:
                        return m.group(0)
                elif remote == "*":
                    namespace = local
                else:
                    piece = remote if remote == local else f"{remote} as {local}"
                    if is_t and not is_type:
                        new_parts.append(f"type {piece}")
                    else:
                        new_parts.append(piece)

            if namespace:
                prefix = "import " if head.strip().startswith("import") else head
                if is_type:
                    return f"{indent}import type * as {namespace} from '{alias}'"
                return f"{indent}{prefix}* as {namespace} from '{alias}'"

            if not new_parts:
                return m.group(0)

            named = ", ".join(new_parts)
            if is_type and head.strip().startswith("import"):
                return f"{indent}import type {{ {named} }} from '{alias}'"
            if head.strip().startswith("export type"):
                return f"{indent}export type {{ {named} }} from '{alias}'"
            if head.strip().startswith("export"):
                return f"{indent}export {{ {named} }} from '{alias}'"
            return f"{indent}import {{ {named} }} from '{alias}'"

        text2 = STMT_RE.sub(repl_stmt, text)

        def repl_dyn(m: re.Match[str]) -> str:
            spec = m.group(1)
            if not should_rewrite_spec(spec):
                return m.group(0)
            if is_same_package_relative(f, spec):
                return m.group(0)
            resolved = resolve_to_alias(f, spec)
            if not resolved:
                return m.group(0)
            return f"import('{resolved[0]}')"

        text2 = DYNAMIC.sub(repl_dyn, text2)

        if text2 != original:
            f.write_text(text2)
            changed_files += 1

    # Remaining relative from-specs?
    left = 0
    for f in files_to_process:
        if f in skip_roots:
            continue
        text = f.read_text(errors="ignore")
        for m in re.finditer(r"""from\s+['"]([^'"]+)['"]""", text):
            if should_rewrite_spec(m.group(1)):
                left += 1
                if left <= 15:
                    print(f"LEFT: {f}: {m.group(1)}")
    print(f"Rewrote {changed_files} files; leftover relative specs: {left}")


if __name__ == "__main__":
    main()
