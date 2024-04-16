<?php

use App\Models\Contact;

beforeEach(function () {
    $this->createUsers();
});

it('can be created', function () {
    $contact = Contact::factory()->create();

    expect($contact)->toBeInstanceOf(Contact::class);
});

