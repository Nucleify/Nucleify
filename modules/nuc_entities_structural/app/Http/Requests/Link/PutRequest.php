<?php

namespace App\Http\Requests\Link;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'download' => 'nullable|string',
            'href' => 'required|string|url',
            'src' => 'nullable|string|url',
            'icon' => 'nullable|string|max:255',
            'category' => 'required|string|max:255',
            'hreflang' => 'nullable|string|max:255',
            'media' => 'nullable|string|max:255',
            'ping' => 'nullable|string',
            'referrerpolicy' => 'nullable|string|max:255|' .
                'in:no-referrer,no-referrer-when-downgrade,origin,origin-when-cross-origin,' .
                'same-origin,strict-origin-when-cross-origin,unsafe-url',
            'rel' => 'nullable|string|max:255|in:alternate,author,bookmark,external,help,' .
                'license,next,nofollow,noreferrer,noopener,prev,search,tag',
            'target' => 'nullable|string|max:255|in:_blank,_parent,_self,_top',
            'type' => 'nullable|string|max:255',
        ];
    }
}
