<?php

use Illuminate\Support\Facades\Schema;

it('can create table', function () {
    expect(Schema::hasTable('task_collaborations'))->toBeTrue()
        ->and(Schema::hasColumns('task_collaborations', [
            'id', 'collaborator_id','task_id', 'created_at', 'updated_at'
        ]))->toBeTrue();
});

it('can be rolled back', function () {
    $this->artisan('migrate:rollback');

    expect(Schema::hasTable('task_collaborations'))->toBeFalse();
});
