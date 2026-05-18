# Pest (Testowanie Backendu)

Pest to framework do testowania PHP używany do testów backendowych w Nucleify.

---

## Konfiguracja

### phpunit.xml

Konfiguracja znajduje się w `.config/phpunit.xml`. W root nie ma pliku `phpunit.xml`—Sail i `composer test` korzystają z niej automatycznie przez własny wrapper Sail.

```xml
<!-- .config/phpunit.xml -->
<phpunit bootstrap="../vendor/autoload.php" colors="true">
    <testsuites>
        <testsuite name="Modules"><directory>../modules</directory></testsuite>
        <testsuite name="Global"><directory>../tests/Global</directory></testsuite>
        <testsuite name="Database"><directory>../tests/Database</directory></testsuite>
        <testsuite name="Feature"><directory>../tests/Feature</directory></testsuite>
    </testsuites>
</phpunit>
```

### Zmienne środowiskowe

| Zmienna | Wartość | Opis |
|---------|---------|------|
| `APP_ENV` | `testing` | Środowisko aplikacji |
| `CACHE_DRIVER` | `array` | Cache w pamięci |
| `DB_TEST_DATABASE` | `testing` | Nazwa testowej bazy danych |
| `SESSION_DRIVER` | `array` | Sesje w pamięci |

---

## Struktura

### Testy globalne

```txt
tests/
├── Pest.php              # Główna konfiguracja
├── Groups.php            # Grupy testów
├── Uses.php              # Wspólne uses
├── Global/               # Testy globalne
├── Feature/              # Testy funkcjonalne
└── Database/             # Testy bazy danych
```

### Testy modułów

```txt
modules/nuc_example/tests/
├── Pest.php              # Konfiguracja modułu
├── TestConstants.php     # Dane testowe
├── TestGroups.php        # Grupy modułu
├── Database/
│   ├── Factories/
│   ├── Migrations/
│   └── Models/
└── Feature/
    ├── Api/
    │   └── User/
    │       ├── HTTP200Test.php
    │       ├── HTTP302Test.php
    │       ├── HTTP401Test.php
    │       ├── HTTP422PostTest.php
    │       └── HTTP500Test.php
    └── Controllers/
```

---

## Konfiguracja Pest

### Groups.php

```php
<?php

uses()
    ->group('database')
    ->in('Database');

uses()
    ->group('models')
    ->in('Database/Models');

uses()
    ->group('api')
    ->in('Feature/Api');

uses()
    ->group('controllers')
    ->in('Feature/Controllers');

uses()
    ->group('modules')
    ->in('../modules');
```

### Uses.php

```php
<?php

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

uses(TestCase::class)->in('Feature', 'Database');
uses(DatabaseMigrations::class)->in('Database/Factories', 'Feature/Controllers');
```

---

## Pisanie testów

### Wzorzec Guard

Każdy plik testowy musi zaczynać się od:

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}
```

### Testy API (HTTP 200)

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-api-200');

use App\Models\User;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        $this->getJson(route('users.index'))->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('users.store'), userData)->assertOk();
    });

    test('show api', function (): void {
        $model = User::factory()->create();
        $this->getJson(route('users.show', $model->id))->assertOk();
    });

    test('destroy api', function (): void {
        $model = User::factory()->create();
        $this->deleteJson(route('users.destroy', $model->id))->assertOk();
        $this->assertDatabaseMissing('users', ['id' => $model->id]);
    });
});
```

### Testy walidacji (HTTP 422)

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function ($userData = userData) {
    $userData['name'] = '';
    test('name > empty', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['name']],
        ['errors' => [
            'name' => ['The name field is required.']
        ]]
    ));

    $userData['email'] = 'invalid';
    test('email > invalid', apiTest(
        'POST',
        'users.store',
        422,
        $userData,
        ['errors' => ['email']],
        ['errors' => [
            'email' => ['The email field must be a valid email address.']
        ]]
    ));
});
```

### Testy modeli

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-model');

use App\Models\User;

beforeEach(function (): void {
    $this->createUsers();
    $this->model = User::factory()->create();
});

test('można utworzyć', function (): void {
    expect($this->model)->toBeInstanceOf(User::class);
});

describe('Instancja', function (): void {
    test('można pobrać id', function (): void {
        expect($this->model->getId())
            ->toBeInt()
            ->toBe($this->model->id);
    });

    test('można sprawdzić czy admin', function (): void {
        $model = User::factory()->create(['role' => 'admin']);
        expect($model->isAdmin())
            ->toBeTrue();
    });
});

describe('Scope', function (): void {
    test('można filtrować po roli', function (): void {
        $found = User::getByAdminRole()->first();
        expect($found->role)->toBe('admin');
    });
});
```

