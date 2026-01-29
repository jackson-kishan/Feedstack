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
    public function __invoke(Board $board, Request $request): RedirectResponse|Response
    {
        logger("EmailVerificationPromptController", ["board" => $board]);
        return $request->user()->hasVerifiedEmail()
                    ? redirect()->intended(route('user.dashboard', ['board' => $board], absolute: false))
                    : Inertia::render('Auth/VerifyEmail', ['status' => session('status'), 'board' => $board]);
    }
}
