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
        if (env('APP_ENV') === 'production' || 'dev') {
            for ($i = 1; $i <= 6; $i++) {
                Article::factory(41)->create([
                    'user_id' => $i,
                ]);
            }
        }
    }
}
