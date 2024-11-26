<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <!-- LaravelMetaTags start -->
    @meta_tags

    <!-- Load fonts asynchronously -->
    <link
        href="https://fonts.bunny.net/css?family=Nunito:wght@400;500;600;700;800;900&display=swap"
        rel="stylesheet"
        media="print"
        onload="this.onload=null; this.removeAttribute('media');"
    >

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
