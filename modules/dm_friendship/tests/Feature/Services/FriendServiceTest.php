<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-service');

use App\Models\User;
use App\Services\FriendshipService;
use Illuminate\Database\Eloquent\Collection;

beforeEach(function (): void {
    $this->user = User::factory()->create();
    $this->otherUser = User::factory()->create();

    $this->service = new FriendshipService;
    $this->actingAs($this->user);
});

describe('200', function (): void {
    test('can get all friendships', function (): void {
        $this->user->befriend($this->otherUser);
        $this->otherUser->acceptFriendRequest($this->user);

        $response = $this->service->index();

        expect($response)
            ->toBeInstanceOf(Collection::class)
            ->and($response->count())
            ->toBe(1)
            ->and($this->user->isFriendWith($this->otherUser))
            ->toBeTrue();
    });
    test('can send a friend request', function (): void {
        $response = $this->service->sendRequest($this->otherUser);

        expect($response['message'])
            ->toBe('Friend request sent successfully')
            ->and($this->user->hasSentFriendRequestTo($this->otherUser))
            ->toBeTrue();
    });

    test('can accept a friend request', function (): void {
        $this->otherUser->befriend($this->user);

        $response = $this->service->acceptRequest($this->otherUser);

        expect($response['message'])
            ->toBe('Friend request accepted successfully')
            ->and($this->user->isFriendWith($this->otherUser))
            ->toBeTrue();
    });

    test('can deny a friend request', function (): void {
        $this->otherUser->befriend($this->user);

        $response = $this->service->denyRequest($this->otherUser);

        expect($response['message'])
            ->toBe('Friend request denied successfully')
            ->and($this->user->hasFriendRequestFrom($this->otherUser))
            ->toBeFalse();
    });

    test('can remove a friend', function (): void {
        $this->user->befriend($this->otherUser);
        $this->otherUser->acceptFriendRequest($this->user);

        $response = $this->service->removeFriend($this->otherUser);

        expect($response['message'])
            ->toBe('Friend removed successfully')
            ->and($this->user->isFriendWith($this->otherUser))
            ->toBeFalse();
    });

    test('can block a friend', function (): void {
        $response = $this->service->blockFriend($this->otherUser);

        expect($response['message'])
            ->toBe('Friend blocked successfully')
            ->and($this->user->hasBlocked($this->otherUser))
            ->toBeTrue();
    });

    test('can unblock a friend', function (): void {
        $this->user->blockFriend($this->otherUser);

        $response = $this->service->unblockFriend($this->otherUser);

        expect($response['message'])
            ->toBe('Friend unblocked successfully')
            ->and($this->user->hasBlocked($this->otherUser))
            ->toBeFalse();
    });
});
