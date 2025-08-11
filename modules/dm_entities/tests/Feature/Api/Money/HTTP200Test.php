<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('money-api-200');
uses()->group('api-200');

use App\Models\Money;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        Money::factory(3)->create();

        $this->getJson(route('money.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Money::factory(3)->create();

        $this->getJson(route('money.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('show api', function (): void {
        $model = Money::factory()->create();

        $this->getJson(route('money.show', $model->id))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('money.store'), moneyData)
            ->assertOk();
    });

    test('update api', function (): void {
        $model = Money::factory()->create();

        $this->putJson(route('money.update', $model->id), updatedMoneyData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = Money::factory()->create();

        $this->deleteJson(route('money.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('money', ['id' => $model->id]);
    });
});
