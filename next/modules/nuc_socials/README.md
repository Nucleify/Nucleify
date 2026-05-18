# <img src="https://nucleify.io/favicon.ico" width="17" height="17" /> &nbsp; nuc_socials

Floating dock with social and messenger links (fixed bottom-left). Icons come from `@iconify/react` (MDI presets in `constants/social_presets.ts`).

**Component:** `NucSocialsDock`, exported from `nuc_socials.ts`.

## Usage

```tsx
<NucSocialsDock />
<NucSocialsDock items={myLinks} />
```

`items` is optional. Each row is `SocialLinkInputInterface`: `key`, `url`, optional `icon` / `label`. Unknown `key` values use a generic link icon and a label derived from the key. Presets (Telegram, GitHub, etc.) live in `constants/social_presets.ts`. Default URLs are in `constants/default_social_links.ts`.

## Layout

| Path | Role |
|------|------|
| `NucSocialsDock.tsx` | Dock UI |
| `constants/` | Presets, fallback icon, default link list |
| `types/` | `SocialLinkInputInterface`, `SocialItemInterface` |
| `utils/` | `useSocialsLinks`, `resolveSocial`, `labelFromKey` |

Imports of **runtime** symbols inside this module should stay **relative** (avoid circular `nucleify` barrel). `import type … from 'nucleify'` is fine for types.

<br>

<h2> &nbsp; <img src="https://nucleify.io/img/technologies/github.svg" width="25"> &nbsp; Contributors </h2> <br>

<a href="https://github.com/SzymCode" target="_blank"><img src="https://nucleify.io/img/contributors/szymcode.svg" width="30" height="30" /></a>
