@extends('layouts.app')

@section('content')
    <div>
        @if (Auth::user()->isAdmin())
            <user-dashboard></user-dashboard>
        @endif
        <contact-dashboard></contact-dashboard>
    </div>
@endsection
