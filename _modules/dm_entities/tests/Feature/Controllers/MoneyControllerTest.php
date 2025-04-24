<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Http\Controllers\MoneyController;
use App\Http\Requests\Money\PostRequest;
use App\Http\Requests\Money\PutRequest;
use App\Models\Money;
use App\Services\MoneyService;
use Illuminate\Http\Request;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(MoneyController::class, ['moneyService' => app()->make(MoneyService::class)]);
});

test('index > success', function (): void {
    Money::factory(3)->create();

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
    $money = Money::factory()->create();

    $response = $this->controller->show($money->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('store > success', function (): void {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(moneyData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('update > success', function (): void {
    $money = Money::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedMoneyData);

    $response = $this->controller->update($request, $money->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

test('delete > success', function (): void {
    $money = Money::factory()->create();

    $response = $this->controller->destroy($money->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('money', ['id' => $money->id]);
});
