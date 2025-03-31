<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Card;

class CardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (env('APP_ENV') === 'production' || 'dev') {
            Card::factory(10)->create();
        }
    }
}