<?php

describe('405 > Method Not Allowed > Unauthorized', function () {
    test('invalid method put with parameter > index api', function () {
        $this->put(route('contacts.index', 1))
            ->assertStatus(405);
    });
    test('invalid method put json with parameter > index api', function () {
        $this->putJson(route('contacts.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete with parameter > index api', function () {
        $this->delete(route('contacts.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json with parameter > index api', function () {
        $this->deleteJson(route('contacts.index', 1))
            ->assertStatus(405);
    });
    test('invalid method post json with parameter > show api', function () {
        $this->postJson(route('contacts.show', 1))
            ->assertStatus(405);
    });
    test('invalid method put json with parameter > post api', function () {
        $this->putJson(route('contacts.store', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json with parameter > post api', function () {
        $this->deleteJson(route('contacts.store', 1))
            ->assertStatus(405);
    });
    test('invalid method post json with parameter > update api', function () {
        $this->postJson(route('contacts.update', 1))
            ->assertStatus(405);
    });
    test('invalid method post with parameter > delete api', function () {
        $this->post(route('contacts.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method post json with parameter > delete api', function () {
        $this->postJson(route('contacts.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method put without parameter > index api', function () {
        $this->put(route('contacts.index'))
            ->assertStatus(405);
    });
    test('invalid method put json without parameter > index api', function () {
        $this->putJson(route('contacts.index'))
            ->assertStatus(405);
    });
    test('invalid method delete without parameter > index api', function () {
        $this->delete(route('contacts.index'))
            ->assertStatus(405);
    });
    test('invalid method delete json without parameter > index api', function () {
        $this->deleteJson(route('contacts.index'))
            ->assertStatus(405);
    });
    test('invalid method put json without parameter > post api', function () {
        $this->putJson(route('contacts.store'))
            ->assertStatus(405);
    });
    test('invalid method delete json without parameter > post api', function () {
        $this->deleteJson(route('contacts.store'))
            ->assertStatus(405);
    });
});
