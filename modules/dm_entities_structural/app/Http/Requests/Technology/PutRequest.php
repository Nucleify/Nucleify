<?php

namespace App\Http\Requests\Technology;

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
            'label' => 'required|string|max:50',
            'description' => 'string|min:3|max:255',
            'href' => 'required|string',
            'src' => 'required|string',
            'category' => 'string',
            'display' => 'required|bool',
        ];
    }
}
