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
        $this->put(route('colors.index', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > index api', function () {
        $this->putJson(route('colors.index', 1))
            ->assertStatus(405);
    });

    test('invalid method delete > index api', function () {
        $this->delete(route('colors.index', 1))
            ->assertStatus(405);
    });

    test('invalid delete json > index api', function () {
        $this->deleteJson(route('colors.index', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > countByCreatedLastWeek api', function () {
        $this->postJson(route('colors.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post > countByCreatedLastWeek api', function () {
        $this->post(route('colors.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > show api', function () {
        $this->postJson(route('colors.show', 1))
            ->assertStatus(405);
    });

    test('invalid method put json > post api', function () {
        $this->putJson(route('colors.store', 1))
            ->assertStatus(405);
    });

    test('invalid method delete json > post api', function () {
        $this->deleteJson(route('colors.store', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > update api', function () {
        $this->postJson(route('colors.update', 1))
            ->assertStatus(405);
    });

    test('invalid method post > delete api', function () {
        $this->post(route('colors.destroy', 1))
            ->assertStatus(405);
    });

    test('invalid method post json > delete api', function () {
        $this->postJson(route('colors.destroy', 1))
            ->assertStatus(405);
    });
});
