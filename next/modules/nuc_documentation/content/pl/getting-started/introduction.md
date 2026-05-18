# Wprowadzenie

## Buduj szybciej. Skaluj bez wysiłku. Wdrażaj z pewnością.

**Nucleify** to modularny full-stack framework, który eliminuje chaos współczesnego web developmentu. Jedna komenda do startu. Ponad 40 sprawdzonych modułów gotowych do wdrożenia. Zero nadmiarowej konfiguracji.

> *"Przestań wymyślać koło na nowo. Zacznij budować swój produkt. Teraz!"*

Napędzany przez **Laravel 11** + **Nuxt 3** - najpotężniejszą kombinację backend-frontend w branży - Nucleify przekształca miesiące developmentu w dni, zachowując przy tym jakość kodu na poziomie enterprise i wyniki PageSpeed 94+.

---

## Czym jest Nucleify?

Za szybkością stoi **modularna architektura inspirowana jądrem atomu** - każda funkcjonalność żyje jako samodzielny, niezależnie testowalny moduł. Koniec z poplątanymi zależnościami. Koniec z "u mnie działa". Tylko czysty, przewidywalny kod, który skaluje się wraz z Twoim zespołem i ambicjami.

**Laravel 11** obsługuje Twoje API, uwierzytelnianie i logikę biznesową. **Nuxt 3** dostarcza błyskawiczne SSR i reaktywny frontend. Nucleify łączy je płynnie - jeden codebase, jeden workflow, nieskończone możliwości.

### Liczby

| Metryka | Wartość |
|---------|---------|
| **Czas do MVP** | < 5 minut setup |
| **Dostępność** | Zgodność z WCAG 2.1 AA |
| **Wynik PageSpeed** | 94/100 |
| **Wynik SEO** | 100/100 |
| **Pokrycie testami** | 92% |
| **Moduły produkcyjne** | 40+ |
| **Komponenty UI** | 100+ |

### Co otrzymujesz

- **40+ gotowych modułów produkcyjnych** - Auth, pliki, wykresy, datatables, animacje - wszystko wbudowane
- **Pełne typowanie** - TypeScript + PHP type hints = zero niespodzianek w runtime
- **System Atomic Design** - 100+ komponentów zgodnych z najlepszymi praktykami branży
- **System Override** - Dostosuj dowolny moduł bez forkowania, zachowaj ścieżki aktualizacji
- **Setup jedną komendą** - `make` i już działasz

---

## Dlaczego wybrać Nucleify?

| Wyzwanie | ❌ Tradycyjne podejście | ✅ Rozwiązanie Nucleify |
|----------|-------------------------|-------------------------|
| **Rosnąca złożoność** | Monolityczny codebase staje się niemożliwy do zarządzania | Samodzielne moduły skalują się niezależnie |
| **Ponowne użycie kodu** | Kopiuj-wklej między projektami | Moduły są przenośne i współdzielone |
| **Trudności z testowaniem** | Ściśle powiązany kod trudno testować | Izolowane moduły umożliwiają skupione testy |
| **Współpraca zespołowa** | Konflikty merge i wzajemne przeszkadzanie | Zespoły są właścicielami konkretnych modułów |

---

## Przegląd architektury

Nucleify implementuje **płynne połączenie** między Laravel a Nuxt:

