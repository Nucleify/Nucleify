<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Contact;

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


        // Create contacts for every test user defined in UserSeeder
        if (env('APP_ENV') === 'production' || 'dev') {
            for ($i = 1; $i <= 6; $i++) {
                Contact::factory(50)->create([
                    'user_id' => $i,
                ]);
            }
        }
    }
}
