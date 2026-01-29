<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Models\Board;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class CommentApproveController extends Controller
{


    public function approvedComment(Board $board, Comment $comment, Request $request)
    {
       $query = $request->query('comment');

       DB::table('comments')
           ->where('comment_approval', '=' , $query)
           ->update(['comment_approval' => 'approved']);

           return back();
    }

    public function approve(Board $board, Comment $comment, Request $request)
    {

        $query = $request->query('comment');

        DB::table('comments')
            ->where('comment_approval', '=' , $query)
            ->update(['comment_approval' => 'reject']);

            return back();
    }
}
