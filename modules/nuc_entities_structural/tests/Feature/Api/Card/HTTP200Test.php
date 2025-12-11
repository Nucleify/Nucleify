<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('card-api-200');
uses()->group('api-200');

use App\Models\Card;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('index api', function (): void {
        Card::factory(3)->create();

        $this->getJson(route('cards.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Card::factory(3)->create();

        $this->getJson(route('cards.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByCategory api', function (): void {
        Card::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('cards.getByCategory', ['category' => 'technology']))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('cards.store'), cardData)
            ->assertOk();
    });

    test('show api', function (): void {
        $model = Card::factory()->create();

        $this->getJson(route('cards.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = Card::factory()->create();

        $this->putJson(route('cards.update', $model->id), updatedCardData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = Card::factory()->create();

        $this->deleteJson(route('cards.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('cards', ['id' => $model->id]);
    });
});
