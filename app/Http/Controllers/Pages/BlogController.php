<?php

namespace App\Http\Controllers\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;

class BlogController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function render(): Renderable
    {
        return view('blog');
    }
}
