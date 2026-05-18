<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('share-api-500');
uses()->group('api-500');

use App\Services\ShareService;

use function Pest\Laravel\mock;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->service = mock(ShareService::class);
});

function mockShareServiceMethod($service, string $methodName): void
{
    $service
        ->shouldReceive($methodName)
        ->once()
        ->andThrow(new Exception('Internal Server Error'));
}

describe('500', function (): void {
    test('create share request api', function (): void {
        mockShareServiceMethod($this->service, 'createShareRequest');

        $this->postJson('/api/share', [
            'entity_ids' => [1, 2],
            'entity_type' => 'article',
            'user_ids' => [$this->user->id],
        ])
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('get received requests api', function (): void {
        mockShareServiceMethod($this->service, 'getReceivedRequests');

        $this->getJson('/api/share/received')
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('get sent requests api', function (): void {
        mockShareServiceMethod($this->service, 'getSentRequests');

        $this->getJson('/api/share/sent')
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('get pending count api', function (): void {
        mockShareServiceMethod($this->service, 'getPendingCount');

        $this->getJson('/api/share/count')
            ->assertStatus(500)
            ->assertJson(['error' => 'Internal Server Error']);
    });

    test('accept share request api', function (): void {
        mockShareServiceMethod($this->service, 'acceptRequest');

        $this->postJson('/api/share/1/accept')
            ->assertStatus(400)
            ->assertJsonStructure(['error']);
    });

    test('reject share request api', function (): void {
        mockShareServiceMethod($this->service, 'rejectRequest');

        $this->postJson('/api/share/1/reject')
            ->assertStatus(400)
            ->assertJsonStructure(['error']);
    });

    test('cancel share request api', function (): void {
        mockShareServiceMethod($this->service, 'cancelRequest');

        $this->postJson('/api/share/1/cancel')
            ->assertStatus(400)
            ->assertJsonStructure(['error']);
    });
});
