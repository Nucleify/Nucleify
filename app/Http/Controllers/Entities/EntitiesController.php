<?php

namespace App\Http\Controllers\Entities;

use App\Http\Controllers\Controller;
use Illuminate\Contracts\Support\Renderable;

class EntitiesController extends Controller
{
    /**
     * Render the view for the specified entity.
     *
     * @param string $entity
     * @return Renderable
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