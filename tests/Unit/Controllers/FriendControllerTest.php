<?php

use App\Http\Controllers\FriendController;
use App\Services\FriendService;
use Database\Factories\UserFactory;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(FriendController::class, ['service' => app()->make(FriendService::class)]);
});

it('runs send friend request method successfully', function () {
    $recipient = UserFactory::new()->create();
    $response = $this->controller->sendRequest($recipient);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend request sent successfully']);
});

it('runs accept friend request method successfully', function () {
    $sender = UserFactory::new()->create();
    $response = $this->controller->acceptRequest($sender);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend request accepted successfully']);
});

it('runs deny friend request method successfully', function () {
    $sender = UserFactory::new()->create();
    $response = $this->controller->denyRequest($sender);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend request denied successfully']);
});

it('runs remove friend method successfully', function () {
    $friend = UserFactory::new()->create();
    $response = $this->controller->removeFriend($friend);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend removed successfully']);
});

it('runs block friend method successfully', function () {
    $friend = UserFactory::new()->create();
    $response = $this->controller->blockFriend($friend);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend blocked successfully']);
});

it('runs unblock friend method successfully', function () {
    $friend = UserFactory::new()->create();
    $response = $this->controller->unblockFriend($friend);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true))->toEqual(['message' => 'Friend unblocked successfully']);
});
