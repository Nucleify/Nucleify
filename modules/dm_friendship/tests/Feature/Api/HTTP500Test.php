<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-api-500');
uses()->group('api-500');

use App\Services\FriendshipService;

use function Pest\Laravel\mock;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(FriendshipService::class);
});

function mockServiceMethod($service, string $methodName): void
{
    $service
        ->shouldReceive($methodName)
        ->once()
        ->andThrow(new Exception('Internal Server Error'));
}

describe('500', function (): void {
    test('index api', function (): void {
        mockServiceMethod($this->service, 'index');

        $this->getJson(route('friendship.index'))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('sendRequest api', function (): void {
        $recipient = $this->user;
        mockServiceMethod($this->service, 'sendRequest');

        $this->postJson(route('friendship.sendRequest', ['recipient' => $recipient->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('acceptRequest api', function (): void {
        $sender = $this->user;
        mockServiceMethod($this->service, 'acceptRequest');

        $this->postJson(route('friendship.acceptRequest', ['sender' => $sender->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('denyRequest api', function (): void {
        $sender = $this->user;
        mockServiceMethod($this->service, 'denyRequest');

        $this->postJson(route('friendship.denyRequest', ['sender' => $sender->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('removeFriend api', function (): void {
        $friend = $this->user;
        mockServiceMethod($this->service, 'removeFriend');

        $this->deleteJson(route('friendship.remove', ['friend' => $friend->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('blockFriend api', function (): void {
        $friend = $this->user;
        mockServiceMethod($this->service, 'blockFriend');

        $this->postJson(route('friendship.block', ['friend' => $friend->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('unblockFriend api', function (): void {
        $friend = $this->user;
        mockServiceMethod($this->service, 'unblockFriend');

        $this->deleteJson(route('friendship.unblock', ['friend' => $friend->id]))
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

});
