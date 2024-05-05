<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('405 > Auth', function () {
    /**
     * AUTHORIZED TESTS
     */
    test('authorized invalid method put on index api', function () {
        $this->put(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('authorized invalid method put json on index api', function () {
        $this->putJson(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('authorized invalid method delete on index api', function () {
        $this->delete(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('authorized invalid method delete json on index api', function () {
        $this->deleteJson(route('activity-log.index', 1))
            ->assertStatus(405);
    });
    test('authorized invalid method post json on show api', function () {
        $this->postJson(route('activity-log.show', 1))
            ->assertStatus(405);
    });
    test('authorized invalid method post on delete api', function () {
        $this->post(route('activity-log.destroy', 1))
            ->assertStatus(405);
    });
    test('authorized invalid method post json on delete api', function () {
        $this->postJson(route('activity-log.destroy', 1))
            ->assertStatus(405);
    });
});
