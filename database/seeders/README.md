Most seeders are located in modules folder.

## Auto-Discovery of Module Seeders

The `DatabaseSeeder` uses the `SeederDiscoveryService` (from the `dm_database` module) to automatically discover and call seeders from all enabled modules.

<br>

### How it works:

1. **Scans all modules** in the `modules/` directory
2. **Reads `config.json`** for each module
3. **Only runs seeders** for modules with:
   - `"installed": true`
   - `"enabled": true`
4. **Finds the seeder** using:
   - Explicit `"seeder": "SeederName"` in config.json
   - OR auto-guesses from module name (e.g., `dm_entities` → `EntitiesSeeder`)

<br>

### Example config.json:

```json
{
  "name": "dm_entities",
  "description": "Module that contains entity functions.",
  "version": "0.0.1",
  "category": "core",
  "installed": true,
  "enabled": true,
  "seeder": "EntitiesSeeder"
}
```

**Note:** The `"seeder"` field is optional. If omitted, the seeder name will be auto-guessed from the module name. The guessing logic:
- Removes `dm_` prefix
- Capitalizes each word
- Removes trailing `s` (unless the name ends with `ies`)
- Adds `Seeder` suffix

Examples:
- `dm_entities` → `EntitiesSeeder` (keeps `ies`)
- `dm_colors` → `ColorSeeder` (removes `s`)
- `dm_activity` → `ActivitySeeder` (no `s` to remove)

<br>

### Adding a new module seeder:

1. Create your seeder in `modules/your_module/database/seeders/YourSeeder.php`
2. Add `"seeder": "YourSeeder"` to your module's `config.json`
3. Set `"installed": true` and `"enabled": true`
4. Run `php artisan db:seed` - it will automatically be called!

<br>

### Disabling a module seeder:

Set `"enabled": false` in the module's `config.json`