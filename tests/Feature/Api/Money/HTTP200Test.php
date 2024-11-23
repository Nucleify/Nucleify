<?php

use App\Models\Money;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    test('index api', function () {
        Money::factory(3)->create();

        $this->getJson(route('money.index'))
            ->assertOk();
    });

    test('show api', function () {
        $money = Money::factory()->create();

        $this->getJson(route('money.show', $money->id))
            ->assertOk();
    });

    test('store api', function () {
        $this->postJson(route('money.store'), moneyData)
            ->assertOk();
    });

    test('update api', function () {
        $money = Money::factory()->create();

        $this->putJson(route('money.update', $money->id), updatedMoneyData)
            ->assertOk();
    });

    test('destroy api', function () {
        $money = Money::factory()->create();

        $this->deleteJson(route('money.destroy', $money->id))
            ->assertOk();
        $this->assertDatabaseMissing('money', ['id' => $money->id]);
    });
});
