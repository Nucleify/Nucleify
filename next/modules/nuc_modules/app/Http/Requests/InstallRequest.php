<?php

namespace App\Http\Requests;

class InstallRequest extends AdminRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'file' => 'required|file|mimes:zip|max:2048',
        ];
    }
}
