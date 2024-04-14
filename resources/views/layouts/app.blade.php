<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'DataManager') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.ts'])
</head>
<body>
    <div id="app" class="flex flex-column">
        @auth
            <my-layout></my-layout>

            <main>
                @yield('content')
            </main>
        @endauth


        @guest
            @yield('content')
        @endguest

        <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none hidden">
            @csrf
        </form>
    </div>
</body>
</html>
