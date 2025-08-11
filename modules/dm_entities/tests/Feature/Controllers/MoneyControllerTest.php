<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-controller');

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

describe('200', function (): void {
    test('index method', function (): void {
        Money::factory(3)->create();

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
        $money = Money::factory()->create();

        $response = $this->controller->show($money->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('store method', function (): void {
        $request = Mockery::mock(PostRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(moneyData);

        $response = $this->controller->store($request);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('update method', function (): void {
        $money = Money::factory()->create();

        $request = Mockery::mock(PutRequest::class);
        $request->shouldReceive('validated')
            ->andReturn(updatedMoneyData);

        $response = $this->controller->update($request, $money->id);

        expect($response->getStatusCode())->toEqual(200);
        expect($response->getData(true));
    });

    test('delete method', function (): void {
        $money = Money::factory()->create();

        $response = $this->controller->destroy($money->id);

        expect($response->getStatusCode())->toEqual(200);
        $this->assertDatabaseMissing('money', ['id' => $money->id]);
    });
});
