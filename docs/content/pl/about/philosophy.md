# Filozofia

> *"Napisz raz, uruchom wszędzie. Przestań wymyślać na nowo — zacznij budować."*

Podstawowe zasady, wartości i wizja stojąca za Nucleify.

---

## Wizja

Nowoczesny development webowy jest rozdrobniony. Wybierasz framework, wiążesz się z jego ekosystemem i za każdym razem budujesz te same funkcje od zera. Gdy wymagania się zmieniają — na przykład migracja z Vue do React — wszystko przepisujesz. Wierzymy, że jest lepszy sposób.

Nucleify to **modularny framework full-stack** z przenośnym kompilator UI UI w sercu. Napisz komponenty raz w Vue lub `*.nuc.tsx`, a kompilator automatycznie generuje gotowy do produkcji React (lub odwrotnie). Bez ręcznych przepisań. Bez uzależnienia od frameworka. **Jedna baza kodu, każdy cel.**

---

## Metafora jądra

Jak jądro komórki, Nucleify jest **centrum dowodzenia** Twojej aplikacji. Każdy moduł (`nuc_*`) to samodzielna jednostka — kompletna z własnym backendem, frontendem i testami — zdolna do niezależnego funkcjonowania, jednocześnie wnosząca wkład w większy organizm.

To nie tylko branding. To architektura:

- **Samodzielne moduły** — Każda funkcja jest kompletna sama w sobie
- **Wyraźne granice** — Moduły komunikują się przez zdefiniowane interfejsy
- **Organiczny wzrost** — Dodawaj lub usuwaj moduły bez psucia systemu
- **Siła zbiorowa** — Razem moduły tworzą coś większego niż suma części

---

## Podstawowe zasady

### 1. Napisz raz, uruchom wszędzie

Kompilator Nucleify ucieleśnia naszą filozofię „buduj szybciej". Pisz przenośne komponenty `*.nuc.tsx` — lub twórz bezpośrednio w Vue — i otrzymuj automatycznie output React jakości produkcyjnej. Konwertuj całe powłoki produktu jedną komendą:

```bash
pnpm compiler -- convert
```

Koniec z utrzymywaniem równoległych baz kodu. Koniec z ręcznymi migracjami frameworków. **Kompilator rozwiązuje problem przenośności.**

### 2. Modułowość jest niepodlegotna

> *"Sekret budowania dużych aplikacji to nigdy nie budować dużych aplikacji."* — Justin Meyer

Wszystko w Nucleify to moduł. Nie dlatego, że to modne, ale dlatego, że działa:

| Korzyść | Dlaczego to ważne |
|---------|-------------------|
| **Izolacja** | Zmień jeden moduł bez strachu o zepsucie innych |
| **Wielokrotne użycie** | Używaj tego samego modułu w wielu projektach |
| **Skalowalność** | Dodawaj funkcje bez wykładniczej złożoności |
| **Testowalność** | Testuj moduły niezależnie z pewnością |
| **Prędkość zespołu** | Zespoły posiadają moduły, nie pliki rozrzucone wszędzie |

### 3. Jedność full-stack

Backend i frontend należą do siebie. Każdy moduł zawiera oba:

```txt
shared_modules/nuc_languages/
├── supabase/           # Migracje, seedery, handlery API
├── utils/              # Composables i helpery
├── vitests/            # Testy
└── config.json         # Metadane modułu
```

Bez przełączania kontekstu między repozytoriami. Bez zamieszania w kontraktach API. **Jeden moduł, jedna funkcja, jedno źródło prawdy.**

### 4. Konwencja zamiast konfiguracji

Nucleify podąża za konwencjami Nuxt, Next i Supabase. Dlaczego?

- **Zero zmęczenia decyzjami** — Skup się na budowaniu, nie konfigurowaniu
- **Natychmiastowa znajomość** — Full-stack developerzy czują się jak u siebie
- **Mądrość społeczności** — Sprawdzone wzorce zamiast wymyślania na nowo
- **Przewidywalna struktura** — Znajdź dowolny plik w sekundy

### 5. Type safety full-stack

TypeScript wszędzie — od typów bazy Supabase po props komponentów Vue po wygenerowany output React. Typy przepływają przez cały stack, łapiąc błędy w czasie kompilacji zamiast w produkcji.

### 6. Wydajność domyślnie

Nucleify dostarcza **94+ wyników PageSpeed** od razu po starcie:

- SSR i prerendering z inteligentną hydracją
- Atomic Design umożliwia chirurgiczny code-splitting
- Zoptymalizowane fonty, obrazy i lazy-loading
- Odroczone ładowanie treści przez `nui-deferred-content`
- Buildy napędzane Vite z optymalnym chunkingiem

