<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Link;

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
