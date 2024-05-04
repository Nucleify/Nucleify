<?php


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302', function () {
    test('authorized invalid method put on show api', function () {
        $this->put(route('articles.show', 1))
            ->assertStatus(302);
    });

    test('authorized invalid method put on update api', function () {
        $this->put(route('articles.update', 1))
            ->assertStatus(302);
    });

    test('authorized invalid method put on delete api', function () {
        $this->put(route('articles.destroy', 1))
            ->assertStatus(302);
    });
});
