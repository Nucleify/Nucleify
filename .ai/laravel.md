# Laravel Backend

## Overview

Backend is built on **Laravel 11** with **PHP 8.2+**. It follows a modular service-oriented architecture with API-only controllers. All backend code for features lives inside `modules/nuc_*/app/`.

---

## Stack

- **Framework:** Laravel 11.5
- **PHP:** 8.2+ (platform: 8.3)
- **Auth:** Laravel Sanctum 4.0 (SPA cookie-based via `@qirolab/nuxt-sanctum-authentication`)
- **Testing:** Pest 2.34
- **Linting:** Laravel Pint
- **Packages:** Spatie Activity Log, Laravel Acquaintances (friendships), Laravel Zip

---

## Architecture Pattern

The project follows **Controller → Service → Model** pattern with Contracts and Resources:

```
Request → Controller → Service → Model
                ↓
            Resource (JSON response)
```

### Controllers (`app/Http/Controllers/`)

- Thin controllers — delegate all logic to Services
- Inject the Service via constructor DI
- Wrap operations in try-catch, return `JsonResponse`
- Use Form Requests for validation (`PostRequest`, `PutRequest`)

```php
class ArticleController extends Controller
{
    private ArticleService $service;

    public function __construct(ArticleService $service)
    {
        $this->service = $service;
    }

    public function index(Request $request): JsonResponse
    {
        try {
            $result = $this->service->index($request);
            return response()->json($result);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
```

### Services (`app/Services/`)

- Contain all business logic
- Use Traits for shared functionality (`RequestSetterTrait`, `TimeSetterTrait`, `UserSetterTrait`)
- Inject Model via constructor (readonly)
- Include `LoggerService` for activity logging
- Role-based data access: staff users see all data, regular users see only their own

```php
class ArticleService
{
    use RequestSetterTrait;
    use TimeSetterTrait;
    use UserSetterTrait;

    public function __construct(
        private readonly Article $model,
        protected string $entity = 'article',
        private readonly LoggerService $logger = new LoggerService
    ) {}
}
```

### Models (`app/Models/`)

- Implement a Contract interface
- Define explicit getter methods (`getId()`, `getTitle()`, etc.)
- Define scope methods (`scopeGetById()`, `scopeGetByTitle()`, etc.)
- Use `HasFactory` trait
- Annotate properties and methods with PHPDoc `@property` tags

```php
class Article extends Model implements ArticleContract
{
    use HasFactory;

    protected $fillable = ['user_id', 'title', 'description', 'category'];

    public function getId(): int { return $this->id; }
    public function getTitle(): string { return $this->title; }

    public function scopeGetById(Builder $query, int $parameter): Builder
    {
        return $query->where('id', $parameter);
    }
}
```

### Contracts (`app/Contracts/`)

- Define getter method signatures for each model
- Every model implements its corresponding Contract

```php
interface ArticleContract
{
    public function getId(): int;
    public function getTitle(): string;
    public function getDescription(): string;
    public function getCategory(): ?string;
    public function getCreatedAt(): string;
    public function getUpdatedAt(): string;
}
```

### Resources (`app/Resources/`)

- Extend `JsonResource`
- Use model getter methods (not direct property access)
- Transform models into API response arrays

```php
class ArticleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->getId(),
            'title' => $this->getTitle(),
            'description' => $this->getDescription(),
            'category' => $this->getCategory(),
            'created_at' => $this->getCreatedAt(),
            'updated_at' => $this->getUpdatedAt(),
        ];
    }
}
```

### Form Requests (`app/Http/Requests/`)

- Organized by entity: `{Entity}/PostRequest.php`, `{Entity}/PutRequest.php`
- Separate validation rules for create (POST) and update (PUT) operations

---

## Routing

### Module Routes (`modules/nuc_*/routes/api.php`)

- Routes are loaded by each module's ServiceProvider
- Use `web` middleware with `api` prefix
- Auth-protected routes wrapped in `auth` middleware group
- RESTful resource-style routes with named routes

```php
Route::middleware(['web'])->prefix('api')->group(function (): void {
    Route::middleware(['auth'])->group(function (): void {
        Route::prefix('articles')->controller(ArticleController::class)->group(function (): void {
            Route::get('/', 'index')->name('articles.index');
            Route::get('/{id}', 'show')->name('articles.show');
            Route::post('/', 'store')->name('articles.store');
            Route::put('/{id}', 'update')->name('articles.update');
            Route::delete('/{id}', 'destroy')->name('articles.destroy');
        });
    });
});
```

### Module File Routes (`routes/modules.php`)

Serves module static files via `/{module}/{file}` pattern.

---

## Traits (`app/Traits/`)

Shared functionality extracted into traits, organized by type:

- **Getters:** `RequestGetterTrait`, `TimeGetterTrait`, `UserGetterTrait`
- **Setters:** `RequestSetterTrait`, `TimeSetterTrait`, `UserSetterTrait`
- **Runners:** `AuthRunnerTrait`, `MessageRunnerTrait`

---

## Database

### Migrations (`database/migrations/`)

Each module has its own migrations in `modules/nuc_*/database/migrations/`, loaded by the module's ServiceProvider.

### Factories (`database/factories/`)

Per-entity factories in `modules/nuc_*/database/factories/` for generating test data.

### Seeders (`database/seeders/`)

Module-level seeders in `modules/nuc_*/database/seeders/`, with a top-level `DatabaseSeeder.php`.

---

## Testing (Pest PHP)

### Structure

Tests are organized by type within each module's `tests/` folder:

- **Database tests:** `tests/Database/Models/`, `tests/Database/Factories/`, `tests/Database/Migrations/`
- **Feature tests:** `tests/Feature/Api/{Entity}/HTTP{code}Test.php`, `tests/Feature/Controllers/`
- **Test config:** `Pest.php`, `TestConstants.php`, `TestGroups.php`, `TestUses.php`

### Conventions

- Use Pest's `describe()` blocks and `test()` functions
- Group tests with `uses()->group('article-model')`
- Guard test files with `if (!defined('PEST_RUNNING')) { return; }`
- Use `beforeEach()` for setup (create users, acting as admin)
- Test all HTTP status codes per entity (200, 302, 401, 405, 422, 500)
- Model tests verify instance getters and scope methods

```php
test('can get title', function (): void {
    expect($this->model->getTitle())
        ->toBeString()
        ->toBe($this->model->title);
});
```

---

## Autoloading

Configured in `composer.json`:

```json
{
  "autoload": {
    "psr-4": {
      "App\\": "app/",
      "Database\\Factories\\": "database/factories/",
      "Database\\Seeders\\": "database/seeders"
    },
    "classmap": ["modules/"]
  }
}
```

Module classes are autoloaded via `classmap` from the `modules/` directory. Module namespaces use `Modules\nuc_*` pattern, while app-level classes in modules use `App\*` namespaces (e.g. `App\Models\Article`, `App\Services\ArticleService`).

