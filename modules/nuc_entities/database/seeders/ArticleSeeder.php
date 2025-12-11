<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $count = (env('APP_ENV') === 'production') ? 100 : 40;

        for ($i = 1; $i <= 6; $i++) {
            Article::factory($count)->create([
                'user_id' => $i,
            ]);
        }
    }
}
