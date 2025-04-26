<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('302 > Redirect > Unauthorized', function (): void {
    test('sitemap generate api', function (): void {
        $response = $this->get(route('sitemap.generate'));

        $response->assertStatus(302);
    });
});
