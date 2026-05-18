<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('share-controller');

use App\Http\Controllers\ShareController;
use App\Models\ShareRequest;
use App\Services\ShareService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(ShareController::class, ['service' => app()->make(ShareService::class)]);
});

describe('200', function (): void {
    test('received method returns empty array initially', function (): void {
        $response = $this->controller->received();

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['data' => []]);
    });

    test('sent method returns empty array initially', function (): void {
        $response = $this->controller->sent();

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['data' => []]);
    });

    test('count method returns zero initially', function (): void {
        $response = $this->controller->count();

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['count' => 0]);
    });

    test('create method creates share requests', function (): void {
        $request = Request::create('/api/share', 'POST', [
            'entity_ids' => [1, 2],
            'entity_type' => 'article',
            'user_ids' => [$this->user->id],
        ]);

        $response = $this->controller->create($request);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true)['message'])
            ->toContain('Created');
    });

    test('reject method rejects share request', function (): void {
        $shareRequest = ShareRequest::create([
            'sender_id' => $this->user->id,
            'receiver_id' => $this->admin->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $response = $this->controller->reject($shareRequest->id);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['message' => 'Share request rejected']);
    });

    test('cancel method cancels share request', function (): void {
        $shareRequest = ShareRequest::create([
            'sender_id' => $this->admin->id,
            'receiver_id' => $this->user->id,
            'entity_type' => 'article',
            'entity_ids' => [1],
            'status' => 'pending',
        ]);

        $response = $this->controller->cancel($shareRequest->id);

        expect($response->getStatusCode())
            ->toEqual(200)
            ->and($response->getData(true))
            ->toEqual(['message' => 'Share request cancelled']);
    });
});

describe('400', function (): void {
    test('reject method returns 400 for non-existent request', function (): void {
        $response = $this->controller->reject(99999);

        expect($response->getStatusCode())
            ->toEqual(400)
            ->and($response->getData(true)['error'])
            ->toContain('not found');
    });

    test('cancel method returns 400 for non-existent request', function (): void {
        $response = $this->controller->cancel(99999);

        expect($response->getStatusCode())
            ->toEqual(400)
            ->and($response->getData(true)['error'])
            ->toContain('not found');
    });

    test('accept method returns 400 for non-existent request', function (): void {
        $response = $this->controller->accept(99999);

        expect($response->getStatusCode())
            ->toEqual(400)
            ->and($response->getData(true)['error'])
            ->toContain('not found');
    });
});
