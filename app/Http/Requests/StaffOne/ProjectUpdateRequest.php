<?php

namespace App\Http\Requests\StaffOne;

use Illuminate\Foundation\Http\FormRequest;

class ProjectUpdateRequest extends FormRequest
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
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date'],
            // 'actual_start_date' => ['nullable', 'date'],
            // 'actual_end_date' => ['nullable', 'date', 'after_or_equal:actual_start_date'],
            'budget' => ['required', 'numeric', 'min:0'],
            'cost' => ['nullable', 'numeric', 'min:0'],
            'source' => ['nullable', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'latitude' => ['nullable', 'string', 'max:255'],
            'longitude' => ['nullable', 'string', 'max:255'],
            'engineer' => ['required','exists:users,id'],
            'contructor' => ['required','exists:contructors,id'],
            'category' => ['required', 'string', 'in:Roadwork,Building,Waterworks'],
            // 'status' => ['required', 'string', 'in:Material,Labor,Ongoing,Completed'],
            'priority' => ['required', 'string', 'in:Low,Medium,High'],
        ];
    }
}
