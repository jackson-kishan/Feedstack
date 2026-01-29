<?php

namespace App\Http\Middleware;

use App\Models\UserRoles;
use Closure;
use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HasBoardAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        //Redirect if not logged in
        if(!$user){
            return redirect()->route("home");
        }
       // Get the board from route slug
        $board = $request->route("board");
       //if you are using slug instead of Ids
        if(!$board instanceof Board)
        {
         $board = Board::where("slug", $board)->firstOrFail();
        }

        if(!$board) {
            return abort(404);
        }

        //Fetch user role for the board
        $userRole  = UserRoles::withWhereHas("Role", function($query) {
            $query->where("name", ["Admin", "Contributor"]);
        })->get();

        // if(!$userRole){
        //     //User has no role in this board
        //     //If they're an Admin elsewhere, show 404 (as per your request)
        //     if($user->roles()->where('name', ["Admin", "Contributior"])->exists()){
        //         return abort(404);
        //     }
        //     return redirect()->route("home");
        // }

        //Allow only Admin or Contributor roles
        // $allowedRoles = ["Admin", "Contributior"];
        if($userRole) {
            return $next($request);
        }

      return redirect()->route("home");
        // return $next($request);
    }
}
