<?php

use Illuminate\Http\Request;

use App\Http\Controllers\Entities\MoneyController;
use App\Http\Requests\Money\PostRequest;
use App\Http\Requests\Money\PutRequest;
use App\Models\Money;
use App\Services\MoneyService;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
    $this->controller = app()->makeWith(MoneyController::class, ['moneyService' => app()->make(MoneyService::class)]);
});

it('runs index method successfully', function () {
    Money::factory(3)->create();

    $request = new Request();

    $response = $this->controller->index($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs show method successfully', function () {
    $money = Money::factory()->create();

    $response = $this->controller->show($money->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs store method successfully', function () {
    $request = Mockery::mock(PostRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(moneyData);

    $response = $this->controller->store($request);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs update method successfully', function () {
    $money = Money::factory()->create();

    $request = Mockery::mock(PutRequest::class);
    $request->shouldReceive('validated')
        ->andReturn(updatedMoneyData);

    $response = $this->controller->update($request, $money->id);

    expect($response->getStatusCode())->toEqual(200);
    expect($response->getData(true));
});

it('runs delete method successfully', function () {
    $money = Money::factory()->create();

    $response = $this->controller->destroy($money->id);

    expect($response->getStatusCode())->toEqual(200);
    $this->assertDatabaseMissing('money', ['id' => $money->id]);
});
