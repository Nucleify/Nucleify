<?php

namespace Database\Seeders;

use App\Models\Contact;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    public function run(): void
    {
        Contact::factory()->create([
            'user_id' => 1,
            'first_name' => 'Szymon',
            'last_name' => 'Radomski',
            'email' => 's.radomski19@gmail.com',
            'personal_phone' => '123456789',
            'work_phone' => '987654321',
            'address' => '123 Main St, City',
            'birthday' => '2022-04-10',
            'role' => 'user'
        ]);

        if (env('APP_ENV') === 'production') {
            Contact::factory(1000)->create();
        }
    }
}
