<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleRedirect
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if(!$user) {
            return redirect()->route('login');
        }

        if($user->hasRole("Viewer") && $request->routeIs("boards.create")){
            abort(403, 'You do not have permission to access this page.');
        }
        
        if ($user && $user->hasRole('Viewer')) {
            abort(403, 'Access denied. Viewers are not allowed on this route.');
        }

        return $next($request);
    }
}
