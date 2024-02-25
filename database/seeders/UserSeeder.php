<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()->create([
            'id' => 1,
            'name' => 'Test Admin',
            'email' => 'test@example.com',
            'role' => 'admin',
            'password' => Hash::make('admin123'),
        ]);

        User::factory()->create([
            'id' => 2,
            'name' => 'Test User',
            'email' => 'testuser@example.com',
            'role' => 'user',
            'password' => Hash::make('user123'),
        ]);

        if (env('APP_ENV') === 'production' || 'dev') {
            User::factory(2500)->create();
        }
    }
}
