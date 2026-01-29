<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use App\Models\Board;
use App\Models\Topic;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, Board $board)
    {
        $posts = Post::where('board_id', $board->id)
                      ->with('topics')
                      ->get();

       $query = Post::query();

       if($request->has('topic')){
            $query->whereHas('topics', function($q) use ($request) {
            $q->where('name', $request->topic);
            });
       }


       $topics = Topic::where('board_id', $board->id)->get();

         $data = [
            'boards' => $board,
            'posts' => $posts,
            'topics' => $topics
         ];

         dd($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Board $board)
    {
       return inertia();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Board $board)
    {
        $topics = $request->input('topics');
        $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id',
            'board_id' => 'required|exists:boards,id',
            'status_id' => 'required|exists:statuses,id',
        ]);

        $post = Post::create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'body' => $request->body,
            'post_status' => 'public',
            'user_id' => auth()->user()->id,
            'board_id' => $board->id,
            'status_id' => $request->status_id,
            'category_id' => $request->category_id,
            'by' => auth()->user()->id,
        ]);

        foreach($topics as $topicId){
            DB::table('post_topics')->updateOrInsert([
               'post_id' => $post->id,
               'topic_id' => $topicId
            ]);
        }

        // if($request->has('topics')){
        //     $post->topics()->sync($request->topics);
        // }

        return redirect()->back()->with('message', 'success');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post, Board $board)
    {
        $data = [
          'boards' => $board,
          'posts' => $post
        ];
        dd($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post, Board $board)
    {

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
            'user_id' => auth()->user()->id,
            'board_id' => $board->id,
            'status_id' => $request->status_id,
            'category_id' => $request->category_id,
            'by' => auth()->user()->id,
        ]);

        if($request->has('topics')){
            $post->topics()->sync($request->topics);
        }

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post, Board $board)
    {
        $post->delete();

        return redirect()->back();
    }
}
