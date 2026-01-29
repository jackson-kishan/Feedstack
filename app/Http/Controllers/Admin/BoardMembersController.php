<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Board;
use App\Models\UserRoles;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class BoardMembersController extends Controller
{

    public function index(Board $board)
    {
        $authUser = Auth::user();
        $userBoards = Board::where('user_id', '=' , $authUser->id)->get();

        $boardMembers = UserRoles::where('board_id', '=', $board->id)
                                  ->get();
        $userRole = UserRoles::with(['User', "Board", "Role"])
                              ->where("board_id", "=", $board->id)
                              ->get();

        $data = [
         'board' => $board,
         'userBoards' => $userBoards,
         'boardMembers' => $boardMembers,
         'userRoles' => $userRole,
        ];

        // return response()->json($data);
        // dd($data);
       return Inertia::render("Admin/Settings/Members", $data);
    }
}
