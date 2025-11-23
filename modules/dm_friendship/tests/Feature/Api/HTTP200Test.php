<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-api-200');
uses()->group('api-200');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        $this->getJson(route('friendship.index'))
            ->assertOk();
    });

    test('sendRequest api', function (): void {
        $recipient = $this->user->id;

        $this->postJson(route('friendship.sendRequest', $recipient))
            ->assertOk();
    });

    test('acceptRequest api', function (): void {
        $sender = $this->user->id;

        $this->postJson(route('friendship.acceptRequest', $sender))
            ->assertOk();
    });

    test('denyRequest api', function (): void {
        $sender = $this->user->id;

        $this->postJson(route('friendship.denyRequest', $sender))
            ->assertOk();
    });

    test('removeFriend api', function (): void {
        $friend = $this->user->id;

        $this->deleteJson(route('friendship.remove', $friend))
            ->assertOk();
    });

    test('blockFriend api', function (): void {
        $friend = $this->user->id;

        $this->postJson(route('friendship.block', $friend))
            ->assertOk();
    });

    test('unblockFriend api', function (): void {
        $friend = $this->user->id;

        $this->deleteJson(route('friendship.unblock', $friend))
            ->assertOk();
    });
});
