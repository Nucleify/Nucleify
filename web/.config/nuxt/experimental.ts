export const experimentalConfig = {
	payloadExtraction: true,
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