**Wydajność nie jest dodatkiem. Jest wbudowana.**

### 7. Developer Experience na pierwszym miejscu

Świetne DX to nie luksus — to mnożnik:

- `make` — Jedna komenda, aby uruchomić wszystko
- Jasne komunikaty błędów wskazujące rozwiązania
- Hot reload, który naprawdę działa
- Type safety przez cały stack
- Dokumentacja szanująca Twój czas

---

## Filozofia jakości

### Jakość kodu

> *"Zawsze koduj tak, jakby osoba utrzymująca Twój kod była agresywnym psychopatą, który wie, gdzie mieszkasz."* — John Woods

- **Czytelność nad sprytem** — Kod czyta się 10× częściej niż pisze
- **Jawność nad domyślnością** — Bez magii, bez niespodzianek
- **Małe, skupione funkcje** — Jedna funkcja, jedno zadanie
- **Znaczące nazwy** — `getUserById()` a nie `get()`
- **Typuj wszystko** — TypeScript przez cały stack

### Filozofia testowania

- **Testuj zachowanie, nie implementację** — Co robi, nie jak
- **Wysokie pokrycie dla krytycznych ścieżek** — Auth, płatności, integralność danych
- **Szybkie, niezawodne testy** — Wolne testy nie są uruchamiane
- **Vitest** — Ujednolicone testowanie w modułach

### Filozofia dokumentacji

- **Dokumentuj „dlaczego"** — Kod pokazuje „co", docs wyjaśniają „dlaczego"
- **Trzymaj docs blisko kodu** — README.md w każdym module
- **Aktualizuj ze zmianami** — Nieaktualne docs są gorsze niż brak docs
- **Szanuj czas developera** — Zwięźle, skanowalnie, actionable

---

## Wartości open source

### Transparentność

Rozwój odbywa się otwarcie. Decyzje są dokumentowane. Roadmapy są publiczne. Bez czarnych skrzynek.

### Inkluzywność

Każdy wkład ma znaczenie:

- 🐛 Raporty błędów poprawiają jakość
- 💡 Sugestie funkcji kształtują kierunek
- 📝 Dokumentacja pomaga wszystkim
- 🔧 Wkład kodowy buduje funkcje

### Współpraca

Budujemy razem. Code review to okazje do nauki. Dyskusje są pełne szacunku. Każdy ma głos.

### Szacunek

Czas jest cenny. Nie marnujemy Twojego przez:

- Niepotrzebną złożoność
- Słabą dokumentację
- Breaking changes bez ścieżek migracji
- Gatekeeping wkładów

---

## Przyszłość

Nucleify ewoluuje przez:

- **Feedback społeczności** — Ty kształtujesz roadmapę
- **Ciągłe doskonalenie** — Regularny refactoring, nigdy stagnacja
- **Innowacje kompilatora** — Rozszerzanie przenośności na nowe cele
- **Adopcja best practices** — Uczenie się od ekosystemu
- **Utrzymanie kompatybilności** — Aktualizacje nie powinny psuć Twojej aplikacji

> *"Jedyną stałą jest zmiana."* — Heraklit

Ale niektóre rzeczy się nie zmieniają: **modułowość, przenośność, wydajność, developer experience i szacunek dla Twojego czasu.**

---

## Nastawienie

Podejście, które napędza każdą linię kodu w Nucleify:

---

> *"Ten człowiek o małej wiedzy starzeje się jak wół; tylko jego ciało rośnie, ale nie jego mądrość."*
> — Siddhartha Gautama

Nigdy nie przestawaj się uczyć. Technologia ewoluuje — my też musimy.

---

> *"Kto ma po co żyć, zniesie prawie każde jak."*
> — Friedrich Nietzsche

Cel napędza wytrwałość. Wiedz, dlaczego budujesz, a przeszkody stają się rozwiązywalne.

---

> *"Nie życz sobie, żeby było łatwiej. Życz sobie, żebyś był lepszy."*
> — Jim Rohn

Złożoność jest nieunikniona. Rozwijaj umiejętności zamiast unikać wyzwań.

---

> *"Strach nigdy nie osiągnął najwyższego celu."*
> — Bô Yin Râ

Nie bój się refactoringu, nowych technologii ani ambitnych zmian. Odwaga w kodzie prowadzi do przełomów.

---

Buduj z celem. Wdrażaj wszędzie. Skaluj z pewnością.

---

## Dołącz do nas

**Napisz raz. Uruchom wszędzie. Buduj nowocześnie. Wdrażaj z pewnością.**

Budujemy coś niesamowitego. [Dołącz do nas.](https://github.com/nucleify/nucleify)
