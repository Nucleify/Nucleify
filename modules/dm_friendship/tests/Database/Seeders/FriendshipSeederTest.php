<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-seeder');

use App\Models\User;
use Database\Seeders\FriendshipSeeder;

beforeEach(function (): void {
    for ($i = 1; $i <= 6; $i++) {
        User::factory()->create(['id' => $i]);
    }
});

test('creates friendships between all users with IDs 1-6', function (): void {
    $seeder = new FriendshipSeeder;
    $seeder->run();

    $users = User::whereIn('id', [1, 2, 3, 4, 5, 6])->get();

    foreach ($users as $user) {
        $friends = $user->getFriends();

        expect($friends->count())->toBe(5);
    }

    $totalFriendships = DB::table('friendships')->count();

    expect($totalFriendships)->toBe(15);
});

test('ensures lower ID is always the sender', function (): void {
    $seeder = new FriendshipSeeder;
    $seeder->run();

    $friendships = DB::table('friendships')->get();

    foreach ($friendships as $friendship) {
        expect($friendship->sender_id)
            ->toBeLessThan($friendship->recipient_id);
    }
});

test('all friendships are accepted', function (): void {
    $seeder = new FriendshipSeeder;
    $seeder->run();

    $friendships = DB::table('friendships')->get();

    foreach ($friendships as $friendship) {
        expect($friendship->status)->toBe('accepted');
    }
});

test('creates correct friendship pairs', function (): void {
    $seeder = new FriendshipSeeder;
    $seeder->run();

    $expectedPairs = [
        [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
        [2, 3], [2, 4], [2, 5], [2, 6],
        [3, 4], [3, 5], [3, 6],
        [4, 5], [4, 6],
        [5, 6],
    ];

    foreach ($expectedPairs as [$senderId, $recipientId]) {
        $friendship = DB::table('friendships')
            ->where('sender_id', $senderId)
            ->where('recipient_id', $recipientId)
            ->where('status', 'accepted')
            ->first();

        expect($friendship)->not->toBeNull();
    }
});

test('users can verify friendship status', function (): void {
    $seeder = new FriendshipSeeder;
    $seeder->run();

    $user1 = User::find(1);
    $user2 = User::find(2);
    $user3 = User::find(3);

    expect($user1->isFriendWith($user2))->toBeTrue()
        ->and($user1->isFriendWith($user3))->toBeTrue()
        ->and($user2->isFriendWith($user3))->toBeTrue();
});
