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
        // Tworzymy 50 rekordów modelu Money za pomocą fabryki
        Money::factory()->count(50)->create();
    }
}
