<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\User;
use App\Services\FriendshipService;

beforeEach(function (): void {
    $this->user = User::factory()->create();
    $this->otherUser = User::factory()->create();

    $this->service = new FriendshipService;
    $this->actingAs($this->user);
});

it('sends a friend request', function (): void {
    $response = $this->service->sendRequest($this->otherUser);

    expect($response['message'])->toBe('Friend request sent successfully');
    expect($this->user->hasSentFriendRequestTo($this->otherUser))->toBeTrue();
});

it('accepts a friend request', function (): void {
    $this->otherUser->befriend($this->user);

    $response = $this->service->acceptRequest($this->otherUser);

    expect($response['message'])->toBe('Friend request accepted successfully');
    expect($this->user->isFriendWith($this->otherUser))->toBeTrue();
});

it('denies a friend request', function (): void {
    $this->otherUser->befriend($this->user);

    $response = $this->service->denyRequest($this->otherUser);

    expect($response['message'])->toBe('Friend request denied successfully');
    expect($this->user->hasFriendRequestFrom($this->otherUser))->toBeFalse();
});

it('removes a friend', function (): void {
    $this->user->befriend($this->otherUser);
    $this->otherUser->acceptFriendRequest($this->user);

    $response = $this->service->removeFriend($this->otherUser);

    expect($response['message'])->toBe('Friend removed successfully');
    expect($this->user->isFriendWith($this->otherUser))->toBeFalse();
});

it('blocks a friend', function (): void {
    $response = $this->service->blockFriend($this->otherUser);

    expect($response['message'])->toBe('Friend blocked successfully');
    expect($this->user->hasBlocked($this->otherUser))->toBeTrue();
});

it('unblocks a friend', function (): void {
    $this->user->blockFriend($this->otherUser);

    $response = $this->service->unblockFriend($this->otherUser);

    expect($response['message'])->toBe('Friend unblocked successfully');
    expect($this->user->hasBlocked($this->otherUser))->toBeFalse();
});
