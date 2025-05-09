<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required','string','lowercase','email','max:255','unique:users,email'],
            'contact' => ['required', 'string', 'regex:/^\d{10}$/'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', 'integer', Rule::in('0', '1', '2','3','4')],
            'status' => ['required', 'integer', Rule::in('1', '0')],
        ];
    }
}
