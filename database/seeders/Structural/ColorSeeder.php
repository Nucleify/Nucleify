<?php

namespace Database\Seeders\Structural;

use App\Models\Structural\Color;

use Illuminate\Database\Seeder;

class ColorSeeder extends Seeder
{
    /**
     * @var string
     */
    protected string $path = 'database/constants/Structural/Colors/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $generalColors = require_once $this->path . 'Colors.php';

        foreach ($generalColors as $color) {
            Color::factory()->create(array_merge($color, [
                'user_id' => 1,
            ]));
        }
    }
}
