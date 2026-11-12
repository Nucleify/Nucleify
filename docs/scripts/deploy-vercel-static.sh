#!/usr/bin/env bash
# Upload local Astro output only. A monorepo `.vercel/repo.json` makes
# `vercel deploy docs/dist` package the whole repo and run remote install.
set -euo pipefail

root="$(cd "$(dirname "$0")/../.." && pwd)"
dist="$root/docs/dist"

if [[ ! -d "$dist" ]]; then
	echo "Missing docs/dist — build @nucleify/docs first" >&2
	exit 1
fi

stage="$(mktemp -d "${TMPDIR:-/tmp}/nucleify-docs-static.XXXXXX")"
cleanup() { rm -rf "$stage"; }
trap cleanup EXIT

cp -a "$dist"/. "$stage"/
printf '%s\n' '{"framework":null,"buildCommand":"","installCommand":"","outputDirectory":"."}' >"$stage/vercel.json"

cd "$stage"
pnpm dlx vercel@latest deploy . --prod --yes -p nucleify-docs
