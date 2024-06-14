<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => [
                'required',
                'string',
                'min:8',              // Mínimo 8 caracteres
                'regex:/[a-z]/',      // Debe contener al menos una letra minúscula
                'regex:/[A-Z]/',      // Debe contener al menos una letra mayúscula
                'regex:/[0-9]/',      // Debe contener al menos un número
                'regex:/[@$!%*#?&]/', // Debe contener al menos un carácter especial
                'confirmed',          // Debe coincidir con el campo de confirmación
            ],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
