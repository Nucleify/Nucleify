<?php

namespace App\Http\Requests\Card;

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
            'src' => 'required|string|max:255',
            'title' => 'required|string|max:100',
            'description' => 'required|string|max:1000',
            'category' => 'string|max:255',
            'component' => 'required|string|max:100',
            'display' => 'bool',
        ];
    }
}
