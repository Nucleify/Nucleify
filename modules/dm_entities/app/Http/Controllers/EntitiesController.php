<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;

class EntitiesController extends Controller
{
    /**
     * Render the view for the specified entity.
     */
    public function renderEntity(string $entity): Renderable
    {
        $viewName = 'entities.' . $entity;

        if (!view()->exists($viewName)) {
            abort(404, 'View not found.');
        }

        return view($viewName);
    }
}
