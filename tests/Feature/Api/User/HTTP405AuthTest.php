<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Authorized', function () {
    test('invalid method put > index api', function () {
        $this->put(route('users.index', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > index api', function () {
        $this->putJson(route('users.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete > index api', function () {
        $this->delete(route('users.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json > index api', function () {
        $this->deleteJson(route('users.index', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > show api', function () {
        $this->postJson(route('users.show', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > post api', function () {
        $this->putJson(route('users.store', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json > post api', function () {
        $this->deleteJson(route('users.store', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > update api', function () {
        $this->postJson(route('users.update', 1))
            ->assertStatus(405);
    });
    test('invalid method post > delete api', function () {
        $this->post(route('users.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > delete api', function () {
        $this->postJson(route('users.destroy', 1))
            ->assertStatus(405);
    });
});
