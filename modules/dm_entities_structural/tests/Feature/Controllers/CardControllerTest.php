<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('card-controller');

use App\Http\Controllers\CardController;
use App\Http\Requests\Card\PostRequest;
use App\Http\Requests\Card\PutRequest;
use App\Models\Card;
use App\Services\CardService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(CardController::class, ['cardService' => app()->make(CardService::class)]);
});

describe('200', function (): void {
    test('index method', function (): void {
        Card::factory()->count(3)->create();

        $request = new Request;

        $response = $this->controller->index($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('countByCreatedLastWeek method', function (): void {
        $request = new Request;

        $response = $this->controller->countByCreatedLastWeek($request);

        expect($response->getStatusCode())->toEqual(200);
    });

    test('show method', function (): void {
        $card = Card::factory()->create();

        $response = $this->controller->show($card->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(cardData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('update method', function (): void {
        $card = Card::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(updatedCardData);

        $response = $this->controller->update($request, $card->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('delete method', function (): void {
        $card = Card::factory()->create();

        $response = $this->controller->destroy($card->id);

        expect($response->getStatusCode())->toEqual(200);
        $this->assertDatabaseMissing('cards', ['id' => $card->id]);
    });
});
