# Feature-Sliced Design

Feature-Sliced Design (FSD) organizuje kod **według domeny biznesowej**, a nie według warstw technicznych. W Nucleify każdy pakiet `shared_modules/nuc_*` to jeden slice — narzędzia frontendowe, handlery API, migracje bazy, typy i testy w jednym katalogu.

---

## Dlaczego feature slices?

Projekty warstwowe rozpraszają jedną funkcję po wielu folderach:

```txt
# ❌ Warstwy first                         # ✅ Feature-sliced (Nucleify)

src/                                    shared_modules/
├── api/                                ├── nuc_api/
│   ├── colors.ts                       │   ├── supabase/api/gateway_dispatch.ts
│   └── languages.ts                    │   ├── utils/api_request.ts
├── types/                              │   └── vitests/
│   ├── colors.ts                       ├── nuc_colors/
│   └── languages.ts                    │   ├── supabase/api/handle.ts
├── styles/                             │   ├── styles/
│   └── colors.scss                     │   └── vitests/
└── tests/                              └── nuc_languages/
    └── colors.test.ts                      └── …
```

Problemy warstw w skali monorepo:

- Dodanie funkcji dotyka 5+ katalogów
- Usunięcie funkcji to polowanie na pliki w całym drzewie
- Równoległa praca na różnych funkcjach powoduje konflikty merge
- Własność kodu jest niejasna

FSD naprawia to, czyniąc **moduł jednostką zmiany**.

---

## Jak Nucleify stosuje FSD

### Moduły współdzielone = slice domeny

Sześć modułów mapuje się na cross-cutting domeny produktu:

| Moduł | Slice |
|-------|-------|
| `nuc_api` | Klient HTTP, gateway, formularze auth, stan encji |
| `nuc_colors` | Theming, tokeny SCSS, API kolorów |
| `nuc_dark_mode` | Preferencja wyglądu |
| `nuc_globals` | Breakpointy, wspólne typy, globalny SCSS |
| `nuc_languages` | Locale, fetch tłumaczeń, plugin i18n |
| `nuc_stores` | Abstrakcje persystencji klienta |

Każdy slice jest importowany przez `web/` i `admin/` bez duplikacji.

### Aplikacje = warstwy kompozycji

Aplikacje produktowe to cienkie powłoki kompozycyjne:

```txt
web/src/
├── pages/[lang]/           # routing + wrappery i18n
├── pages/home/             # kompozycja landing (sekcje)
├── composables/            # tylko specyficzne dla app
├── plugins/                # podpięcie modułów do Nuxt
└── server/api/             # jedno wejście gateway
```

**Zasada:** jeśli logika należy do domeny, żyje w `shared_modules/nuc_*`. Jeśli należy do jednej powłoki app (routing, layout, struktura copy marketingowego), zostaje w `web/` lub `admin/`.

---

## Warstwy wewnętrzne modułu

W module foldery mają lekki układ inspirowany FSD:

| Folder | Analog FSD | Zawartość |
|--------|------------|-----------|
| `supabase/api/` | Backend / API | Handlery gateway, tabele tras |
| `utils/` | Shared lib | Composables, hooki, funkcje czyste |
| `types/` | Shared types | Interfejsy, literały typów |
| `constants/` | Shared config | Wartości statyczne, definicje pól |
| `components/` | UI (opcjonalnie) | Widgety wielokrotnego użytku dla domeny |
| `styles/` | UI tokens | Partiale SCSS |
| `vitests/` | Testy | Testy jednostkowe obok domeny |

Nie ma sztywnego nazewnictwa `entities/features/widgets` — Nucleify preferuje **płaskie moduły domenowe** zamiast głębokiej ceremonii FSD. Liczy się zasada (co-lokacja po funkcji), nie etykiety folderów.

---

## Komunikacja między slice'ami

Moduły komunikują się przez **zdefiniowane publiczne eksporty**, nie przez głębokie importy wewnętrzności innego modułu:

```typescript
// ✅ Publiczny barrel
import { apiRequest } from 'modules/nuc_api/utils/api_request'

// ❌ Sięgnij w prywatny helper innego modułu
import { internalHelper } from 'modules/nuc_colors/supabase/api/colors_helpers'
```

Dispatch gateway w `nuc_api` to punkt orkiestracji HTTP — moduły rejestrują handlery, ale routing między domenami dzieje się w gateway, nie przez cross-importy w `utils/`.

---

## Portable UI vs logika domeny

Kompilator dodaje drugą oś:

| Warstwa | Lokalizacja | Powiązanie z frameworkiem |
|---------|-------------|---------------------------|
| Portable UI | `*.nuc.tsx` | Brak — emit Vue + React |
| Logika domeny | `shared_modules/nuc_*/utils/` | Composables Vue + hooki `.react.ts` |
| Powłoka app | `web/src/pages/` | Nuxt (Tryb A) lub Next (Tryb B, generowany) |

Trzymaj store, routery, kontenery i18n i wywołania API **poza** `*.nuc.tsx`. Komponenty portable dostają dane przez props i emitują eventy — slice domeny robi wiring w utils app lub modułu.

---

## Porównanie z Atomic Design

Nucleify używa **Atomic Design** w SCSS (`atoms/`, `molecules/`, `organisms/` pod `nuc_colors/styles/components/`) dla hierarchii wizualnej. FSD i Atomic Design rozwiązują różne problemy:

- **FSD** — gdzie w repo żyje kod funkcji
- **Atomic Design** — jak komponenty UI się zagnieżdżają wizualnie

Współistnieją: partial organismu `nuc_colors` nadal jest częścią slice `nuc_colors`.

---

## Dodawanie funkcji po FSD

1. **Zidentyfikuj domenę** — nowy slice czy rozszerzenie istniejącego `nuc_*`?
2. **Co-lokuj** — handler API, typy, utils, migracje, testy w jednym folderze modułu
3. **Eksportuj publicznie** — `index.ts` / `index.react.ts`
4. **Podłącz app** — rejestracja pluginu, handler gateway, kompozycja strony
5. **Unikaj kopii w app** — jeśli dwie app tego potrzebują, należy do `shared_modules/`

---

## Powiązane docs

- [Moduły](/pl/docs/core-concepts/modules) — referencja modułów
- [Układ monorepo](/pl/docs/core-concepts/monorepo) — granice app vs shared
- [Kompilator](/pl/docs/core-concepts/compiler) — warstwa portable UI
