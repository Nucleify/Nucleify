# <img src="https://nucleify.io/favicon.ico" width="17" height="17" /> &nbsp; nuc_documentation

Module that provides Markdown-based documentation pages with SSR/prerendering support.

## Features

- **Category-based organization** - Documentation organized by categories with nested pages
- **SSR & Prerendering** - Content is prerendered for instant loading
- **Table of Contents** - Auto-generated TOC with scroll tracking
- **Syntax highlighting** - Code blocks with highlight.js
- **Client-side navigation** - Fast navigation between pages via NuxtLink
- **Prefetching** - Background prefetch of documentation content
- **Responsive design** - Works on desktop and mobile

## Usage

1. Create `.md` files in `content/{category}/`
2. Register pages in `DOC_CATEGORIES` constant (`atomic/bosons/constants/documentation.ts`)

## Utils

| Function | Description |
|----------|-------------|
| `parseDocPath` | Parse URL path to category/slug |
| `parseMarkdown` | Convert markdown to HTML |
| `parseHeadings` | Extract headings from HTML |
| `loadDocContentServer` | Load content during SSR |
| `loadDocContentClient` | Load content on client |
| `useHeadings` | Scroll tracking for TOC |
| `useDocumentation` | Prefetch helpers |

<br>

<h2> &nbsp; <img src="https://nucleify.io/img/technologies/github.svg" width="25"> &nbsp; Contributors </h2> <br>

<a href="https://github.com/SzymCode" target="_blank"><img src="https://nucleify.io/img/contributors/szymcode.svg" width="30" height="30" /></a>
<a href="https://github.com/JakubMalik" target="_blank"><img src="https://nucleify.io/img/contributors/JakubMalik.svg" width="30" height="30" /></a>
