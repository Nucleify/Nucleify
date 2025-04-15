<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;

use App\Http\Controllers\Controller;


class PagesController extends Controller
{
    /**
     * Render the view for the specified viewName.
     *
     * @param string $viewName
     * 
     * @return Renderable
     */
    public function renderPage(string $viewName): Renderable
    {
        if (!view()->exists($viewName)) {
            abort(404, 'View not found.');
        }

        return view($viewName);
    }
}
