<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {   
        if (env('APP_ENV') === 'production' || 'dev') {
            Question::factory(7)->create([
                'user_id' => 1,
                'category' => 'home'
            ]);
        }
    }
}
