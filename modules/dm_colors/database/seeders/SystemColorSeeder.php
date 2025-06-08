<?php

namespace Database\Seeders;

use App\Models\SystemColor;
use Illuminate\Database\Seeder;

class SystemColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = (env('APP_ENV') === 'production') ? 100 : 40;

        SystemColor::factory($count)->create();
    }
}
