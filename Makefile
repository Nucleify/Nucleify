.PHONY: run setup web admin docs compiler deploy vue react nuxt next solid svelte astro help

# Product apps: default host is Nuxt. Product convert nests products under frameworks:
#   make web                      # top-level web/ (Nuxt)
#   make web --target=next        # web-next (via .config/bin/make shim)
#   make web -t=astro             # short form (same shim)
#   make web TARGET=next          # classic GNU make assignment (no shim)
#   make deploy web               # build + wrangler deploy (@nucleify/web)
#   make deploy admin             # build + wrangler deploy (@nucleify/admin)
#
# Put the shim first so --target= / -t= work:
#   export PATH="$PWD/.config/bin:$PATH"
#
# Portable emit demos (gitignored):
#   make nuxt / make next / make vue / make react / make solid / make svelte / make astro  → {framework}/demo
#
# SKIP_COMPILER=1  → skip portable codegen on run/setup / demos that call compiler

TARGET ?= nuxt
# Stock make also accepts: make web target=next
ifneq ($(origin target),undefined)
ifneq ($(target),)
override TARGET := $(target)
endif
endif
SKIP_COMPILER ?= 0

# `make deploy web` → goals are deploy + web; pick the app from MAKECMDGOALS.
DEPLOY_APP := $(firstword $(filter web admin,$(MAKECMDGOALS)))

.DEFAULT_GOAL := help

# Framework values accepted by web/admin product convert.
WEB_TARGETS := nuxt next solid svelte astro
ADMIN_TARGETS := nuxt next solid svelte astro
DEMO_TARGETS := vue react nuxt next solid svelte astro

# COLOR=1 forces ANSI even when stdout is not a TTY; NO_COLOR=1 always disables.
help:
	@if { [ -t 1 ] || [ "$(COLOR)" = "1" ]; } && [ -z "$${NO_COLOR:-}" ]; then \
		B=$$'\033[1m'; D=$$'\033[2m'; R=$$'\033[0m'; \
		C=$$'\033[36m'; M=$$'\033[35m'; Y=$$'\033[33m'; G=$$'\033[32m'; W=$$'\033[37m'; \
	else \
		B=''; D=''; R=''; C=''; M=''; Y=''; G=''; W=''; \
	fi; \
	printf '%s\n' \
		"$${B}$${C}Nucleify Make$${R}" \
		"" \
		"$${B}$${Y}Usage$${R}" \
		"  $${G}make$${R} $${W}<command>$${R} $${D}[flags] [VAR=value]$${R}" \
		"" \
		"$${B}$${Y}Commands$${R}" \
		"  $${G}help$${R}                 Show this help (default)" \
		"  $${G}run$${R}                  Install deps, husky, create .env if missing, prepare, sync-rules, compiler" \
		"  $${G}setup$${R}                Same as run, but never create .env" \
		"  $${G}web$${R}                  Dev server for the web app (default host: nuxt → web/)" \
		"  $${G}admin$${R}                Dev server for the admin app (default host: nuxt → admin/)" \
		"  $${G}docs$${R}                 Dev server for docs (@nucleify/docs, Astro)" \
		"  $${G}deploy$${R} $${W}<web|admin>$${R}   Production Nuxt build + wrangler deploy" \
		"  $${G}compiler$${R}             Typecheck + build the compiler package" \
		"  $${G}$(DEMO_TARGETS)$${R}" \
		"                       Rebuild gitignored portable demo at <framework>/demo and start it" \
		"" \
		"$${B}$${Y}Flags$${R} $${D}(web / admin — require shim on PATH)$${R}" \
		"  $${D}export PATH=\"\$$PWD/.config/bin:\$$PATH\"$${R}" \
		"" \
		"  $${M}-t$${R} $${W}<framework>$${R}       Short form (space-separated value)" \
		"  $${M}-t=$${R}$${W}<framework>$${R}       Short form" \
		"  $${M}--target$${R} $${W}<framework>$${R} Long form (space-separated value)" \
		"  $${M}--target=$${R}$${W}<framework>$${R} Long form" \
		"" \
		"  $${D}web frameworks:$${R}      $${C}$(WEB_TARGETS)$${R}" \
		"  $${D}admin frameworks:$${R}    $${C}$(ADMIN_TARGETS)$${R}" \
		"" \
		"$${B}$${Y}Variables$${R} $${D}(stock GNU make — no shim needed)$${R}" \
		"  $${M}TARGET=$${R}$${W}<framework>$${R}   Same as --target= (default: $${C}nuxt$${R})" \
		"  $${M}target=$${R}$${W}<framework>$${R}   Lowercase alias for TARGET" \
		"  $${M}SKIP_COMPILER=$${R}$${W}1$${R}      Skip compiler on run/setup (default: 0)" \
		"" \
		"$${B}$${Y}Examples$${R}" \
		"  $${G}make run$${R}" \
		"  $${G}make web$${R}" \
		"  $${G}make web$${R} $${M}--target=$${R}$${C}next$${R}" \
		"  $${G}make web$${R} $${M}-t=$${R}$${C}astro$${R}" \
		"  $${G}make web$${R} $${M}--target$${R} $${C}next$${R}" \
		"  $${G}make web$${R} $${M}-t$${R} $${C}solid$${R}" \
		"  $${G}make web$${R} $${M}TARGET=$${R}$${C}svelte$${R}" \
		"  $${G}make admin$${R} $${M}--target=$${R}$${C}next$${R}" \
		"  $${G}make deploy$${R} $${W}web$${R}" \
		"  $${G}make deploy$${R} $${W}admin$${R}" \
		"  $${M}SKIP_COMPILER=1$${R} $${G}make setup$${R}" \
		"  $${G}make next$${R}                          $${D}# portable demo only$${R}"

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

# When chained as `make deploy web`, skip the usual `web`/`admin` dev recipes.
web:
ifneq ($(filter deploy,$(MAKECMDGOALS)),)
	@:
else ifeq ($(TARGET),nuxt)
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
	@echo "--target=$(TARGET) is not implemented for web."
	@echo "Supported: nuxt (default) | next | solid | svelte | astro"
	@echo "Emit-only demos (not product): make solid | make svelte | make astro"
	@echo "See portable/README.md"
	@exit 1
endif

admin:
ifneq ($(filter deploy,$(MAKECMDGOALS)),)
	@:
else ifeq ($(TARGET),nuxt)
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
	@echo "--target=$(TARGET) is not implemented for admin."
	@echo "Supported: nuxt (default) | next | solid | svelte | astro"
	@echo "Emit-only demos (not product): make solid | make svelte | make astro"
	@exit 1
endif

# Build Nuxt app, then Cloudflare Workers deploy via wrangler.
# Usage: make deploy web | make deploy admin
# Public URLs are baked into Nuxt runtimeConfig at build time — override local .env.
deploy:
ifeq ($(DEPLOY_APP),)
	@echo "Usage: make deploy web  or  make deploy admin"
	@exit 1
else
	@test -f $(DEPLOY_APP)/wrangler.toml || ( \
		echo "Missing $(DEPLOY_APP)/wrangler.toml - add Cloudflare Workers config before deploy."; \
		exit 1)
	APP_ENV=production \
	APP_DEBUG=false \
	NUXT_PUBLIC_APP_URL=https://nucleify.io \
	NUXT_PUBLIC_ADMIN_URL=https://admin.nucleify.io \
	NUC_API_ORIGIN=https://admin.nucleify.io \
	pnpm --filter @nucleify/$(DEPLOY_APP) build
	pnpm --filter @nucleify/$(DEPLOY_APP) exec wrangler deploy
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
