<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Board;
use App\Models\Post;
use App\Models\PostTopic;
use App\Models\UserRoles;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ContentController extends Controller
{

    public function index(Board $board ,Post $post)
    {
      $auth = Auth::user()->id;
      $posts = $post->with('created_by')
                    ->where("user_id", '=', $auth)
                    ->where("board_id", "=", $board->id)
                    ->get();
      $data = [
        "board" => $board,
        'userBoards' => $board->where('user_id', auth()->user()->id)->get(),
        "posts" => $posts,
        'postTopics' => PostTopic::where('post_id', $post->id)
                                ->with('topic')
                                ->get(),
      ];

      return inertia("Admin/Settings/MyContent", $data);
    }

    public function store(Board $board, Post $post)
    {
    
    }

    public function update(Board $board, Post $post)
    {

    }

    public function destroy(Board $board, Post $post)
    {

    }
}
