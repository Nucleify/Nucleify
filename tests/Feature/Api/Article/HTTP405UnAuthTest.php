<?php

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->user);
});

describe('405 > Unauthorized', function () {
    test('invalid method put > index api', function () {
        $this->put(route('articles.index', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > index api', function () {
        $this->putJson(route('articles.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete > index api', function () {
        $this->delete(route('articles.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json > index api', function () {
        $this->deleteJson(route('articles.index', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > show api', function () {
        $this->postJson(route('articles.show', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > post api', function () {
        $this->putJson(route('articles.store', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json > post api', function () {
        $this->deleteJson(route('articles.store', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > update api', function () {
        $this->postJson(route('articles.update', 1))
            ->assertStatus(405);
    });
    test('invalid method post > delete api', function () {
        $this->post(route('articles.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > delete api', function () {
        $this->postJson(route('articles.destroy', 1))
            ->assertStatus(405);
    });
});
