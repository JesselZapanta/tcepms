<?php

namespace App\Http\Requests\Engineer;

use Illuminate\Foundation\Http\FormRequest;

class EngineerProjectStoreRequest extends FormRequest
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
            'project' => ['required','exists:projects,id'],
            'name' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'excavation_progress' => ['required', 'numeric', 'min:0', 'max:100'],
            'concrete_works_progress' => ['required', 'numeric', 'min:0', 'max:100'],
            'water_works_progress' => ['required', 'numeric', 'min:0', 'max:100'],
            'metal_works_progress' => ['required', 'numeric', 'min:0', 'max:100'],
            'cement_plaster_and_finishes_progress' => ['required', 'numeric', 'min:0', 'max:100'],

            'project_images' => 'required|array|min:1', // Ensure it's an array and at least one image is provided
            'project_images.*.response' => 'required|string|max:255', 
        ];
    }
}
