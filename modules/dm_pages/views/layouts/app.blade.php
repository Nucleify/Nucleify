<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="my-app-dark">
<head>
    <!-- LaravelMetaTags start -->
    @meta_tags

</head>
<body>
    <main id="app">
        <dm-screen-lights :count="8"></dm-screen-lights>
        <ad-toast></ad-toast>
        @auth
            <ad-dock></ad-dock>
        @endauth

        @yield('content')
    </main>
</body>
</html>
