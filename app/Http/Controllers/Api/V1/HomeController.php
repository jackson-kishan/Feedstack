<?php
namespace App\Http\Controllers\Api\V1;


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
use App\Models\FeatureRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Barryvdh\Debugbar\Facades\Debugbar;

class HomeController extends Controller
{

    public function idea(Request $request, Board $board)
    {
        // logger($request->query('sort'));
        $statusName = $request->query('status');
        $topicName = $request->query('topic');
        $sort = $request->query('sort');
        $sortIdea = $request->query('sortIdea');
        Debugbar::info($request);

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
        ];

        // return response()->json($data);
        return Inertia("Guest/Index", $data);

    }

    public function store(Request $request, Board $board)
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
             'post_status' => 'private',
             'board_id' => $board->id,
             'status_id' => Null,
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
         return back();

    }

    public function show(Board $board, Post $post)
    {
        $posts = Post::where('slug', $post->slug)
                      ->with(['created_by', 'boards', 'topics', 'status'])
                      ->withVote()->firstOrFail();

        $posts->body = Formatting::transformBody($post->body);
        $postList =  Post::where('board_id', $board->id)
        ->with(['created_by', 'status', 'boards', 'user', 'votes', 'topics']) ->get();

        $data = [
            'post' => $posts,
            'posts' => $postList,
            'board' => $board,
            'votes' => Vote::select('id', 'user_id')->onPost($posts)->with('user')->take(10)->get(),
            'comments' => $posts->comments()->with(['user', 'parent'])->get(),
            'topics' => Topic::where('board_id', $board->id)->get(),
            'statuses' => status::where('board_id', $board->id)->get(),
            'postTopics' => PostTopic::where('post_id', $post->id)
                                ->with('topic')
                                ->get(),
        ];


        return inertia("Guest/ShowIdea", $data);
    }

    public function vote(Board $board,Post $post)
    {
        $vote = $post->votes()->where('user_id', auth()->user()->id)->first();
        $hasVoted = false;

        if($vote) {
            $vote->delete();
        } else {
            $post->votes()->create([
              'board_id' => $post->board_id,
              'post_id' => $post->id,
              'user_id' => auth()->user()->id,
              'created_by' => auth()->user()->id,
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
         return redirect()->back()->with('error', 'You are already voted.');
       }

       $post->votes()->create([
          'user_id' => $request->get('user_id'),
          'board_id' => $board->id,
          'created_by' => $request->get('user_id'),
       ]);

       return redirect()->back()->with('success', '');
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
         ];

         return inertia("Guest/Roadmap", $data);


    }

    public function myContent(Board $board)
    {
        $data = [

        ];

        return;
    }



}
