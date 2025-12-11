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
        $aboutQuestions = require_once $this->path . 'About.php';
        $homeQuestions = require_once $this->path . 'Home.php';
        $servicesQuestions = require_once $this->path . 'Services.php';

        foreach ($aboutQuestions as $question) {
            Question::factory()->create(array_merge($question, [
                'category' => 'about',
                'display' => true,
            ]));
        }

        foreach ($homeQuestions as $question) {
            Question::factory()->create(array_merge($question, [
                'category' => 'home',
                'display' => true,
            ]));
        }

        foreach ($servicesQuestions as $question) {
            Question::factory()->create(array_merge($question, [
                'category' => 'services',
                'display' => true,
            ]));
        }
    }
}
