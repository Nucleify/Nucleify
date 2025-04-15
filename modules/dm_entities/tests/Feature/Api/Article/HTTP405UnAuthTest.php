<?php

if (!defined('PEST_RUNNING')) {
    return;
}

describe('405 > Method Not Allowed > Unauthorized', function (): void {
    test('invalid method put > index api', function (): void {
        $this->put(route('articles.index', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > index api', function (): void {
        $this->putJson(route('articles.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete > index api', function (): void {
        $this->delete(route('articles.index', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json > index api', function (): void {
        $this->deleteJson(route('articles.index', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > countByCreatedLastWeek api', function (): void {
        $this->postJson(route('articles.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });
    test('invalid method post > countByCreatedLastWeek api', function (): void {
        $this->post(route('articles.countByCreatedLastWeek', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > show api', function (): void {
        $this->postJson(route('articles.show', 1))
            ->assertStatus(405);
    });
    test('invalid method put json > post api', function (): void {
        $this->putJson(route('articles.store', 1))
            ->assertStatus(405);
    });
    test('invalid method delete json > post api', function (): void {
        $this->deleteJson(route('articles.store', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > update api', function (): void {
        $this->postJson(route('articles.update', 1))
            ->assertStatus(405);
    });
    test('invalid method post > delete api', function (): void {
        $this->post(route('articles.destroy', 1))
            ->assertStatus(405);
    });
    test('invalid method post json > delete api', function (): void {
        $this->postJson(route('articles.destroy', 1))
            ->assertStatus(405);
    });
});
