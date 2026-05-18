# Konfiguracja Laravel

Konfiguracja backendu w katalogu `config/`.

## Pliki konfiguracyjne

| Plik | Cel |
|------|-----|
| `config/app.php` | Nazwa aplikacji, env, timezone, locale, providery |
| `config/database.php` | Połączenia z bazą danych (MySQL, PostgreSQL, SQLite) |
| `config/modules.php` | Zarejestrowane moduły Nucleify |
| `config/cors.php` | Cross-Origin Resource Sharing |
| `config/session.php` | Sterownik sesji i ustawienia cookies |
| `config/cache.php` | Sterowniki cache |

## Aplikacja (`config/app.php`)

```php
return [
    'name' => env('APP_NAME', 'Nucleify'),
    'env' => env('APP_ENV', 'dev'),
    'debug' => (bool) env('APP_DEBUG', true),
    'url' => env('APP_URL', 'http://localhost'),
    'timezone' => 'Europe/Warsaw',
    'locale' => 'en',
    'key' => env('APP_KEY'),
    'cipher' => 'AES-256-CBC',
];
```

| Opcja | Opis |
|-------|------|
| `name` | Nazwa aplikacji |
| `env` | Środowisko (`local`, `production`) |
| `debug` | Pokaż szczegółowe błędy |
| `url` | Bazowy URL dla komend artisan |
| `timezone` | Domyślna strefa czasowa |
| `locale` | Domyślny język |
| `key` | Klucz szyfrowania (wygeneruj przez `php artisan key:generate`) |

## Moduły (`config/modules.php`)

Zarejestruj moduły backend:

```php
return [
    Modules\nuc_activity\nuc_activity::class,
    Modules\nuc_auth\nuc_auth::class,
    Modules\nuc_colors\nuc_colors::class,
    Modules\nuc_entities\nuc_entities::class,
    Modules\nuc_entities_structural\nuc_entities_structural::class,
    Modules\nuc_files\nuc_files::class,
    Modules\nuc_friendship\nuc_friendship::class,
    Modules\nuc_modules\nuc_modules::class,
    Modules\nuc_overrides\nuc_overrides::class,
    Modules\nuc_pages\nuc_pages::class,
    Modules\nuc_share\nuc_share::class,
    Modules\nuc_terminal\nuc_terminal::class,
];
```

Dodaj tutaj własne moduły. ServiceProvider każdego modułu jest ładowany automatycznie.

## Baza danych (`config/database.php`)

### MySQL (domyślne)

```php
'mysql' => [
    'driver' => 'mysql',
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '3306'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
],
```

### Baza testowa

Oddzielna baza danych dla testów:

```php
'testing' => [
    'driver' => 'mysql',
    'database' => env('DB_TEST_DATABASE', 'forge'),
    // ... tak samo jak mysql
],
```

### PostgreSQL

```php
'pgsql' => [
    'driver' => 'pgsql',
    'host' => env('DB_HOST', '127.0.0.1'),
    'port' => env('DB_PORT', '5432'),
    'database' => env('DB_DATABASE', 'forge'),
    'username' => env('DB_USERNAME', 'forge'),
    'password' => env('DB_PASSWORD', ''),
],
```

### Redis

```php
'redis' => [
    'client' => env('REDIS_CLIENT', 'phpredis'),
    'default' => [
        'host' => env('REDIS_HOST', '127.0.0.1'),
        'password' => env('REDIS_PASSWORD'),
        'port' => env('REDIS_PORT', '6379'),
        'database' => env('REDIS_DB', '0'),
    ],
],
```

## CORS (`config/cors.php`)

```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'register', 'logout', 'modules/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [env('APP_URL'), 'http://localhost:3000'],
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
```

| Opcja | Opis |
|-------|------|
| `paths` | Trasy które dopuszczają CORS |
| `allowed_origins` | Dozwolone URL-e frontendu |
| `supports_credentials` | Zezwól na cookies/nagłówki auth |

Na produkcji podaj dokładne origins.

## Sesja (`config/session.php`)

```php
return [
    'driver' => env('SESSION_DRIVER', 'file'),
    'lifetime' => env('SESSION_LIFETIME', 120),
    'expire_on_close' => false,
    'encrypt' => false,
    'cookie' => env('SESSION_COOKIE', 'nucleify_session'),
    'domain' => env('SESSION_DOMAIN'),
    'same_site' => 'lax',
    'http_only' => true,
];
```

| Sterownik | Zastosowanie |
|-----------|--------------|
| `file` | Development, pojedynczy serwer |
| `database` | Multi-serwer, persistent |
| `redis` | Wysoka wydajność, multi-serwer |

## Service Providers

Zarejestrowane w `config/app.php`:

```php
'providers' => ServiceProvider::defaultProviders()->merge([
    App\Providers\AppServiceProvider::class,
    App\Providers\AuthServiceProvider::class,
    App\Providers\EventServiceProvider::class,
])->toArray(),
```

## Aliasy

Własne fasady w `config/app.php`:

```php
'aliases' => Facade::defaultAliases()->merge([
    'ActivityLogger' => App\Facades\ActivityLogger::class,
])->toArray(),
```

## Komendy Artisan

```bash
# Wygeneruj klucz aplikacji
php artisan key:generate

# Wyczyść wszystkie cache
php artisan optimize:clear

# Cache dla produkcji
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Baza danych
php artisan migrate
php artisan migrate:fresh --seed
php artisan db:seed

# Utwórz kontroler
php artisan make:controller ExampleController

# Utwórz model z migracją
php artisan make:model Example -m
```
