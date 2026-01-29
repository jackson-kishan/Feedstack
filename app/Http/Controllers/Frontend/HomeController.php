<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Post;
use App\Models\Vote;
use Inertia\Inertia;
use App\Models\Board;
use App\Models\Topic;
use App\Models\Status;
use App\Models\PostTopic;
use App\Helpers\Formatting;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Barryvdh\Debugbar\Facades\Debugbar;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home' );
    }

    public function idea(Request $request, Board $board, Post $post)
    {

        $statusName = $request->query('status');
        $topicName = $request->query('topic');
        $sort = $request->query('sort');
        $sortIdea = $request->query('sortIdea');
        // logger($sort);
        // logger($statusName);
        logger($request);

        $postQuery =  Post::where('board_id', $board->id)
        ->with(['created_by', 'status', 'boards', 'user', 'votes', 'topics']);

        if($statusName){
            $postQuery->whereHas('status', function($query) use ($statusName){
                $query->where('name', $statusName);
            });
        }
        if($topicName){
            $postQuery->whereHas('topics', function ($query) use ($topicName){
              $query->where('name', $topicName);
            });
        }
        if($sort){
            $sortPost = $request->has('sort') && in_array($request->sort, ['latest', 'oldest']) ? $request->sort : 'latest';
            $orderBy = ($sortPost === 'latest') ? 'desc' : 'asc';
            $postQuery->orderBy('created_at', $orderBy);
        }
        if($sortIdea == 'new'){
            $postQuery->where('post_approval',  '=', 'pendding');
        } elseif($sortIdea == 'approved'){
            $postQuery->where('post_approval',  '=', 'approved');
        }
        elseif($sortIdea == 'rejected'){
            $postQuery->where('post_approval',  '=', 'reject');
        }

        $data = [
            'board' => $board,
            'posts' => $postQuery->get(),
            'statuses' => Status::where('board_id', $board->id)->get(),
            'topics' => Topic::where('board_id', $board->id)->get(),
            'userBoards' => $board->where('user_id', auth()->user()->id)
                            ->get(),
        ];


        //   dd($data);
        return Inertia::render("Frontends/Partials/HomeIdea", $data);
    }

    public function store(Board $board, Request $request)
    {
       $topics = $request->input('topics');
       $authUser = Auth::id();
        $rules =[
            'title' => 'required|string|max:255',
            'body' => 'required|string|max:255',
        ];


        $request->validate($rules);

        $args = [
            'title' => strip_tags($request->title),
            'slug' => Str::slug($request->title),
            'body' => strip_tags($request->body),
            'post_status' => 'public',
            'board_id' => $board->id,
            'status_id' => $request->status_id,
            'user_id' => $authUser,
            'created_by' => $authUser,
            'by' => $authUser,
        ];


        $post = Post::create($args);

        foreach($topics as $topic){
            PostTopic::create([
             'post_id' => $post->id,
             'topic_id' => $topic,
            ]);
        }

        return back()->with(['Success' => "Your Idea submit! Wait for Admin Approval"]);
    }

    public function vote(Board $board,Post $post)
    {
        $authId = Auth::user()->id;
        $vote = $post->votes()->where('user_id', $authId)->first();
        $hasVoted = false;

        if($vote) {
            $vote->delete();
        } else {
            $post->votes()->create([
              'board_id' => $post->board_id,
              'post_id' => $post->id,
              'user_id' => $authId,
              'created_by' => $authId,
            ]);
            $hasVoted = true;
        }

        $post = $post->fresh();
        $post->has_voted = $hasVoted;

        return $post;
    }

    public function addVote(Request $request, Board $board, Post $post)
    {
        $request->validate([
          'user_id' => 'required|exists:users,id',
        ]);

        if($post->votes()->where('user_id', $request->get('user_id'))->exists()){
            return redirect()->back()->with('error', 'User already voted this post.');
        }

        $post->votes()->create([
          'user_id' => $request->get('user_id'),
          'board_id' => $board->id,
          'created_by' => $request->get('user_id'),
        ]);

        return redirect()->back()->with('sucess', 'Vote added successfully');
    }

    public function show(Board $board, Post $post)
    {
        $posts = Post::where('slug', $post->slug)->with(['created_by', 'boards', 'topics', 'status'])->withVote()->firstOrFail();

        $posts->body = Formatting::transformBody($post->body);

        $data = [
            'post' => $posts,
            'board' => $board,
            'votes' => Vote::select('id', 'user_id')->onPost($posts)->with('user')->take(10)->get(),
            'comments' => $posts->comments()->with(['user', 'parent'])->get(),
            'topics' => Topic::where('board_id', $board->id)->get(),
            'statuses' => Status::where('board_id', $board->id)->get(),
            'postTopics' => PostTopic::where('post_id', $post->id)
                                ->with('topic')
                                ->get(),
            'userBoards' => $board->where('user_id', auth()->user()->id)
                          ->get()
        ];

        return Inertia::render("Frontends/Ideas/ShowPost", $data);
    }

    public function roadmap(Board $board)
    {

        $data = [
            'board' => $board,
            'posts' => Post::where('board_id', $board->id)
                       ->with(['created_by', 'status', 'boards', 'user', 'votes', 'topics'])
                       ->get(),
            'statuses' => Status::where('board_id', $board->id)->get(),
            'topics' => Topic::where('board_id', $board->id)->get(),
            'userBoards' => $board->where('user_id', auth()->user()->id)
                    ->get()
         ];

       return Inertia::render("Frontends/Partials/HomeRoadmap", $data);
    // dd($data);
    }

    public function announcement(Board $board)
    {
        return Inertia::render("Frontends/Partials/HomeAnnouncement", ['boards' => $board]);
    }

    public function boardRoadmap()
    {
        return Inertia::render("Frontends/Partials/BoardRoadmap");
    }

    public function settingsGeneral()
    {
        return Inertia::render("Admin/Settings/Dashboard");
    }

    public function createRoom()
    {
        $boards = Board::where('user_id', auth()->user()->id)->get();
        return Inertia::render("Tenant/CreateTenant", ['boards' => $boards]);
    }

}
