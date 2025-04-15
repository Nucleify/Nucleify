<?php

use App\Models\Article;
use App\Models\Card;
use App\Models\Contact;
use App\Models\Question;
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
        case 'Card':
            expect($log)->toContain('Card')->toContain($model->src)->toContain($method)->toContain($causer->name);
            break;
        case 'Contact':
            expect($log)->toContain('Contact')->toContain($model->first_name)->toContain($model->last_name)->toContain($method)->toContain($causer->name);
            break;
        case 'Feature':
            expect($log)->toContain('Feature')->toContain($model->header)->toContain($method)->toContain($causer->name);
            break;
        case 'User':
            expect($log)->toContain('User')->toContain($model->name)->toContain($method)->toContain($causer->name);
            break;
        case 'Question':
            expect($log)->toContain('Question')->toContain($model->content)->toContain($model->answer)->toContain($method)->toContain($causer->user_id);
            break;
        default:
            break;
    }
}

function getModelByEntity(string $entity): Contact|Card|Article|User|Question|null
{
    return match ($entity) {
        'Article' => new Article(['title' => 'Test Article']),
        'Card' => new Card(['src' => 'testSrc']),
        'Contact' => new Contact(['first_name' => 'Test', 'last_name' => 'Name']),
        'User' => new User(['name' => 'Test Name']),
        'Question' => new Question(['content' => 'Test Question']),
        default => null,
    };
}
