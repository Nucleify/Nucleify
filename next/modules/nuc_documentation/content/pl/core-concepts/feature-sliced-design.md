# Feature-Sliced Design

Feature-Sliced Design (FSD) organizuje kod według domeny biznesowej zamiast warstw technicznych. Każdy moduł to samodzielna jednostka z własnym frontendem, backendem, bazą danych i testami.

## Kluczowe zasady

- Jedna funkcjonalność na moduł
- Eksportuj tylko to co potrzebne przez `index.ts`
- Małe moduły - dziel gdy potrzeba
- Testy obok kodu

## Tradycyjna vs Feature-Sliced

```txt
# ❌ Warstwowa                   # ✅ Domenowa
src/                             modules/
├── controllers/                 ├── nuc_auth/
│   ├── AuthController.php       │   ├── app/Controllers/
│   └── UserController.php       │   ├── app/Models/
├── models/                      │   ├── atomic/pages/
│   └── User.php                 │   └── tests/
└── views/                       └── nuc_entities/
    └── auth/                        ├── app/Controllers/
                                     └── atomic/pages/
```

## Korzyści

| Korzyść | Opis |
|---------|------|
| **Wysoka spójność** | Cały powiązany kod w jednym miejscu |
| **Niskie powiązania** | Moduły niezależne, włącz/wyłącz przez `config.json` |
| **Jasne granice** | Jawne API przez eksporty `index.ts` |
| **Skalowalność zespołu** | Zespoły pracują na oddzielnych modułach bez konfliktów |
| **Łatwe testowanie** | Testy obok kodu który testują |

## Zależności warstw

**Backend (`app/`):**
Controllers → Services → Models

**Frontend (`atomic/`):**
pages → templates → bosons (types, utils, constants)

## Importy między modułami

```typescript
import { userRequests, type UserInterface } from 'modules/nuc_entities'
```

Współdzielone narzędzia w dedykowanych modułach: `nuc_api`, `nuc_globals`, `nuc_stores`

## Szybkie porównanie

| Aspekt | Warstwowa | Feature-Sliced |
|--------|-----------|----------------|
| Szukanie kodu | Wiele folderów | Jeden folder |
| Dodanie funkcji | Dotknij wiele miejsc | Dodaj jeden folder |
| Usunięcie funkcji | Szukaj rozproszonych plików | Usuń jeden folder |
