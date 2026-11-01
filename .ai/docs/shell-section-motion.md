# Shell section motion

Scroll reveals are owned by each marketing section. Shell boot (iris, hero cipher, thank-you assemble) stays in `playShellAnimations`.

## Ownership

| Piece | Path |
|-------|------|
| Boot options (product / pitch) | `web/src/templates/shell_boot/index.ts` |
| Thank-you boot | `web/src/sections/thank_you/motion.ts` |
| Per-section reveal specs | `web/src/sections/<name>/motion.ts` |
| Section bind | `useShellSectionReveal(rootEl, spec)` in the section SFC |
| Reveal engine | `web/src/utils/shell_section_reveal.ts` |
| Boot player | `web/src/utils/play_shell_animations.ts` |

Layout / thank-you page pass boot options into `playShellAnimations(root, boot)`. After hero boot the shell fires scroll-ready; sections that called `useShellSectionReveal` then bind their IntersectionObserver reveals.

## Static shells (Astro)

Vue `onMounted` does not run on static Astro markup. Boot islands import `product_shell_reveals.ts` / `pitch_shell_reveals.ts` (aggregates of the same `motion.ts` specs) and call `bindShellSectionReveals`.

## Verify

```sh
pnpm -s check && pnpm -s typeslint && pnpm -s slint && pnpm -s tests
```
