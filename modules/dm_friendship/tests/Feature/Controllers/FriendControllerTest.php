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
    $this->model = UserFactory::new()->create();
});

describe('200', function (): void {
    test('index method', function (): void {
        $response = $this->controller->index();

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual([]);
    });

    test('sendRequest method', function (): void {
        $response = $this->controller->sendRequest($this->model);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['message' => 'Friend request sent successfully']);
    });

    test('acceptRequest method', function (): void {
        $response = $this->controller->acceptRequest($this->model);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['message' => 'Friend request accepted successfully']);
    });

    test('denyRequest method', function (): void {
        $response = $this->controller->denyRequest($this->model);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['message' => 'Friend request denied successfully']);
    });

    test('removeFriend method', function (): void {
        $response = $this->controller->removeFriend($this->model);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['message' => 'Friend removed successfully']);
    });

    test('blockFriend method', function (): void {
        $response = $this->controller->blockFriend($this->model);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['message' => 'Friend blocked successfully']);
    });

    test('unblockFriend method', function (): void {
        $response = $this->controller->unblockFriend($this->model);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['message' => 'Friend unblocked successfully']);
    });
});
