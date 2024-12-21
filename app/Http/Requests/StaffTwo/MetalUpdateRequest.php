<?php

namespace App\Http\Requests\StaffTwo;

use Illuminate\Foundation\Http\FormRequest;

class MetalUpdateRequest extends FormRequest
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
            'material' => ['required', 'string', 'max:255'],
            'unit' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'numeric', 'min:0'],
            'unit_cost' => ['required', 'numeric', 'min:0'],
            'cost' => ['required', 'numeric', 'min:0'],
        ];
    }
}
