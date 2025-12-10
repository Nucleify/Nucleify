<?php

namespace Database\Seeders;

use App\Models\SystemColor;
use Illuminate\Database\Seeder;

class SystemColorSeeder extends Seeder
{
    protected string $path = 'modules/nuc_colors/database/constants/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = include $this->path . 'Colors.php';

        foreach ($colors as $color) {
            SystemColor::factory()->create($color);
        }
    }
}
