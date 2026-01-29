<?php

namespace App\Http\Controllers\Auth;

use App\Models\Board;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Board $board, EmailVerificationRequest $request): RedirectResponse
    {


        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(route('user.dashboard', ['board' => $board], absolute: false).'?verified=1');
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }



        return redirect()->intended(route('idea.index', ['board' => $board], absolute: false).'?verified=1');
        // return redirect()->intended(route()->back().'?verified=1');
    }
}
