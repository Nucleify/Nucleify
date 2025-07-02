<?php

namespace App\Http\Requests\Task;

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
            'user_id' => 'required|integer',
            'assignee_id' => 'required|integer',
            'collaborator_ids' => 'required|array',
            'collaborator_ids.*' => 'integer',
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'start_date' => 'required|string|date_format:Y-m-d',
            'end_date' => 'required|string|date_format:Y-m-d|after_or_equal:start_date',
        ];
    }
}