### Testy kontrolerów

```php
<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-controller');

use App\Http\Controllers\UserController;
use App\Services\UserService;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(
        UserController::class,
        ['userService' => app()->make(UserService::class)]
    );
});

describe('200', function (): void {
    test('metoda index', function (): void {
        $response = $this->controller->index();
        expect($response->getStatusCode())->toEqual(200);
    });
});
```

---

## Funkcje pomocnicze

### apiTest()

Helper dla pojedynczego testu - zwraca Closure do użycia z `test()`.

```php
<?php

function apiTest(
    $method,
    $route,
    $status,
    $data = null,
    $jsonStructure = null,
    $jsonFragment = null
): Closure;
```

**Użycie:**

```php
test('name > empty', apiTest(
    'POST',
    'users.store',
    422,
    $userData,
    ['errors' => ['name']],
    ['errors' => [
        'name' => ['The name field is required.']
    ]]
));
```

### apiTestArray()

Generator wielu testów - tworzy testy z tablicy.

```php
<?php

function apiTestArray(array $tests): void;
```

**Opcje definicji testu:**

| Klucz | Typ | Domyślnie | Opis |
|-------|-----|-----------|------|
| `method` | string | 'POST' | Metoda HTTP: GET, POST, PUT, DELETE, SHOW |
| `route` | string | '' | Nazwa route'a |
| `status` | int | 422 | Oczekiwany status HTTP |
| `data` | array | [] | Dane requestu |
| `structure` | array | null | assertJsonStructure |
| `fragment` | array | null | assertJsonFragment |
| `errors` | array | null | assertJsonValidationErrors |
| `id` | int | null | ID dla route'a (wymagane dla SHOW/PUT/DELETE, opcjonalne dla GET/POST) |
| `json` | bool | true | Użyj metod JSON (postJson, putJson) lub zwykłych (post, put) |

**Użycie:**

```php
describe('401', function () {
    apiTestArray([
        'index api' => [
            'method' => 'GET',
            'route' => 'contacts.index',
            'status' => 401,
            'structure' => ['message'],
            'fragment' => ['message' => 'Unauthenticated.'],
        ],
        'show api' => [
            'method' => 'SHOW',
            'route' => 'contacts.show',
            'status' => 401,
            'id' => 1,
        ],
        'destroy api' => [
            'method' => 'DELETE',
            'route' => 'contacts.destroy',
            'status' => 401,
        ],
    ]);
});

describe('422 > POST', function () {
    apiTestArray([
        'user_id > empty' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => ['user_id' => ''],
            'structure' => ['errors' => ['user_id']],
            'fragment' => ['errors' => [
                'user_id' => ['The user id field is required.']
            ]],
        ],
        'first_name > too short' => [
            'method' => 'POST',
            'route' => 'contacts.store',
            'data' => ['first_name' => 'L'],
            'structure' => ['errors' => ['first_name']],
            'fragment' => ['errors' => [
                'first_name' => ['The first name field must be at least 3 characters.']
            ]],
        ],
    ]);
});
```

**Zalety:**
- Czystsza składnia dla wielu testów
- Automatyczne nazwy testów z kluczy tablicy
- Wszystkie parametry per test

---

## Komendy

```bash
# Uruchom wszystkie testy (Docker)
sail pest

# Uruchom wszystkie testy (lokalnie)
composer test

# Uruchom konkretny zestaw
sail pest --testsuite=Modules
sail pest --testsuite=Feature

# Uruchom konkretną grupę
sail pest --group=api-200
sail pest --group=models

# Uruchom konkretny plik
sail pest modules/nuc_entities/tests/Feature/Api/User/HTTP200Test.php

# Uruchom z pokryciem kodu
sail pest --coverage

# Filtruj po nazwie
sail pest --filter="store api"
```

---

## Dobre praktyki

1. **Zawsze dodawaj guard** - `if (!defined('PEST_RUNNING')) { return; }`
2. **Używaj grup** - `uses()->group('name')`
3. **Używaj `beforeEach`** - Wspólna konfiguracja
4. **Używaj bloków `describe`** - Grupuj powiązane testy
5. **Testuj wszystkie kody HTTP** - 200, 302, 401, 405, 422, 500
6. **Testy modułów trzymaj** w `modules/*/tests/`
7. **Używaj factories** - `Model::factory()->create()`
8. **Sprawdzaj bazę danych** - `assertDatabaseHas()`, `assertDatabaseMissing()`
