<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class FriendshipSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::whereIn('id', [1, 2, 3, 4, 5, 6])->get();

        foreach ($users as $sender) {
            foreach ($users as $recipient) {
                if ($sender->id >= $recipient->id) {
                    continue;
                }

                $sender->befriend($recipient);
                $recipient->acceptFriendRequest($sender);
            }
        }
    }
}
