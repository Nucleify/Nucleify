<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('share-service');

use App\Models\ShareRequest;
use App\Models\User;
use App\Services\ShareService;

beforeEach(function (): void {
    $this->user = User::factory()->create();
    $this->otherUser = User::factory()->create();

    $this->service = new ShareService;
    $this->actingAs($this->user);
});

describe('createShareRequest', function (): void {
    test('can create share request for single user', function (): void {
        $response = $this->service->createShareRequest(
            [1, 2],
            'article',
            [$this->otherUser->id]
        );

        expect($response['message'])
            ->toContain('Created 1 share requests')
            ->and(ShareRequest::count())
            ->toBe(1);
    });

    test('can create share request for multiple users', function (): void {
        $thirdUser = User::factory()->create();

        $response = $this->service->createShareRequest(
            [1],
            'article',
            [$this->otherUser->id, $thirdUser->id]
        );

        expect($response['message'])
            ->toContain('Created 2 share requests')
            ->and(ShareRequest::count())
            ->toBe(2);
    });
});

describe('getReceivedRequests', function (): void {
    test('returns empty array when no requests', function (): void {
        $response = $this->service->getReceivedRequests();

        expect($response)
            ->toBeArray()
            ->toBeEmpty();
    });

    test('returns pending requests for current user', function (): void {
        ShareRequest::create([
            'sender_id' => $this->otherUser->id,
            'receiver_id' => $this->user->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $response = $this->service->getReceivedRequests();

        expect($response)
            ->toBeArray()
            ->toHaveCount(1);
    });

    test('does not return accepted requests', function (): void {
        ShareRequest::create([
            'sender_id' => $this->otherUser->id,
            'receiver_id' => $this->user->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'accepted',
        ]);

        $response = $this->service->getReceivedRequests();

        expect($response)
            ->toBeArray()
            ->toBeEmpty();
    });
});

describe('getSentRequests', function (): void {
    test('returns empty array when no requests sent', function (): void {
        $response = $this->service->getSentRequests();

        expect($response)
            ->toBeArray()
            ->toBeEmpty();
    });

    test('returns all sent requests', function (): void {
        ShareRequest::create([
            'sender_id' => $this->user->id,
            'receiver_id' => $this->otherUser->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $response = $this->service->getSentRequests();

        expect($response)
            ->toBeArray()
            ->toHaveCount(1);
    });
});

describe('getPendingCount', function (): void {
    test('returns zero when no pending requests', function (): void {
        $response = $this->service->getPendingCount();

        expect($response)->toBe(0);
    });

    test('returns correct count of pending requests', function (): void {
        ShareRequest::create([
            'sender_id' => $this->otherUser->id,
            'receiver_id' => $this->user->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        ShareRequest::create([
            'sender_id' => $this->otherUser->id,
            'receiver_id' => $this->user->id,
            'entity_type' => 'task',
            'entity_ids' => [2],
            'status' => 'pending',
        ]);

        $response = $this->service->getPendingCount();

        expect($response)->toBe(2);
    });
});

describe('rejectRequest', function (): void {
    test('can reject a pending request', function (): void {
        $shareRequest = ShareRequest::create([
            'sender_id' => $this->otherUser->id,
            'receiver_id' => $this->user->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $response = $this->service->rejectRequest($shareRequest->id);

        expect($response['message'])
            ->toBe('Share request rejected')
            ->and($shareRequest->fresh()->status)
            ->toBe('rejected');
    });

    test('throws exception for non-existent request', function (): void {
        $this->service->rejectRequest(99999);
    })->throws(Exception::class, 'Share request not found');
});

describe('cancelRequest', function (): void {
    test('can cancel a sent request', function (): void {
        $shareRequest = ShareRequest::create([
            'sender_id' => $this->user->id,
            'receiver_id' => $this->otherUser->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $response = $this->service->cancelRequest($shareRequest->id);

        expect($response['message'])
            ->toBe('Share request cancelled')
            ->and(ShareRequest::find($shareRequest->id))
            ->toBeNull();
    });

    test('throws exception for non-existent request', function (): void {
        $this->service->cancelRequest(99999);
    })->throws(Exception::class, 'Share request not found');
});
