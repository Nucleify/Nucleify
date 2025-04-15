<?php

namespace Database\Seeders;

use App\Models\Money;
use Illuminate\Database\Seeder;

class MoneySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = (env('APP_ENV') === 'production') ? 100 : 40;

        for ($i = 1; $i <= 6; $i++) {
            Money::factory($count)->create([
                'user_id' => $i,
            ]);
        }
    }
}
