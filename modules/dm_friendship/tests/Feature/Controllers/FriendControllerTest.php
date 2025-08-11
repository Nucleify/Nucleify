<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-controller');

use App\Http\Controllers\FriendController;
use App\Services\FriendshipService;
use Database\Factories\UserFactory;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(FriendController::class, ['service' => app()->make(FriendshipService::class)]);
});

describe('200', function (): void {
    test('sendRequest method', function (): void {
        $recipient = UserFactory::new()->create();
        $response = $this->controller->sendRequest($recipient);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true))->toEqual(['message' => 'Friend request sent successfully']);
    });

    test('acceptRequest method', function (): void {
        $sender = UserFactory::new()->create();
        $response = $this->controller->acceptRequest($sender);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true))->toEqual(['message' => 'Friend request accepted successfully']);
    });

    test('denyRequest method', function (): void {
        $sender = UserFactory::new()->create();
        $response = $this->controller->denyRequest($sender);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true))->toEqual(['message' => 'Friend request denied successfully']);
    });

    test('removeFriend method', function (): void {
        $friend = UserFactory::new()->create();
        $response = $this->controller->removeFriend($friend);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true))->toEqual(['message' => 'Friend removed successfully']);
    });

    test('blockFriend method', function (): void {
        $friend = UserFactory::new()->create();
        $response = $this->controller->blockFriend($friend);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true))->toEqual(['message' => 'Friend blocked successfully']);
    });

    test('unblockFriend method', function (): void {
        $friend = UserFactory::new()->create();
        $response = $this->controller->unblockFriend($friend);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true))->toEqual(['message' => 'Friend unblocked successfully']);
    });
});
