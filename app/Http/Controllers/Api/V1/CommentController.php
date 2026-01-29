<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Board;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{

    public function index(Request $request, Board $board, Post $post)
    {
        $sort = $request->has('sort') && in_array($request->sort, ['latest', 'oldest']) ? $request->sort: 'latest';
        $orderBy = ($sort === 'latest') ? 'desc' : 'asc';

        $comments = $post->comments()->with( ['user',  'status'])->orderBy('created_at', $orderBy)->get();

       //dd($comments);
        //Group comments bt parents_id
        $groupComments = $comments->groupBy('parents_id');

        // Recursive function to build comment tree
        $buildCommentTree = function ($parentId = null) use (&$buildCommentTree, &$groupComments) {
            $result = [];
            if(isset($groupComments[$parentId])) {
                foreach($groupComments[$parentId] as $comment) {
                    $children = $buildCommentTree($comment->id);
                    $comment->body;
                    $comment->children = $children;
                    $result[] = $comment;
                }
            }
             return $result;
        };

        //Build the comment tree
        $commentTree = $buildCommentTree();
         return response()->json($commentTree, 200);
    }

    public function store(Request $request,Board $board, Post $post)
    {
       
        $parentId = intval($request->parent_id);
        $request->validate([
            'body' => 'required',
            'post_id' => 'required|exists:posts,id',
            //parent_id is optional, 0 is the default value, if it's not 0, it must exists i the commets table
            'parent_id' => $parentId === 0 ? 'nullable' : 'exists:comments,id',
        ]);

        $comment = $post->comments()->create([
          'body' => strip_tags($request->body),
          'user_id' => auth()->user()->id,
          'post_id' => $post->id,
          'board_id' => $board->id,
          'parent_id' => $parentId === 0 ? null : $parentId,
        ]);

       /*  $this->notifyUsers($post, $comment); */

        $comment->load('user');
        $comment->children = [];

        return response()->json($comment, 201);

    }

}
