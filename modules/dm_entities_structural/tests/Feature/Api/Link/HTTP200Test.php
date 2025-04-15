<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Link;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    test('index api', function (): void {
        Link::factory(3)->create();

        $this->getJson(route('links.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function (): void {
        Link::factory(3)->create();

        $this->getJson(route('links.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByCategory api', function (): void {
        Link::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('links.getByCategory', ['category' => 'technology']))
            ->assertOk();
    });

    test('getSitelinks api', function (): void {
        Link::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('links.getSiteLinks', ['site' => 'technology']))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('links.store'), linkData)
            ->assertOk();
    });

    test('show api', function (): void {
        $Link = Link::factory()->create();

        $this->getJson(route('links.show', $Link->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $Link = Link::factory()->create();

        $this->putJson(route('links.update', $Link->id), linkData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $Link = Link::factory()->create();

        $this->deleteJson(route('links.destroy', $Link->id))
            ->assertOk();
        $this->assertDatabaseMissing('links', ['id' => $Link->id]);
    });
});
