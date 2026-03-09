<?php

return [

    'collections' => [

        'default' => [

            'info' => [
                'title' => config('app.name'),
                'description' => null,
                'version' => '1.0.0',
                'contact' => [],
            ],

            'servers' => [
                [
                    'url' => env('APP_URL'),
                    'description' => null,
                    'variables' => [],
                ],
            ],

            'tags' => [
                ['name' => 'Authentication',  'description' => 'Login, registration, password reset and demo sessions.'],
                ['name' => 'Users',           'description' => 'User accounts, avatars and preferences.'],
                ['name' => 'Activity Log',    'description' => 'Audit trail of user actions.'],
                ['name' => 'Articles',        'description' => 'Article CRUD.'],
                ['name' => 'Contacts',        'description' => 'Contact CRUD.'],
                ['name' => 'Money',           'description' => 'Financial transaction CRUD.'],
                ['name' => 'Colors',          'description' => 'System and per-user color palette management.'],
                ['name' => 'Files',           'description' => 'File upload, listing and extraction.'],
                ['name' => 'Friends',         'description' => 'Friend requests and social connections.'],
                ['name' => 'Share',           'description' => 'Share entity records with other users.'],
                ['name' => 'Page Builder',    'description' => 'Pages, drafts, publishing and version history.'],
                ['name' => 'Questions',       'description' => 'FAQ question CRUD.'],
                ['name' => 'Technologies',    'description' => 'Technology stack CRUD.'],
                ['name' => 'Structural',      'description' => 'Structural view rendering.'],
                ['name' => 'Modules',         'description' => 'Module registry, installation and toggling.'],
                ['name' => 'Entities',        'description' => 'Generic entity view rendering.'],
                ['name' => 'Terminal',        'description' => 'Run Artisan commands via API.'],
                ['name' => 'Contact Form',    'description' => 'Public contact form submission.'],
                ['name' => 'OpenAPI',         'description' => 'OpenAPI specification and documentation.'],
            ],

            'security' => [
                // GoldSpecDigital\ObjectOrientedOAS\Objects\SecurityRequirement::create()->securityScheme('JWT'),
            ],

            // Non standard attributes used by code/doc generation tools can be added here
            'extensions' => [
                // 'x-tagGroups' => [
                //     [
                //         'name' => 'General',
                //         'tags' => [
                //             'user',
                //         ],
                //     ],
                // ],
            ],

            // Route for exposing specification.
            // Leave uri null to disable. nuc_openapi module provides GET /api/openapi.
            'route' => [
                'uri' => null,
                'middleware' => [],
            ],

            // Register custom middlewares for different objects.
            'middlewares' => [
                'paths' => [
                    //
                ],
                'components' => [
                    //
                ],
            ],

        ],

    ],

    // Directories to use for locating OpenAPI object definitions.
    'locations' => [
        'callbacks' => [
            app_path('OpenApi/Callbacks'),
        ],

        'request_bodies' => [
            app_path('OpenApi/RequestBodies'),
        ],

        'responses' => [
            app_path('OpenApi/Responses'),
        ],

        'schemas' => [
            app_path('OpenApi/Schemas'),
        ],

        'security_schemes' => [
            app_path('OpenApi/SecuritySchemes'),
        ],
    ],

];
