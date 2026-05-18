<?php

if (!defined('PEST_RUNNING')) {
    return;
}

uses()->group('technology-api-422');
uses()->group('technology-api-422-post');
uses()->group('api-422');
uses()->group('api-422-post');

beforeEach(function (): void {
    $this->createUsers();
    $this->actingAs($this->admin);
});

describe('422 > POST', function (): void {
    apiTestArray([
        // LABEL TESTS
        'label > empty' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['label' => '']),
            'structure' => ['errors' => ['label']],
            'fragment' => ['errors' => ['label' => ['The label field is required.']]],
        ],
        'label > integer' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['label' => 1]),
            'structure' => ['errors' => ['label']],
            'fragment' => ['errors' => ['label' => ['The label field must be a string.']]],
        ],
        'label > false' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['label' => false]),
            'structure' => ['errors' => ['label']],
            'fragment' => ['errors' => ['label' => ['The label field must be a string.']]],
        ],
        'label > true' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['label' => true]),
            'structure' => ['errors' => ['label']],
            'fragment' => ['errors' => ['label' => ['The label field must be a string.']]],
        ],
        'label > empty array' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['label' => []]),
            'structure' => ['errors' => ['label']],
            'fragment' => ['errors' => ['label' => ['The label field is required.']]],
        ],

        // DESCRIPTION TESTS
        'description > integer' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['description' => 1]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > too short' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['description' => 't']),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be at least 3 characters.']]],
        ],
        'description > false' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['description' => false]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > true' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['description' => true]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],
        'description > empty array' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['description' => []]),
            'structure' => ['errors' => ['description']],
            'fragment' => ['errors' => ['description' => ['The description field must be a string.', 'The description field must be at least 3 characters.']]],
        ],

        // HREF TESTS
        'href > empty' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['href' => '']),
            'structure' => ['errors' => ['href']],
            'fragment' => ['errors' => ['href' => ['The href field is required.']]],
        ],
        'href > integer' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['href' => 1]),
            'structure' => ['errors' => ['href']],
            'fragment' => ['errors' => ['href' => ['The href field must be a string.']]],
        ],
        'href > false' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['href' => false]),
            'structure' => ['errors' => ['href']],
            'fragment' => ['errors' => ['href' => ['The href field must be a string.']]],
        ],
        'href > true' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['href' => true]),
            'structure' => ['errors' => ['href']],
            'fragment' => ['errors' => ['href' => ['The href field must be a string.']]],
        ],
        'href > empty array' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['href' => []]),
            'structure' => ['errors' => ['href']],
            'fragment' => ['errors' => ['href' => ['The href field is required.']]],
        ],

        // SRC TESTS
        'src > empty' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['src' => '']),
            'structure' => ['errors' => ['src']],
            'fragment' => ['errors' => ['src' => ['The src field is required.']]],
        ],
        'src > integer' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['src' => 1]),
            'structure' => ['errors' => ['src']],
            'fragment' => ['errors' => ['src' => ['The src field must be a string.']]],
        ],
        'src > false' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['src' => false]),
            'structure' => ['errors' => ['src']],
            'fragment' => ['errors' => ['src' => ['The src field must be a string.']]],
        ],
        'src > true' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['src' => true]),
            'structure' => ['errors' => ['src']],
            'fragment' => ['errors' => ['src' => ['The src field must be a string.']]],
        ],
        'src > empty array' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['src' => []]),
            'structure' => ['errors' => ['src']],
            'fragment' => ['errors' => ['src' => ['The src field is required.']]],
        ],

        // CATEGORY TESTS
        'category > integer' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['category' => 1]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > false' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['category' => false]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > true' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['category' => true]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
        'category > empty array' => [
            'method' => 'POST',
            'route' => 'technologies.store',
            'data' => array_merge(technologyData, ['category' => []]),
            'structure' => ['errors' => ['category']],
            'fragment' => ['errors' => ['category' => ['The category field must be a string.']]],
        ],
    ]);
});
