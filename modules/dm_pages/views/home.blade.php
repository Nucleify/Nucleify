@extends('layouts.app')

@section('content')
    <link rel="preload" fetchpriority="high" as="image" href="img/logo.svg" type="image/svg+xml">

    <div id="home">
        <ad-section-navbar></ad-section-navbar>
        <dm-home-page></dm-home-page>
        <dm-screen-loader></dm-screen-loader>
        <ad-section-footer></ad-section-footer>
    </div>
@endsection
