<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;

class DashboardController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function render(): Renderable
    {
        return view('dashboard');
    }
}
