<?php

namespace Database\Seeders;

use App\Models\UserColor;
use Illuminate\Database\Seeder;

class UserColorSeeder extends Seeder
{
    protected string $path = 'modules/nuc_colors/database/constants/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $colors = include $this->path . 'Colors.php';

        for ($i = 1; $i <= 6; $i++) {
            foreach ($colors as $color) {
                UserColor::factory()->create(array_merge($color, [
                    'user_id' => $i,
                ]));
            }
        }
    }
}
