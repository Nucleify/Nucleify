<?php

describe('302 > Redirect > Unauthorized', function () {
    test('sitemap generate api', function () {
        $response = $this->get(route('sitemap.generate'));

        $response->assertStatus(302);
    });
});
