<?php

namespace App\Http\Requests\Money;

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
            'user_id' => 'integer',
            'sender' => 'required|string',
            'receiver' => 'required|string',
            'count' => 'required|integer',
            'title' => 'required|string|min:3|max:30',
            'description' => 'nullable|string|min:3|max:255',
            'category' => 'nullable|string|max:15',
        ];
    }
}
