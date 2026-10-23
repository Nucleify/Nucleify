.PHONY: run setup web admin docs compiler vue react nuxt next solid svelte astro help

# Product apps: default shell is Nuxt. Product convert nests products under frameworks:
#   make web                 # top-level web/ (Nuxt)
#   make web TARGET=next     # web-next (scaffolded product shell)
#   make web TARGET=astro    # web-astro (Astro host + React islands)
#
# Portable emit demos (gitignored):
#   make nuxt / make next / make vue / make react / make solid / make svelte / make astro  → {framework}/demo
#
# SKIP_COMPILER=1  → skip portable codegen on run/setup / demos that call compiler

TARGET ?= nuxt
SKIP_COMPILER ?= 0

help:
	@echo "Workspace:"
	@echo "  make run                # install, husky, .env, prepare, sync-rules, compiler"
	@echo "  make setup              # same as run without creating .env"
	@echo ""
	@echo "Product apps:"
	@echo "  make web | admin | docs           # default TARGET=nuxt (top-level web/)"
	@echo "  make web TARGET=next              # web-next product shell"
	@echo "  make web TARGET=solid             # web-solid product shell"
	@echo "  make web TARGET=svelte            # web-svelte product shell"
	@echo "  make web TARGET=astro             # web-astro product shell"
	@echo "  make admin TARGET=next            # admin-next product shell"
	@echo "  make admin TARGET=solid           # admin-solid product shell"
	@echo "  make admin TARGET=svelte          # admin-svelte product shell"
	@echo "  make admin TARGET=astro           # admin-astro product shell"
	@echo ""
	@echo "Portable emit demos (gitignored {framework}/demo):"
	@echo "  make vue | react | nuxt | next | solid | svelte | astro"
	@echo ""
	@echo "Other:"
	@echo "  make compiler"
	@echo "  SKIP_COMPILER=1 make run"

compiler:
	pnpm compiler:check
	pnpm compiler:build

# Rebuild a gitignored demo at {framework}/demo, then start it.
define rebuild_demo
	rm -rf $(1)/demo
	pnpm exec tsx compiler/src/cli.ts scaffold $(1)
	pnpm exec tsx compiler/src/cli.ts build --app=$(1)
	cd $(1)/demo && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace $(2)
endef

run:
	@if [ ! -f .env ]; then \
		cp web/.config/.env.example .env; \
		echo "Created .env from web/.config/.env.example - fill in SUPABASE_* before using the API."; \
	fi
	$(MAKE) setup

setup:
	pnpm install
	pnpm prepare:husky
	pnpm --filter @nucleify/web prepare
	pnpm sync-rules
ifeq ($(SKIP_COMPILER),0)
	$(MAKE) compiler
endif

web:
ifeq ($(TARGET),nuxt)
	pnpm --filter @nucleify/web dev
else ifeq ($(TARGET),next)
	pnpm exec tsx compiler/src/cli.ts convert web --target=next
	pnpm exec tsx compiler/src/cli.ts build --app=next
	cd web-next && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace dev
else ifeq ($(TARGET),solid)
	pnpm exec tsx compiler/src/cli.ts convert web --target=solid
	pnpm exec tsx compiler/src/cli.ts build --app=solid
	cd web-solid && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace dev
else ifeq ($(TARGET),svelte)
	pnpm exec tsx compiler/src/cli.ts convert web --target=svelte
	pnpm exec tsx compiler/src/cli.ts build --app=svelte
	cd web-svelte && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace dev
else ifeq ($(TARGET),astro)
	pnpm exec tsx compiler/src/cli.ts convert web --target=astro
	pnpm exec tsx compiler/src/cli.ts build --app=astro
	cd web-astro && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace dev
else
	@echo "TARGET=$(TARGET) is not implemented for web product shell."
	@echo "Supported: TARGET=nuxt (default) | TARGET=next | TARGET=solid | TARGET=svelte | TARGET=astro"
	@echo "Emit-only demos (not product): make solid | make svelte | make astro"
	@echo "See portable/README.md"
	@exit 1
endif

admin:
ifeq ($(TARGET),nuxt)
	pnpm --filter @nucleify/admin dev
else ifeq ($(TARGET),next)
	pnpm exec tsx compiler/src/cli.ts convert admin --target=next
	cd admin-next && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace dev
else ifeq ($(TARGET),solid)
	pnpm exec tsx compiler/src/cli.ts convert admin --target=solid
	cd admin-solid && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace dev
else ifeq ($(TARGET),svelte)
	pnpm exec tsx compiler/src/cli.ts convert admin --target=svelte
	cd admin-svelte && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace dev
else ifeq ($(TARGET),astro)
	pnpm exec tsx compiler/src/cli.ts convert admin --target=astro
	cd admin-astro && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace dev
else
	@echo "TARGET=$(TARGET) is not implemented for admin product shell."
	@echo "Supported: TARGET=nuxt (default) | TARGET=next | TARGET=solid | TARGET=svelte | TARGET=astro"
	@echo "Emit-only demos (not product): make solid | make svelte | make astro"
	@exit 1
endif

docs:
	@echo "docs default host is Astro (@nucleify/docs)."
	@echo "TARGET=$(TARGET) is reserved for future multi-shell docs hosts."
	pnpm --filter @nucleify/docs dev

# --- Portable emit demos → {framework}/demo ---

vue:
	$(call rebuild_demo,vue,dev)

react:
	$(call rebuild_demo,react,dev)

nuxt:
	$(call rebuild_demo,nuxt,dev)

next:
	$(call rebuild_demo,next,dev)

solid:
	$(call rebuild_demo,solid,dev)

svelte:
	$(call rebuild_demo,svelte,dev)

astro:
	$(call rebuild_demo,astro,dev)
