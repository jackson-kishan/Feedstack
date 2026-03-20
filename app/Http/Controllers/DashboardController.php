<?php

namespace App\Http\Controllers;

use App\Models\Post;
// use App\Models\User;
// use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Board;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class DashboardController extends Controller
{

    public function show( Board $board )
    {
       $uId = Auth::user()->id;
       $userBoards = Board::where('user_id', '=' , $uId)->get();
    //    $boardUser = UserRoles::where('user_id', '=' , $uId)
    //                 ->with('User')
    //                 ->get();
       $posts = Post::where('board_id', '=' , $board->id)
                    ->where('user_id', '=', $uId)
                    ->get();
       $comments = Comment::where('board_id', '=', $board->id)->get();
       $data = [
        'board' => $board,
        'userBoards' => $userBoards,
        // 'boardUser' => $boardUser,
        'posts' => $posts,
        'comments' => $comments
     ];

      return Inertia::render('Dashboard', $data);

    }
}
