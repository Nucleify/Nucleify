<?php

namespace Database\Seeders;

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
                Money::factory(40)->create([
                    'user_id' => $i,
                ]);
            }
        }
    }
}
