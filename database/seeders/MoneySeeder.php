<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Money;

class MoneySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (env('APP_ENV') === 'production' || 'dev') {
            for ($i = 1; $i <= 6; $i++) {
                Money::factory(20)->create();
            }
        }
    }
}
