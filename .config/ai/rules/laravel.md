# Laravel Backend

Laravel 11.5, PHP 8.2+, Sanctum 4.0, Pest 2.34, Pint. Packages: Spatie Activity Log, Laravel Acquaintances.

## Architecture: Controller → Service → Model

```
Request → Controller → Service → Model → Resource (JSON)
```

**Controllers** (`App\Http\Controllers`) — thin, DI service via constructor, try-catch with `JsonResponse`, use Form Requests (`PostRequest`, `PutRequest`).

**Services** (`App\Services`) — all business logic. Use `RequestSetterTrait`, `TimeSetterTrait`, `UserSetterTrait`. Constructor: `readonly Model`, `string $entity`, `LoggerService $logger`. Role-based access (staff vs regular).

**Models** (`App\Models`) — implement Contract interface, explicit getters (`getId()`, `getTitle()`), scopes (`scopeGetById()`), `HasFactory`, PHPDoc.

**Contracts** (`App\Contracts`) — interface with getter signatures per model.

**Resources** (`App\Resources`) — extend `JsonResource`, use getter methods (not direct property access).

**Form Requests** (`App\Http\Requests\{Entity}`) — `PostRequest.php` and `PutRequest.php`.

**Factories** (`Database\Factories`) — per-entity factories for test data.

**Seeders** (`Database\Seeders`) — module-level seeders.

## Example

```php
// Controller
class ArticleController extends Controller {
    public function __construct(private ArticleService $service) {}
    public function index(Request $request): JsonResponse {
        try { return response()->json($this->service->index($request)); }
        catch (Exception $e) { return response()->json(['error' => $e->getMessage()], 500); }
    }
}

// Service
class ArticleService {
    use RequestSetterTrait, TimeSetterTrait, UserSetterTrait;
    public function __construct(
        private readonly Article $model,
        protected string $entity = 'article',
        private readonly LoggerService $logger = new LoggerService
    ) {}
}

// Model
class Article extends Model implements ArticleContract {
    use HasFactory;
    protected $fillable = ['user_id', 'title', 'description', 'category'];
    public function getId(): int { return $this->id; }
    public function scopeGetById(Builder $query, int $parameter): Builder {
        return $query->where('id', $parameter);
    }
}

// Resource
class ArticleResource extends JsonResource {
    public function toArray(Request $request): array {
        return ['id' => $this->getId(), 'title' => $this->getTitle(), ...];
    }
}
```

## Routing

Module routes in `modules/nuc_*/routes/api.php`, loaded by ServiceProvider:

```php
Route::middleware(['web'])->prefix('api')->group(function (): void {
    Route::middleware(['auth'])->group(function (): void {
        Route::prefix('articles')->controller(ArticleController::class)->group(function (): void {
            Route::get('/', 'index')->name('articles.index');
            Route::post('/', 'store')->name('articles.store');
            Route::get('/{id}', 'show')->name('articles.show');
            Route::put('/{id}', 'update')->name('articles.update');
            Route::delete('/{id}', 'destroy')->name('articles.destroy');
        });
    });
});
```

## Traits

- Getters: `RequestGetterTrait`, `TimeGetterTrait`, `UserGetterTrait`
- Setters: `RequestSetterTrait`, `TimeSetterTrait`, `UserSetterTrait`
- Runners: `AuthRunnerTrait`, `MessageRunnerTrait`

## Autoloading

PSR-4: `App\` → `app/`, `Database\Factories\` → `database/factories/`, `Database\Seeders\` → `database/seeders/`. Classmap: `modules/`. All classes in `modules/nuc_*/app/` use `App\*` namespace — modules are self-contained parts of the main app. Only the ServiceProvider uses `Modules\nuc_*` namespace.
