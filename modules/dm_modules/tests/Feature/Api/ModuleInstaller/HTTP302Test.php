<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('module-installer-api-302');
uses()->group('api-302');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302', function (): void {
    test('post > install api', function (): void {
        $this->post(route('modules.install', []))
            ->assertStatus(302);
    });

    test('put > install api', function (): void {
        $this->put(route('modules.install', []))
            ->assertStatus(302);
    });

    test('post > uninstall api', function (): void {
        $this->post(route('modules.uninstall', []))
            ->assertStatus(302);
    });

    test('put > uninstall api', function (): void {
        $this->put(route('modules.uninstall', []))
            ->assertStatus(302);
    });
});
