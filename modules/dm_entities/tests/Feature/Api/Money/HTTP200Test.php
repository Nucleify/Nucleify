<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Money;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
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
        $money = Money::factory()->create();

        $this->getJson(route('money.show', $money->id))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('money.store'), moneyData)
            ->assertOk();
    });

    test('update api', function (): void {
        $money = Money::factory()->create();

        $this->putJson(route('money.update', $money->id), updatedMoneyData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $money = Money::factory()->create();

        $this->deleteJson(route('money.destroy', $money->id))
            ->assertOk();
        $this->assertDatabaseMissing('money', ['id' => $money->id]);
    });
});
