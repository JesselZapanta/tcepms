<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContructorUpdateRequest extends FormRequest
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
            'company_name' => ['required', 'string', 'max:255'],  
            'description' => ['required', 'string'],      
            'contact' => ['required', 'string'],
            'website' => ['nullable', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'status' => ['required', 'integer', Rule::in('1', '0')],
        ];
    }
}
