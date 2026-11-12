import {
	defineOrganization,
	definePerson,
	defineSoftwareApp,
	defineWebSite,
} from "nuxt-schema-org/schema";

const baseDescription =
	"Yes - migrate any existing Next, Nuxt, Vue, React, or other supported app as-is. Install @nucleify/cli and run nuc emit (interactive shell). No *.nuc.tsx rewrite, no shared_modules gate. Vue · React · Nuxt · Next · Astro · Svelte · Solid.";

const person = definePerson({
	name: "Szymon Radomski",
	alternateName: "SzymCode",
	image: "https://nucleify.io/img/contributors/szymcode.svg",
	url: "https://github.com/SzymCode",
	sameAs: ["https://github.com/SzymCode"],
});

const organization = defineOrganization({
	name: "Nucleify",
	url: "https://nucleify.io",
	logo: "https://nucleify.io/img/holo-cube.svg",
	description: baseDescription,
	sameAs: [
		"https://github.com/Nucleify/Nucleify",
		"https://discord.gg/NuShhvUE",
	],
	founder: person,
});

export const schemaOrgConfig = {
	identity: organization,

	organization,

	website: defineWebSite({
		name: "Nucleify",
		url: "https://nucleify.io",
		description: baseDescription,
		inLanguage: "en",
		sameAs: [
			"https://github.com/Nucleify/Nucleify",
			"https://discord.gg/NuShhvUE",
		],
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: "https://nucleify.io/search?q={search_term_string}",
			},
			"query-input": "required name=search_term_string",
		},
	}),

	softwareApplication: defineSoftwareApp({
		name: "Nucleify",
		applicationCategory: "DeveloperApplication",
		operatingSystem: "Web",
		description: baseDescription,
		url: "https://nucleify.io",
		downloadUrl: "https://github.com/Nucleify/Nucleify",
		softwareVersion: "1.0.0",

		author: person,
		publisher: organization,
		isPartOf: {
			"@type": "WebSite",
			name: "Nucleify",
			url: "https://nucleify.io",
		},

		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD",
		},

		programmingLanguage: ["TypeScript", "Vue", "React"],
		runtimePlatform: ["Node.js", "Nuxt", "Next.js"],
	}),
};
