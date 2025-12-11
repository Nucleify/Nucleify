<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;

class PagesController extends Controller
{
    /**
     * Render the view for the specified viewName.
     */
    public function renderPage(string $viewName): Renderable
    {
        if (!view()->exists($viewName)) {
            abort(404, 'View not found.');
        }

        return view($viewName);
    }
}
