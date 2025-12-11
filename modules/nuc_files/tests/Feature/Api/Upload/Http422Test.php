<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422', function () {
    test('missing file', function () {
        $this->postJson(route('files.upload'), [])
            ->assertStatus(422);
    });
});
