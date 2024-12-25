<?php

namespace App\Http\Requests\Engineer;

use Illuminate\Foundation\Http\FormRequest;

class EngineerProjectUpdateRequest extends FormRequest
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
            'description' => ['required', 'string'],
            'excavation_progress' => ['required', 'numeric', 'min:0', 'max:100'],
            'concrete_works_progress' => ['required', 'numeric', 'min:0', 'max:100'],
            'water_works_progress' => ['required', 'numeric', 'min:0', 'max:100'],
            'metal_works_progress' => ['required', 'numeric', 'min:0', 'max:100'],
            'cement_plaster_and_finishes_progress' => ['required', 'numeric', 'min:0', 'max:100'],

            'project_images' => 'nullable|array',
        ];
    }
}
