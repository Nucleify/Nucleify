.PHONY: setup root admin docs compiler vue react nuxt next help

# Product apps: default shell is Nuxt. Other frameworks = tryb B (stub for now).
#   make root
#   make root TARGET=next    # not implemented yet
#   make admin TARGET=nuxt
#
# Portable emit demos (gitignored scaffolds):
#   make nuxt / make next / make vue / make react
#
# SKIP_COMPILER=1  → skip portable codegen on setup / demos that call compiler

TARGET ?= nuxt
SKIP_COMPILER ?= 0

SUPPORTED_PRODUCT_TARGETS := nuxt

help:
	@echo "Product apps (default TARGET=nuxt):"
	@echo "  make root | admin | docs"
	@echo "  make root TARGET=next   # stub — compiler tryb B later"
	@echo ""
	@echo "Portable emit demos (gitignored):"
	@echo "  make vue | react | nuxt | next"
	@echo ""
	@echo "Other:"
	@echo "  make setup | compiler"
	@echo "  SKIP_COMPILER=1 make setup"

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

setup:
	pnpm install
	pnpm prepare:husky
	pnpm --filter @nucleify/root prepare
	pnpm sync-rules
ifeq ($(SKIP_COMPILER),0)
	$(MAKE) compiler
endif

root:
	$(call require_product_target)
	cp root/.config/.env.example .env
	pnpm install
	pnpm prepare:husky
	pnpm --filter @nucleify/root nuxt

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
