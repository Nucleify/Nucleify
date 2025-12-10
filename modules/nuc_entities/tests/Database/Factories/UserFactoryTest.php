<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('user-factory');

use App\Models\User;

test('can create record', function (): void {
    $model = User::factory()->create();

    $this->assertDatabaseCount('users', 1)
        ->assertDatabaseHas('users', ['id' => $model->id]);
});

test('can create multiple records', function (): void {
    $models = User::factory()->count(3)->create();

    $this->assertDatabaseCount('users', 3);
    foreach ($models as $model) {
        $this->assertDatabaseHas('users', ['id' => $model->id]);
    }
});
