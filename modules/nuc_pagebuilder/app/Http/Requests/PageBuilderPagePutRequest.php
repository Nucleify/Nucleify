<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PageBuilderPagePutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return Auth::check();
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:160',
            'slug' => 'required|string|max:180',
            'status' => 'nullable|in:draft,published,archived',
            'meta_json' => 'nullable|array',
        ];
    }
}
