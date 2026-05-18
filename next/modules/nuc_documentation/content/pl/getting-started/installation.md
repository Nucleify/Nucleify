# Instalacja

## Gotowe w Mniej niż 5 Minut

Nucleify został zaprojektowany z myślą o natychmiastowej produktywności. Jedną komendą otrzymasz w pełni skonfigurowane środowisko deweloperskie - z backendem Laravel, frontendem Nuxt i bazą danych.

---

## Wymagania

Przed instalacją upewnij się, że masz:

| Wymaganie | Wersja | Komenda sprawdzająca |
|-----------|--------|---------------------|
| **Docker** | Najnowsza | `docker --version` |
| **Docker Compose** | Najnowsza | `docker compose version` |
| **Node.js** | 20.x+ | `node --version` |
| **pnpm** | 9.x+ | `pnpm --version` |
| **Composer** | 2.x | `composer --version` |
| **Git** | Najnowsza | `git --version` |

---

## Instalacja Jedną Komendą

### 1. Sklonuj Repozytorium

```bash
git clone https://github.com/Nucleify/Nucleify.git
cd Nucleify
```

### 2. Uruchom Magiczną Komendę

```bash
make
```

**To wszystko!** ☕ Napij się kawy, podczas gdy Nucleify:

- Kopiuje konfigurację środowiska z `.config/`
- Instaluje zależności PHP przez Composer
- Instaluje zależności Node.js przez pnpm
- Konfiguruje hooki Git z Husky
- Buduje i uruchamia kontenery Docker
- Wykonuje migracje i seedery bazy danych

---

## Co Robi Komenda make?

Pod spodem komenda `make` wykonuje:

```bash
cp .config/.env.docker.example .env           # Konfiguracja środowiska
composer install                              # Zależności PHP
pnpm install                                  # Zależności Node.js
cd next && pnpm install && cd ..              # Next.js (jeśli używany)
pnpm prepare:husky                           # Hooki Git
./vendor/bin/sail up --build -d              # Kontenery Docker
bash .config/bash/wait-for-db.sh              # Oczekiwanie na gotowość MySQL
./vendor/bin/sail art migrate:fresh --seed   # Baza danych
```

---

## Dostęp do Aplikacji

Po zakończeniu konfiguracji aplikacja jest gotowa:

| Usługa | URL |
|--------|-----|
| **Frontend (Nuxt)** | `http://localhost:3000` |
| **Backend (Laravel)** | `http://localhost` |
| **Baza danych (MySQL)** | `http://localhost:3306` |

---

## Instalacja Manualna (Alternatywa)

Jeśli wolisz nie używać Dockera:

### 1. Zainstaluj Zależności

```bash
composer install
pnpm install
```

### 2. Skonfiguruj Środowisko

```bash
cp .config/.env.docker.example .env
php artisan key:generate
```

### 3. Konfiguracja Bazy Danych

Skonfiguruj bazę danych w `.env`, następnie:

```bash
php artisan migrate:fresh --seed
```

### 4. Uruchom Serwery Deweloperskie

```bash
# Terminal 1: Laravel
php artisan serve

# Terminal 2: Nuxt
pnpm run dev
```

---

## Rozwiązywanie Problemów

### Baza Nie Jest Gotowa (Instalacja Manualna)

Jeśli uruchamiasz `sail up` i migracje oddzielnie, MySQL może nie być jeszcze gotowe. Uruchom:

```bash
bash .config/bash/wait-for-db.sh
sail art migrate:fresh --seed
```

### Problemy z Dockerem

Jeśli kontenery nie uruchamiają się:

```bash
docker compose down -v
make
```

### Problemy z Uprawnieniami (Linux/Mac)

```bash
sudo chown -R $USER:$USER .
```

### Konflikty Portów

Jeśli porty 80, 3000 lub 3306 są zajęte, zaktualizuj `.config/docker-compose.yml` lub zatrzymaj konfliktujące usługi.

---

## Następne Kroki

🎉 **Gratulacje!** Jesteś gotowy do budowania.

1. **[Szybki Start](/pl/docs/getting-started/quick-start)** - Stwórz swój pierwszy komponent
2. **[Przegląd Modułów](/pl/docs/modules/overview)** - Poznaj dostępne moduły
3. **[Architektura](/pl/docs/architecture/overview)** - Zrozum projektowanie systemu


