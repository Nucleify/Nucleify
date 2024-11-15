<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;

class AboutController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function render(): Renderable
    {
        return view('about');
    }
}
