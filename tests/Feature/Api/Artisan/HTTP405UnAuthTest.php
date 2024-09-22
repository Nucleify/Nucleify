<?php

describe('405 > Unauthorized', function () {
    test('invalid method get without parameter > run command api', function () {
        $this->get(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method get json without parameter > run command api', function () {
        $this->getJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method put without parameter > run command api', function () {
        $this->put(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method put json without parameter > run command api', function () {
        $this->putJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method delete without parameter > run command api', function () {
        $this->delete(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method delete json without parameter > run command api', function () {
        $this->deleteJson(route('artisan.run'))
            ->assertStatus(405);
    });
    test('invalid method get with parameter > run command api', function () {
        $this->get(route('artisan.run', 1))
            ->assertStatus(405);
    });
    test('invalid method get json with parameter > run command api', function () {
        $this->getJson(route('artisan.run', 1))
            ->assertStatus(405);
    });
    test('invalid method put with parameter > run command api', function () {
        $this->put(route('artisan.run', 1))
            ->assertStatus(405);
    });
    test('invalid method put json with parameter > run command api', function () {
        $this->putJson(route('artisan.run', 1))
            ->assertStatus(405);
    });
    test('invalid method delete with parameter > run command api', function () {
        $this->delete(route('artisan.run', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json with parameter > run command api', function () {
        $this->deleteJson(route('artisan.run', 1))
            ->assertStatus(405);
    });
});
