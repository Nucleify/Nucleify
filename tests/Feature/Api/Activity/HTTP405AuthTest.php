<?php

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Method Not Allowed > Authorized', function () {
    test('invalid method put > index api', function () {
        $this->put(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > index api', function () {
        $this->putJson(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete > index api', function () {
        $this->delete(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json > index api', function () {
        $this->deleteJson(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > show api', function () {
        $this->postJson(route('activity-log.show', 1))
            ->assertStatus(405);
    });
    test('invalid method post > delete api', function () {
        $this->post(route('activity-log.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > delete api', function () {
        $this->postJson(route('activity-log.destroy', 1))
            ->assertStatus(405);
    });
});
