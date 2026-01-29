<?php

// return [
//     'ssr' => [
//         'enabled' => env('INERTIA_SSR_ENABLED', true),
//         'url' => env('INERTIA_SSR_URL'),
//         'bundle' => base_path('resources/js/ssr.ts'), // Ensure this path is correct
//     ],
// ];
return [
    'ssr' => [
        'enabled' => true,
        'url' => env('INERTIA_SSR_URL', 'http://127.0.0.1:13714'),
    ],
];
