@extends('layouts.app')

@section('content')
<div class="container mt-8 xl:mt-6">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <a href="{{ route('admin') }}">Admin Dashboard</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
