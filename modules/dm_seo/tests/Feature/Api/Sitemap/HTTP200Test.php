<?php

if (!defined('PEST_RUNNING')) {
    return;
}

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);

    removeSitemap();
});

describe('200 > Authorized', function (): void {
    test('sitemap generate api', function (): void {
        $response = $this->get(route('sitemap.generate'));

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Sitemap generated successfully',
        ]);
    });
});
