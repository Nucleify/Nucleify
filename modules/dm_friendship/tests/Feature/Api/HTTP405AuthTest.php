<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('friendship-api-405');
uses()->group('friendship-api-405-auth');
uses()->group('api-405');
uses()->group('api-405-auth');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function (): void {
    test('post > index api', function (): void {
        $this->post(route('friendship.index', 1))
            ->assertStatus(405);
    });

    test('post json > index api', function (): void {
        $this->postJson(route('friendship.index', 1))
            ->assertStatus(405);
    });

    test('put > index api', function (): void {
        $this->put(route('friendship.index', 1))
            ->assertStatus(405);
    });

    test('put json > index api', function (): void {
        $this->putJson(route('friendship.index', 1))
            ->assertStatus(405);
    });

    test('delete > index api', function (): void {
        $this->delete(route('friendship.index', 1))
            ->assertStatus(405);
    });

    test('delete json > index api', function (): void {
        $this->deleteJson(route('friendship.index', 1))
            ->assertStatus(405);
    });

    test('put > sendRequest api', function (): void {
        $this->put(route('friendship.sendRequest', 1))
            ->assertStatus(405);
    });

    test('delete > sendRequest api', function (): void {
        $this->delete(route('friendship.sendRequest', 1))
            ->assertStatus(405);
    });

    test('put > acceptRequest api', function (): void {
        $this->put(route('friendship.acceptRequest', 1))
            ->assertStatus(405);
    });

    test('delete > acceptRequest api', function (): void {
        $this->delete(route('friendship.acceptRequest', 1))
            ->assertStatus(405);
    });

    test('put > denyRequest api', function (): void {
        $this->put(route('friendship.denyRequest', 1))
            ->assertStatus(405);
    });

    test('delete > denyRequest api', function (): void {
        $this->delete(route('friendship.denyRequest', 1))
            ->assertStatus(405);
    });

    test('post > removeFriend api', function (): void {
        $this->post(route('friendship.remove', 1))
            ->assertStatus(405);
    });

    test('put > removeFriend api', function (): void {
        $this->put(route('friendship.remove', 1))
            ->assertStatus(405);
    });

    test('put > blockFriend api', function (): void {
        $this->put(route('friendship.block', 1))
            ->assertStatus(405);
    });

    test('delete > blockFriend api', function (): void {
        $this->delete(route('friendship.block', 1))
            ->assertStatus(405);
    });

    test('post > unblockFriend api', function (): void {
        $this->post(route('friendship.unblock', 1))
            ->assertStatus(405);
    });

    test('put > unblockFriend api', function (): void {
        $this->put(route('friendship.unblock', 1))
            ->assertStatus(405);
    });
});
