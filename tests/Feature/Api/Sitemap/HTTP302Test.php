<?php

describe('302', function () {
    test('authorized generates a sitemap via API', function () {
        $response = $this->get(route('sitemap.generate'));

        $response->assertStatus(302);
    });
});
