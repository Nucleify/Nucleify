<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Module;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200 > Authorized', function (): void {
    test('index api', function (): void {
        Module::factory(3)->create();

        $this->getJson(route('modules.index'))
            ->assertOk();
    });

    test('store api', function (): void {
        $this->postJson(route('modules.store'), moduleData)
            ->assertOk();
    });

    test('show api', function (): void {
        $Module = Module::factory()->create();

        $this->getJson(route('modules.show', $Module->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $Module = Module::factory()->create();

        $this->putJson(route('modules.update', $Module->id), moduleData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $Module = Module::factory()->create();

        $this->deleteJson(route('modules.destroy', $Module->id))
            ->assertOk();
        $this->assertDatabaseMissing('modules', ['id' => $Module->id]);
    });
});
