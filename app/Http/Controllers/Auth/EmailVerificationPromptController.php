<?php

namespace App\Http\Controllers\Auth;

use Inertia\Inertia;
use App\Models\Board;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;

class EmailVerificationPromptController extends Controller
{
    /**
     * Display the email verification prompt.
     */
    public function __invoke(Request $request): RedirectResponse|Response
    {
        logger("EmailVerificationPromptController");
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('user.dashboard', absolute: false))
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
