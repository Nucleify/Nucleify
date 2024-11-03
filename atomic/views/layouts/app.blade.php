<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'DataManager') }}</title>
    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon">

    <!-- Scripts -->
    @vite(['atomic/app.ts'])
</head>
<body>
    <main id="app">
        <ad-toast></ad-toast>
        @auth
            <ad-dock></ad-dock>
        @endauth

        @yield('content')
    </main>
</body>
</html>
