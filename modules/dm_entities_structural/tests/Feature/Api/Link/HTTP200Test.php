<?php if (!defined('PEST_RUNNING')) return; 


use App\Models\Link;

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function () {
    test('index api', function () {
        Link::factory(3)->create();

        $this->getJson(route('links.index'))
            ->assertOk();
    });

    test('countByCreatedLastWeek api', function () {
        Link::factory(3)->create();

        $this->getJson(route('links.countByCreatedLastWeek'))
            ->assertOk();
    });

    test('getByCategory api', function () {
        Link::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('links.getByCategory', ['category' => 'technology']))
            ->assertOk();
    });

    test('getSitelinks api', function () {
        Link::factory(3)->create(['category' => 'technology']);

        $this->getJson(route('links.getSiteLinks', ['site' => 'technology']))
            ->assertOk();
    });

    test('store api', function () {
        $this->postJson(route('links.store'), linkData)
            ->assertOk();
    });

    test('show api', function () {
        $Link = Link::factory()->create();

        $this->getJson(route('links.show', $Link->id))
            ->assertOk();
    });

    test('update api', function () {
        $Link = Link::factory()->create();

        $this->putJson(route('links.update', $Link->id), linkData)
            ->assertOk();
    });

    test('destroy api', function () {
        $Link = Link::factory()->create();

        $this->deleteJson(route('links.destroy', $Link->id))
            ->assertOk();
        $this->assertDatabaseMissing('links', ['id' => $Link->id]);
    });
});
