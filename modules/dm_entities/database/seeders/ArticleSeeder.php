<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Article;

class
ArticleSeeder extends Seeder
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
