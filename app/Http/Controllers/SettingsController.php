<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;

class SettingsController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return Renderable
     */
    public function render(): Renderable
    {
        return view('settings');
    }
}
