<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Traits\LockedDemoUser;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Redirect;

class UsersUpdatedRequest extends FormRequest
{
    use LockedDemoUser;
    /**
     * Determine if the user is authorized to make this request.
     */
  /*   public function authorize(): bool
    {
        return true;
    } */

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50','email',Rule::unique('users')->ignore($this->route('user')->id)],
            'password' =>['nullable'],
            'owner' => ['required','boolean'],
            'photo' => ['nullable','image'],
        ];
    }
}
