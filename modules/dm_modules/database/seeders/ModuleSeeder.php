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
        $installedModules = require_once 'modules/dm_modules/hooks/getInstalledModules.php';

        foreach ($installedModules as $moduleName => $moduleConfig) {
            $name = is_string($moduleConfig) ? $moduleConfig : ($moduleConfig['name'] ?? $moduleName);

            Module::factory()->create([
                'installed' => true,
                'name' => $name,
                'description' => $moduleConfig['description'] ?? 'Module ' . $description,
                'version' => $moduleConfig['version'] ?? '0.0.1',
                'category' => $moduleConfig['category'] ?? 'core',
            ]);
        }
    }
}
