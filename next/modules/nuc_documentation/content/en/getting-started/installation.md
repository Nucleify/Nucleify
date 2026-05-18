# Installation

## Ready in Under 5 Minutes

Nucleify is designed for instant productivity. With a single command, you'll have a fully configured development environment running - complete with Laravel backend, Nuxt frontend, and database.

---

## Prerequisites

Before installing, ensure you have:

| Requirement | Version | Check Command |
|-------------|---------|---------------|
| **Docker** | Latest | `docker --version` |
| **Docker Compose** | Latest | `docker compose version` |
| **Node.js** | 20.x+ | `node --version` |
| **pnpm** | 9.x+ | `pnpm --version` |
| **Composer** | 2.x | `composer --version` |
| **Git** | Latest | `git --version` |

---

## One-Command Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Nucleify/Nucleify.git
cd Nucleify
```

### 2. Run the Magic Command

```bash
make
```

**That's it!** ☕ Grab a coffee while Nucleify:

- Copies environment configuration from `.config/`
- Installs PHP dependencies via Composer
- Installs Node.js dependencies via pnpm
- Sets up Git hooks with Husky
- Builds and starts Docker containers
- Runs database migrations and seeders

---

## What make Command Does?

Under the hood, the `make` command executes:

```bash
cp .config/.env.docker.example .env          # Environment config
composer install                              # PHP dependencies
pnpm install                                  # Node.js dependencies
cd next && pnpm install && cd ..              # Next.js (if used)
pnpm prepare:husky                           # Git hooks
./vendor/bin/sail up --build -d              # Docker containers
bash .config/bash/wait-for-db.sh              # Wait for MySQL readiness
./vendor/bin/sail art migrate:fresh --seed   # Database
```

---

## Access Your Application

Once setup completes, your application is ready:

| Service | URL |
|---------|-----|
| **Frontend (Nuxt)** | `http://localhost:3000` |
| **Backend (Laravel)** | `http://localhost` |
| **Database (MySQL)** | `http://localhost:3306` |

--- 

## Manual Installation (Alternative)

If you prefer not to use Docker:

### 1. Install Dependencies

```bash
composer install
pnpm install
```

### 2. Configure Environment

```bash
cp .config/.env.docker.example .env
php artisan key:generate
```

### 3. Database Setup

Configure your database in `.env`, then:

```bash
php artisan migrate:fresh --seed
```

### 4. Start Development Servers

```bash
# Terminal 1: Laravel
php artisan serve

# Terminal 2: Nuxt
pnpm run dev
```

---

## Troubleshooting

### Database Not Ready (Manual Setup)

If you run `sail up` and migrate separately, MySQL may not be ready yet. Run:

```bash
bash .config/bash/wait-for-db.sh
sail art migrate:fresh --seed
```

### Docker Issues

If containers fail to start:

```bash
docker compose down -v
make
```

### Permission Issues (Linux/Mac)

```bash
sudo chown -R $USER:$USER .
```

### Port Conflicts

If ports 80, 3000, or 3306 are in use, update `.config/docker-compose.yml` or stop conflicting services.

---

## Next Steps

🎉 **Congratulations!** You're ready to build.

1. **[Quick Start](/en/docs/getting-started/quick-start)** - Create your first component
2. **[Modules Overview](/en/docs/modules/overview)** - Explore available modules
3. **[Architecture](/en/docs/architecture/overview)** - Understand the system design

