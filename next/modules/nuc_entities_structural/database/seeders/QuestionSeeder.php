<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    protected string $path = 'modules/nuc_entities_structural/database/constants/Questions/';

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = ['en', 'pl'];
        $categories = ['about' => 'About', 'home' => 'Home', 'offer' => 'Offer', 'services' => 'Services'];

        foreach ($languages as $lang) {
            foreach ($categories as $category => $file) {
                $questions = require $this->path . $lang . '/' . $file . '.php';

                foreach ($questions as $question) {
                    Question::factory()->create(array_merge($question, [
                        'category' => $category,
                        'lang' => $lang,
                        'display' => true,
                    ]));
                }
            }
        }
    }
}
