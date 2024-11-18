<?php

use Illuminate\Support\Facades\File;

use App\Models\Article;
use App\Models\Contact;
use App\Models\User;

function apiTest($method, $route, $status, $data = null, $expectedJsonStructure = null, $expectedJsonFragment = null, $validationErrors = null): Closure
{
    return function () use ($method, $route, $data, $status, $expectedJsonStructure, $expectedJsonFragment, $validationErrors) {
        $request = match ($method) {
            'GET' => $this->getJson(route($route)),
            'SHOW' => $this->getJson(route($route, $data)),
            'POST' => $this->postJson(route($route), $data),
            'PUT' => $this->putJson(route($route, 1), $data),
            'DELETE' => $this->deleteJson(route($route, 1)),
        };

        $request->assertStatus($status);

        $expectedJsonStructure && $request->assertJsonStructure($expectedJsonStructure);
        $expectedJsonFragment && $request->assertJsonFragment($expectedJsonFragment);
        $validationErrors && $request->assertJsonValidationErrors($validationErrors);
    };
}

function expectLogMessage($log, $model, $method, $causer, $entity): void
{
    switch ($entity) {
        case 'Article':
            expect($log)->toContain('Article')->toContain($model->title)->toContain($method)->toContain($causer->name);
            break;
        case 'Contact':
            expect($log)->toContain('Contact')->toContain($model->first_name)->toContain($model->last_name)->toContain($method)->toContain($causer->name);
            break;
        case 'User':
            expect($log)->toContain('User')->toContain($model->name)->toContain($method)->toContain($causer->name);
            break;
        default:
            break;
    }
}

function getModelByEntity(string $entity): Contact|Article|User|null
{
    return match ($entity) {
        'Article' => new Article(['title' => 'Test Article']),
        'Contact' => new Contact(['first_name' => 'Test', 'last_name' => 'Name']),
        'User' => new User(['name' => 'Test Name']),
        default => null,
    };
}

function removeSitemap() {
    if (File::exists(public_path('sitemap.xml'))) {
        File::delete(public_path('sitemap.xml'));
    }
}
