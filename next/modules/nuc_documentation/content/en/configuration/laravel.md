# Laravel Configuration

Backend configuration in `config/` directory.

## Config Files

| File | Purpose |
|------|---------|
| `config/app.php` | Application name, env, timezone, locale, providers |
| `config/database.php` | Database connections (MySQL, PostgreSQL, SQLite) |
| `config/modules.php` | Registered Nucleify modules |
| `config/cors.php` | Cross-Origin Resource Sharing |
| `config/session.php` | Session driver and cookie settings |
| `config/cache.php` | Cache drivers |

## Application (`config/app.php`)

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

| Option | Description |
|--------|-------------|
| `name` | Application name |
| `env` | Environment (`local`, `production`) |
| `debug` | Show detailed errors |
| `url` | Base URL for artisan commands |
| `timezone` | Default timezone |
| `locale` | Default language |
| `key` | Encryption key (generate with `php artisan key:generate`) |

## Modules (`config/modules.php`)

Register backend modules:

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

Add your custom modules here. Each module's ServiceProvider is automatically loaded.

## Database (`config/database.php`)

### MySQL (default)

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

### Testing Database

Separate database for tests:

```php
'testing' => [
    'driver' => 'mysql',
    'database' => env('DB_TEST_DATABASE', 'forge'),
    // ... same as mysql
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

| Option | Description |
|--------|-------------|
| `paths` | Routes that allow CORS |
| `allowed_origins` | Allowed frontend URLs |
| `supports_credentials` | Allow cookies/auth headers |

For production, specify exact origins.

## Session (`config/session.php`)

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

| Driver | Use case |
|--------|----------|
| `file` | Development, single server |
| `database` | Multi-server, persistent |
| `redis` | High performance, multi-server |

## Service Providers

Registered in `config/app.php`:

```php
'providers' => ServiceProvider::defaultProviders()->merge([
    App\Providers\AppServiceProvider::class,
    App\Providers\AuthServiceProvider::class,
    App\Providers\EventServiceProvider::class,
])->toArray(),
```

## Aliases

Custom facades in `config/app.php`:

```php
'aliases' => Facade::defaultAliases()->merge([
    'ActivityLogger' => App\Facades\ActivityLogger::class,
])->toArray(),
```

## Artisan Commands

```bash
# Generate app key
php artisan key:generate

# Clear all caches
php artisan optimize:clear

# Cache for production
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Database
php artisan migrate
php artisan migrate:fresh --seed
php artisan db:seed

# Create controller
php artisan make:controller ExampleController

# Create model with migration
php artisan make:model Example -m
```
