<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('share-api-200');
uses()->group('api-200');

use App\Models\ShareRequest;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('create share request api', function (): void {
        $this->postJson('/api/share', [
            'entity_ids' => [1, 2],
            'entity_type' => 'article',
            'user_ids' => [$this->user->id],
        ])
            ->assertOk()
            ->assertJsonStructure(['message']);
    });

    test('get received requests api', function (): void {
        $this->getJson('/api/share/received')
            ->assertOk()
            ->assertJsonStructure(['data']);
    });

    test('get sent requests api', function (): void {
        $this->getJson('/api/share/sent')
            ->assertOk()
            ->assertJsonStructure(['data']);
    });

    test('get pending count api', function (): void {
        $this->getJson('/api/share/count')
            ->assertOk()
            ->assertJsonStructure(['count']);
    });

    test('accept share request api', function (): void {
        $shareRequest = ShareRequest::create([
            'sender_id' => $this->user->id,
            'receiver_id' => $this->admin->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $this->postJson("/api/share/{$shareRequest->id}/accept")
            ->assertOk();
    });

    test('reject share request api', function (): void {
        $shareRequest = ShareRequest::create([
            'sender_id' => $this->user->id,
            'receiver_id' => $this->admin->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $this->postJson("/api/share/{$shareRequest->id}/reject")
            ->assertOk()
            ->assertJson(['message' => 'Share request rejected']);
    });

    test('cancel share request api', function (): void {
        $shareRequest = ShareRequest::create([
            'sender_id' => $this->admin->id,
            'receiver_id' => $this->user->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $this->postJson("/api/share/{$shareRequest->id}/cancel")
            ->assertOk()
            ->assertJson(['message' => 'Share request cancelled']);
    });
});
