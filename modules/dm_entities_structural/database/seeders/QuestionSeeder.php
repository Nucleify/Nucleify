<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionSeeder extends Seeder
{
    /**
     * @var string
     */
    protected string $path = 'database/constants/Structural/Questions/';

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
                'user_id' => 1,
                'category' => 'about',
                'display' => true
            ]));
        }

        foreach ($homeQuestions as $question) {
            Question::factory()->create(array_merge($question, [
                'user_id' => 1,
                'category' => 'home',
                'display' => true
            ]));
        }

        foreach ($servicesQuestions as $question) {
            Question::factory()->create(array_merge($question, [
                'user_id' => 1,
                'category' => 'services',
                'display' => true
            ]));
        }
    }
}
