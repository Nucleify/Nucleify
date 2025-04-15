<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\FriendController;
use App\Services\FriendshipService;
use Database\Factories\UserFactory;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(FriendController::class, ['service' => app()->make(FriendshipService::class)]);
});

test('send friend request > success', function (): void {
    $recipient = UserFactory::new()->create();
    $response = $this->controller->sendRequest($recipient);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend request sent successfully']);
});

test('accept friend request > success', function (): void {
    $sender = UserFactory::new()->create();
    $response = $this->controller->acceptRequest($sender);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend request accepted successfully']);
});

test('deny friend request > success', function (): void {
    $sender = UserFactory::new()->create();
    $response = $this->controller->denyRequest($sender);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend request denied successfully']);
});

test('remove friend method > success', function (): void {
    $friend = UserFactory::new()->create();
    $response = $this->controller->removeFriend($friend);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend removed successfully']);
});

test('block friend method > success', function (): void {
    $friend = UserFactory::new()->create();
    $response = $this->controller->blockFriend($friend);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend blocked successfully']);
});

test('unblock friend method > success', function (): void {
    $friend = UserFactory::new()->create();
    $response = $this->controller->unblockFriend($friend);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend unblocked successfully']);
});
