<?php

namespace Database\Seeders\Structural;

use App\Models\Entities\Article;
use App\Models\Structural\Link;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LinkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Link::factory(15)->create();
    }
}
