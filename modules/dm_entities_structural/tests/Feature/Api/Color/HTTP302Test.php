<?php if (!defined('PEST_RUNNING')) return; 


beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('302 > Redirect > Authorized', function () {
    test('invalid method put > show api', function () {
        $this->put(route('colors.show', 1))
            ->assertStatus(302);
    });

    test('invalid method put > update api', function () {
        $this->put(route('colors.update', 1))
            ->assertStatus(302);
    });

    test('invalid method put > delete api', function () {
        $this->put(route('colors.destroy', 1))
            ->assertStatus(302);
    });
});
