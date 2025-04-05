<?php

beforeEach(function () {
    $this->createUsers();
    $this->actingAs($this->admin);

    removeSitemap();
});

describe('200 > Authorized', function () {
    test('sitemap generate api', function () {
        $response = $this->get(route('sitemap.generate'));

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Sitemap generated successfully'
        ]);
    });
});
