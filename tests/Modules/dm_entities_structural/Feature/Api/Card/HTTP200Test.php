<?php

use App\Models\Card;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    test('index api', function () {
        Card::factory(3)->create();

        $this->getJson(route('cards.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function () {
        Card::factory(3)->create();

        $this->getJson(route('cards.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByCategory api', function () {
        Card::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('cards.getByCategory', ['category' => 'technology']))
            ->assertOk();
    });

    test('store api', function () {
        $this->postJson(route('cards.store'), cardData)
            ->assertOk();
    });

    test('show api', function () {
        $card = Card::factory()->create();

        $this->getJson(route('cards.show', $card->id))
            ->assertOk();
    });

    test('update api', function () {
        $card = Card::factory()->create();

        $this->putJson(route('cards.update', $card->id), updatedCardData)
            ->assertOk();
    });

    test('destroy api', function () {
        $card = Card::factory()->create();

        $this->deleteJson(route('cards.destroy', $card->id))
            ->assertOk();
        $this->assertDatabaseMissing('cards', ['id' => $card->id]);
    });
});
