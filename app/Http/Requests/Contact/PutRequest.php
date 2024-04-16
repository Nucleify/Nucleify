<?php

namespace App\Http\Requests\Contact;

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
            'first_name' => 'required|string|min:3|max:30',
            'last_name' => 'nullable|string|min:3|max:30',
            'email' => 'nullable|email|min:3|max:70',
            'personal_phone' => 'nullable|string|min:9|max:9|regex:/^\d{9}/',
            'work_phone' => 'nullable|string|min:9|max:9|regex:/^\d{9}/',
            'address' => 'nullable|string|min:15|max:100',
            'birthday' => 'nullable|date',
            'contact_groups' => 'nullable|json',
            'role' => 'nullable|string|in:user,tech,test_admin,admin,super_admin'
        ];
    }
}
