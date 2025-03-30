<?php

namespace App\Http\Requests\Feature;

use Illuminate\Contracts\Validation\ValidationRule;
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
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'icon' => 'required|string|max:32',
            'header' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'category' => 'required|string|max:255',
        ];
    }
}
