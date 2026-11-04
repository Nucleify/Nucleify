export const experimentalConfig = {
	// Workers Sites has no SWR payload store - `true` links `/…/_payload.js` and 404s
	// (MIME text/html|json → broken hydration). Inline payload instead.
	payloadExtraction: false,
	renderJsonPayloads: false,
	componentIslands: true,
	asyncContext: true,
	// Marketing home must not hard-reload when a new Worker deploy lands.
	// Default polls `/_nuxt/builds/latest.json` hourly and reloads via chunk-reload.
	checkOutdatedBuildInterval: false,
	// Default "automatic" → location.reload() on vite:preloadError / chunk miss.
	// On flaky mobile that loops every ~10s (nuxt:reload TTL). Never auto-reload.
	emitRouteChunkError: false,
	appManifest: false,
};
