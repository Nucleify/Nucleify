<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302 > Authorized', function () {
    test('invalid method put on show api', function () {
        $this->put(route('users.show', 1))
            ->assertStatus(302);
    });

    test('invalid method put on update api', function () {
        $this->put(route('users.update', 1))
            ->assertStatus(302);
    });

    test('invalid method put on delete api', function () {
        $this->put(route('users.destroy', 1))
            ->assertStatus(302);
    });
});
