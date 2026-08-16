.PHONY: run setup web admin docs compiler vue react nuxt next help

# Product apps: default shell is Nuxt. Other frameworks = tryb B (stub for now).
#   make run                 # bootstrap whole workspace
#   make web                 # start web only
#   make web TARGET=next     # not implemented yet
#   make admin TARGET=nuxt
#
# Portable emit demos (gitignored scaffolds):
#   make nuxt / make next / make vue / make react
#
# SKIP_COMPILER=1  → skip portable codegen on run/setup / demos that call compiler

TARGET ?= nuxt
SKIP_COMPILER ?= 0

SUPPORTED_PRODUCT_TARGETS := nuxt

help:
	@echo "Workspace:"
	@echo "  make run                # install, husky, .env, prepare, sync-rules, compiler"
	@echo "  make setup              # same as run without creating .env"
	@echo ""
	@echo "Product apps (default TARGET=nuxt):"
	@echo "  make web | admin | docs"
	@echo "  make web TARGET=next    # stub — compiler tryb B later"
	@echo ""
	@echo "Portable emit demos (gitignored):"
	@echo "  make vue | react | nuxt | next"
	@echo ""
	@echo "Other:"
	@echo "  make compiler"
	@echo "  SKIP_COMPILER=1 make run"

compiler:
	pnpm compiler:build

# Rebuild a gitignored demo app from templates + portable emit, then start it.
define rebuild_demo
	rm -rf $(1)
	pnpm exec tsx compiler/src/cli.ts scaffold $(1)
	pnpm exec tsx compiler/src/cli.ts build --app=$(1)
	cd $(1) && pnpm install --ignore-workspace --config.dangerouslyAllowAllBuilds=true && pnpm run --ignore-workspace $(2)
endef

define require_product_target
	@if [ "$(TARGET)" = "nuxt" ]; then \
		true; \
	else \
		echo "TARGET=$(TARGET) is not implemented for this app yet."; \
		echo "Default/canonical shell: TARGET=nuxt"; \
		echo "Other frameworks (next, react, …) land with compiler tryb B."; \
		echo "See portable/README.md and .ai/specs/PLAN.md"; \
		exit 1; \
	fi
endef

run:
	@if [ ! -f .env ]; then \
		cp web/.config/.env.example .env; \
		echo "Created .env from web/.config/.env.example — fill in SUPABASE_* before using the API."; \
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
	$(call require_product_target)
	pnpm --filter @nucleify/web dev

admin:
	$(call require_product_target)
	pnpm --filter @nucleify/admin dev

docs:
	$(call require_product_target)
	@echo "docs default host is Astro (@nucleify/docs), not Nuxt."
	@echo "TARGET=$(TARGET) is reserved for future multi-shell docs hosts."
	pnpm --filter @nucleify/docs dev

# --- Portable emit demos (not product apps) ---

vue:
	$(call rebuild_demo,vue,dev)

react:
	$(call rebuild_demo,react,dev)

nuxt:
	$(call rebuild_demo,nuxt,dev)

next:
	$(call rebuild_demo,next,dev)
