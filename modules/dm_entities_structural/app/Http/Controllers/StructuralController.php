<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;

class StructuralController extends Controller
{
    /**
     * Render the view for the specified structural.
     *
     * @param string $structural
     * @return Renderable
     */
    public function renderStructural(string $structural): Renderable
    {
        $viewName = 'structural.' . $structural;

        if (!view()->exists($viewName)) {
            abort(404, 'View not found.');
        }

        return view($viewName);
    }
}
