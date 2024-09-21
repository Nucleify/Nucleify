<?php

describe('405 > UnAuth', function () {
    /**
     * UNAUTHORIZED TESTS
     */
    test('invalid method get on run api without parameter', function () {
        $this->get(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method get json on run api without parameter', function () {
        $this->getJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method put on run api without parameter', function () {
        $this->put(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method put json on run api without parameter', function () {
        $this->putJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method delete on run api without parameter', function () {
        $this->delete(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method delete json on run api without parameter', function () {
        $this->deleteJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method get on run api with parameter', function () {
        $this->get(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method get json on run api with parameter', function () {
        $this->getJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method put on run api with parameter', function () {
        $this->put(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method put json on run api with parameter', function () {
        $this->putJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method delete on run api with parameter', function () {
        $this->delete(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method delete json on run api with parameter', function () {
        $this->deleteJson(route('artisan.run'))
            ->assertStatus(405);
    });
});
