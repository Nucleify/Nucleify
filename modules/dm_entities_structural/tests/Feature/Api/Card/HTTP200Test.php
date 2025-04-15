<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Card;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
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
        $card = Card::factory()->create();

        $this->getJson(route('cards.show', $card->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $card = Card::factory()->create();

        $this->putJson(route('cards.update', $card->id), updatedCardData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $card = Card::factory()->create();

        $this->deleteJson(route('cards.destroy', $card->id))
            ->assertOk();
        $this->assertDatabaseMissing('cards', ['id' => $card->id]);
    });
});
