# <img src="https://nucleify.io/favicon.ico" width="17" height="17" /> &nbsp; nuc_database

This module provides automatic seeder discovery and execution for all modules.

<br>

## Features

- **Auto-discovery**: Automatically finds and runs seeders from enabled modules
- **Config-based**: Uses module `config.json` to determine which seeders to run
- **Smart naming**: Automatically guesses seeder names from module names
- **Pluralization handling**: Intelligently handles plural module names (e.g., `nuc_modules` → `ModuleSeeder`)

<br>

## Usage

The `SeederDiscoveryService` is automatically used by the `DatabaseSeeder` to discover and call all module seeders.

<br>

### In DatabaseSeeder

```php
use App\Services\SeederDiscoveryService;

public function run(): void
{
    $discoveryService = app(SeederDiscoveryService::class);
    $discoveryService->discoverAndCallSeeders($this);
}
```

<br>

## How it works

1. Scans all directories in `modules/`
2. Reads each module's `config.json`
3. Only runs seeders for modules with `"installed": true` and `"enabled": true`
4. Finds the seeder using:
   - Explicit `"seeder": "SeederName"` field in config.json
   - OR auto-guesses from module name

<br>

## Auto-guessing Rules

- `nuc_modules` → `ModuleSeeder` (trims trailing 's')
- `nuc_files` → `FileSeeder` (trims trailing 's')
- `nuc_entities` → `EntitiesSeeder` (keeps 'ies')
- `nuc_friendship` → `FriendshipSeeder` (no 's' to trim)

<br>

## Configuration

Add to your module's `config.json`:

```json
{
  "name": "nuc_your_module",
  "seeder": "YourModuleSeeder",
  "installed": true,
  "enabled": true
}
```

<br>

### Configuration Options

- **`"seeder": "SeederName"`** - Explicit seeder class name
- **`"seeder": false`** - Explicitly disable seeder for this module (e.g., service-only modules)
- **No `seeder` field** - Auto-guess seeder name from module name

<br>

<h2> &nbsp; <img src="https://nucleify.io/img/technologies/github.svg" width="25"> &nbsp; Contributors </h2> <br>

<a href="https://github.com/SzymCode" target="_blank"><img src="https://nucleify.io/img/contributors/szymcode.svg" width="30" height="30" /></a>