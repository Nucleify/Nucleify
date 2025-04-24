<?php

namespace App\Http\Requests\Question;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PostRequest extends FormRequest
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
            'index' => 'required|integer',
            'content' => 'required|string|max:255',
            'answer' => 'required|string|max:1000',
            'category' => 'string|max:255',
            'on_site' => 'bool',
            'display' => 'bool',
        ];
    }
}
