<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Board;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{

    public function index(Board $board)
    {
        $authUser = Auth::user();
        $userBoards = Board::where('user_id', '=' , $authUser->id)->get();
        $data = [
            "board"=> $board,
            "userBoards" => $userBoards,
        ];

        return inertia("Admin/Notification/HomeNotification", $data);
    }
}
