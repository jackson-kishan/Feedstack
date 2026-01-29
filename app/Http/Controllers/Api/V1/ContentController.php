<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Post;
use App\Models\Board;
use App\Models\PostTopic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ContentController extends Controller
{
    public function index(Post $post, Board $board)
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

      return inertia("Guest/MyContent", $data);
    }

}
