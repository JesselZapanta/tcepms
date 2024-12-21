<?php

namespace App\Http\Requests\StaffOne;

use Illuminate\Foundation\Http\FormRequest;

class ExcavationUpdateRequest extends FormRequest
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
            'quantity' => ['required', 'numeric', 'min:0'],
            'no_of_days' => ['required', 'numeric', 'min:0'],
            'rate' => ['required', 'numeric', 'min:0'],
            'cost' => ['required', 'numeric', 'min:0'],
        ];
    }
}
