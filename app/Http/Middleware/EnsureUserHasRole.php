<?php

namespace App\Http\Middleware;

use App\Models\Board;
use App\Models\UserRoles;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {


        if(!Auth::check()) {
            return redirect()->route('login');
        }

        $authUser = Auth::id();
        $exsitingBoard = Board::where('user_id', $authUser)->get();

        // $boardMember = UserRoles::where('user_id' ,$authUser)
        //                          ->where('board_id',$exsitingBoard->id)
        //                          ->whereIn('role_id',[2, 3])
        //                          ->first();

        // if(!$boardMember) {
        //     return redirect()->route('home');
        // }

        return $next($request);
    }
}