```txt
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                    NUXT 3 FRONTEND                                     │
│                                                                                        │
│  ┌────────────────────┐  ┌────────────────────┐  ┌──────────────────────────────────┐  │
│  │       Pages        │  │      Layouts       │  │        Atomic Components         │  │
│  │      (Router)      │  │  (Default, Admin)  │  │  (Atoms, Molecules, Organisms)   │  │
│  └────────────────────┘  └────────────────────┘  └──────────────────────────────────┘  │
│                                           │                                            │
│  ┌────────────────────────────────────────▼─────────────────────────────────────────┐  │
│  │                           ZARZĄDZANIE STANEM PINIA                               │  │
│  │                         (Persystentne, Reaktywne, Typowane)                      │  │
│  └────────────────────────────────────────┬─────────────────────────────────────────┘  │
│                                           │                                            │
│  ┌────────────────────────────────────────▼─────────────────────────────────────────┐  │
│  │                           MODUŁ nuc_api (Warstwa HTTP)                           │  │
│  │                       Uwierzytelnianie Laravel Sanctum                           │  │
│  └────────────────────────────────────────┬─────────────────────────────────────────┘  │
└───────────────────────────────────────────┼────────────────────────────────────────────┘
                                            │
                                         REST API
                                            │
┌───────────────────────────────────────────▼────────────────────────────────────────────┐
│                                   LARAVEL 11 BACKEND                                   │
│                                                                                        │
│  ┌─────────────────────────┐  ┌──────────────────────────┐  ┌───────────────────────┐  │
│  │       Controllers       │  │         Services         │  │        Models         │  │
│  │         (HTTP)          │◄─│     (Logika Biznesowa)   │◄─│     (Eloquent ORM)    │  │
│  └─────────────────────────┘  └──────────────────────────┘  └───────────────────────┘  │
│                                            │                                           │
│  ┌─────────────────────────────────────────▼────────────────────────────────────────┐  │
│  │                                   BAZA DANYCH MySQL                              │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Podstawowe zasady projektowe

### Atomic Design

Komponenty UI zorganizowane w hierarchiczną strukturę dla maksymalnej wielokrotnego użycia. Wszystkie komponenty używają prefiksu `ad-` (Atomic Design):

| Poziom | Opis | Przykłady |
|--------|------|-----------|
| **Boson** | Funkcje użytkowe, stałe, typy | `camelToKebab()`, `API_BASE_URL` |
| **Atom** | Podstawowe elementy UI | `<ad-button>`, `<ad-input-text>`, `<ad-avatar>` |
| **Molecule** | Kombinacje atomów | `<ad-float-label>`, `<ad-anchor>`, `<ad-tile>` |
| **Organism** | Złożone struktury komponentów | `<ad-data-table>`, `<ad-dialog>`, `<ad-chart>` |

### Architektura modularna

Nucleify zawiera **ponad 40 gotowych modułów produkcyjnych** zorganizowanych według domeny:

| Kategoria | Moduły |
|-----------|--------|
| **Core** | `nuc_modules`, `nuc_api`, `nuc_stores`, `nuc_globals` |
| **Auth** | `nuc_auth`, `nuc_friendship`, `nuc_activity` |
| **Data** | `nuc_entities`, `nuc_files`, `nuc_database`, `nuc_fields` |
| **UI** | `nuc_charts`, `nuc_datatable`, `nuc_dialog`, `nuc_navigation` |
| **Visual** | `nuc_animations`, `nuc_colors`, `nuc_screen_loader`, `nuc_screen_lights` |
| **Layout** | `nuc_pages`, `nuc_sections`, `nuc_templates` |

Każdy moduł jest samodzielny, niezależnie testowalny i może być włączany/wyłączany w razie potrzeby.

### Feature-Sliced Design

Każdy moduł zawiera cały powiązany kod w jednym katalogu:

```
modules/nuc_auth/
├── app/                    # Backend PHP (Controllers, Services, Models)
├── atomic/                 # Komponenty frontend (Vue, TypeScript)
├── database/               # Migracje, Seedery, Factories
├── routes/                 # Definicje tras API
├── tests/                  # Testy Pest PHP
├── vitests/                # Testy Vitest frontend
└── config.json             # Metadane modułu
```

### System nadpisań

Moduł `nuc_overrides` zapewnia potężną warstwę nadpisywania bez modyfikacji kodu źródłowego:

```
overrides/
├── modules/
│   └── nuc_settings/       # Nadpisz moduł nuc_settings
│       ├── components/     # Własne komponenty
│       └── constants/      # Własne stałe
└── nuxt/
    └── atomic/             # Nadpisz globalne komponenty Nuxt atomic
        ├── atom/           # Własne atomy
        ├── molecule/       # Własne molekuły
        └── organism/       # Własne organizmy
```

Nadpisania są automatycznie scalane podczas budowania, co pozwala na:
- **Dostosowanie komponentów UI** bez forkowania modułów
- **Rozszerzanie funkcjonalności** zachowując ścieżki aktualizacji
- **Modyfikacje specyficzne dla projektu** pozostające izolowane od kodu źródłowego
- **Swobodne aktualizacje frameworka** - Twoje dostosowania przetrwają `git pull`

---

## Stack technologiczny

| Warstwa | Technologie |
|---------|-------------|
| **Backend** | Laravel 11, PHP 8.2+, Laravel Sanctum, Pest PHP |
| **Frontend** | Nuxt 3, Vue 3, TypeScript, Pinia, PrimeVue 4 |
| **Stylowanie** | SCSS, GSAP, Chart.js |
| **DevOps** | Docker, Vite, Husky, Biome, TSC, Stylelint |
| **Testowanie** | Pest, Vitest |

---

## Następne kroki

1. **[Instalacja](/pl/docs/getting-started/installation)** - Skonfiguruj środowisko deweloperskie
2. **[Szybki start](/pl/docs/getting-started/quick-start)** - Stwórz swój pierwszy komponent
3. **[Moduły](/pl/docs/modules/overview)** - Odkryj dostępne moduły
4. **[Architektura](/pl/docs/architecture/overview)** - Głębokie zanurzenie w projektowanie systemu

