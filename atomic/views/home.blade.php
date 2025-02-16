@extends('layouts.app')

@section('content')
    <link rel="preload" fetchpriority="high" as="image" href="img/storyset/charts.svg" type="image/svg+xml">

    <div id="home">
        <ad-section-navbar></ad-section-navbar>
        <ad-home-page></ad-home-page>
        <ad-screen-loader></ad-screen-loader>
        <ad-section-footer></ad-section-footer>
    </div>
@endsection
