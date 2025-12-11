<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Seeder;

class ModuleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allModules = require_once 'modules/nuc_modules/hooks/getAllModules.php';

        foreach ($allModules as $moduleName => $moduleConfig) {
            $name = is_string($moduleConfig) ? $moduleConfig : ($moduleConfig['name'] ?? $moduleName);

            Module::factory()->create([
                'name' => $name,
                'description' => $moduleConfig['description'] ?? 'Module ' . $description,
                'version' => $moduleConfig['version'] ?? '0.0.1',
                'category' => $moduleConfig['category'] ?? 'core',
                'installed' => $moduleConfig['installed'] ?? false,
                'enabled' => $moduleConfig['enabled'] ?? false,
            ]);
        }
    }
}
