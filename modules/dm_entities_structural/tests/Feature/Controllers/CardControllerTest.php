<?php

if (!defined('PEST_RUNNING')) {
    return;
}

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

test('index > success', function (): void {
    Card::factory()->count(3)->create();

    $request = new Request;

    $response = $this->controller->index($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('countByCreatedLastWeek > success', function (): void {
    $request = new Request;

    $response = $this->controller->countByCreatedLastWeek($request);

    expect($response->getStatusCode())->toEqual(200);
});

test('show > success', function (): void {
    $card = Card::factory()->create();

    $response = $this->controller->show($card->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(cardData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function (): void {
    $card = Card::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedCardData);

    $response = $this->controller->update($request, $card->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $card = Card::factory()->create();

    $response = $this->controller->destroy($card->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('cards', ['id' => $card->id]);
});
