<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Method Not Allowed > Authorized', function () {
    test('invalid method put > index api', function () {
        $this->put(route('features.index', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > index api', function () {
        $this->putJson(route('features.index', 1))
            ->assertStatus(405);
    });

    test('invalid method delete > index api', function () {
        $this->delete(route('features.index', 1))
            ->assertStatus(405);
    });

    test('invalid delete json > index api', function () {
        $this->deleteJson(route('features.index', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > countByCreatedLastWeek api', function () {
        $this->postJson(route('features.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post > countByCreatedLastWeek api', function () {
        $this->post(route('features.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > show api', function () {
        $this->postJson(route('features.show', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > post api', function () {
        $this->putJson(route('features.store', 1))
            ->assertStatus(405);
    });

    test('invalid method delete json > post api', function () {
        $this->deleteJson(route('features.store', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > update api', function () {
        $this->postJson(route('features.update', 1))
            ->assertStatus(405);
    });

    test('invalid method post > delete api', function () {
        $this->post(route('features.destroy', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > delete api', function () {
        $this->postJson(route('features.destroy', 1))
            ->assertStatus(405);
    });
});
