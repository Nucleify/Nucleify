<?php

if (!defined('PEST_RUNNING')) {
    return;
}

use App\Models\Module;

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('200', function (): void {
    test('getAllModules api', function (): void {
        $this->get(route('modules.getAllModules'))
            ->assertOk()
            ->assertJson([
                'modules' => require base_path('modules/nuc_modules/hooks/getAllModules.php'),
            ]);
    });

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
        $model = Module::factory()->create();

        $this->getJson(route('modules.show', $model->id))
            ->assertOk();
    });

    test('update api', function (): void {
        $model = Module::factory()->create();

        $this->putJson(route('modules.update', $model->id), moduleData)
            ->assertOk();
    });

    test('destroy api', function (): void {
        $model = Module::factory()->create();

        $this->deleteJson(route('modules.destroy', $model->id))
            ->assertOk();
        $this->assertDatabaseMissing('modules', ['id' => $model->id]);
    });
});
