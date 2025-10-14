<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-api-401');
uses()->group('api-401');

beforeEach(function (): void {
    $this->createUsers();
});

describe('401', function (): void {
    test('index api', function () {
        $this->getJson(route('friendship.index'))
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('sendRequest api', function () {
        $recipient = $this->user;

        $this->postJson(route('friendship.sendRequest', $recipient))
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('acceptRequest api', function () {
        $sender = $this->user;

        $this->postJson(route('friendship.acceptRequest', $sender))
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('denyRequest api', function () {
        $sender = $this->user;

        $this->postJson(route('friendship.denyRequest', $sender))
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('removeFriend api', function () {
        $friend = $this->user;

        $this->deleteJson(route('friendship.remove', $friend))
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('blockFriend api', function () {
        $friend = $this->user;

        $this->postJson(route('friendship.block', $friend))
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });

    test('unblockFriend api', function () {
        $friend = $this->user;

        $this->deleteJson(route('friendship.unblock', $friend))
            ->assertStatus(401)
            ->assertJson(['message' => 'Unauthenticated.']);
    });
});
