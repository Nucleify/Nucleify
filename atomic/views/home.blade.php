@extends('layouts.app')

@section('content')
    <link rel="preload" fetchpriority="high" as="image" href="charts.svg" type="image/svg+xml">

    <div id="home">
        <ad-home-page></ad-home-page>
        <ad-screen-loader></ad-screen-loader>
    </div>
@endsection
