<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Post;
use App\Models\Vote;
use App\Models\Board;
use App\Models\Topic;
use App\Models\Status;
use App\Models\Comment;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class RoadmapController extends Controller
{

    public function index()
    {
        $data = [
            'posts' => Post::with('board')->get(),
            'comments' => Comment::get(),
            'likes' => Vote::with('post')->get(),
            // 'topics' => Topic::with(['board', 'posts'])->get(),

        ];

        return response()->json($data);


    }

    public function store(Request $request)
    {

    }

    public function update(Request $request, Post $post)
    {
        $authUser = Auth::user()->id;
        $boardId = session()->get('boardId');


        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:255',
            'post_status' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'board_id' => 'required|exists:boards,id',
            'status_id' => 'required|exists:statuses,id',
        ]);

        $post->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'body' => $request->body,
            'post_status' => 'public',
            'user_id' => $authUser,
            'board_id' => $boardId,
            'status_id' => $request->status_id,
            'category_id' => $request->category_id,
            'by' => $authUser,
        ]);
    }

    public function UpdateStatus(Request $request, Post $post, Status $status)
    {
        $validator = $request->validate([

        ]);


    }
}
