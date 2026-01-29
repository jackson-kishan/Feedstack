<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Models\Post;
use App\Models\Board;
use App\Models\PostTopic;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class IdeaApproveController extends Controller
{

    // public function approveIdea(Board $board, Post $post, Request $request)
    // {

    //     logger($request);
    //     // logger("Post approved Id: ", [$post->id]);
    //     // $post->where('post_approval', '=', ['pendding', 'reject'])
    //     //     ->update([
    //     //         'post_approval' => 'approved'
    //     //     ]);

    //         $p = $post->findOrFail($post->id);
    //         if (in_array($post->post_approval, ['pendding', 'reject'])) {
    //             $p->update([
    //                 'post_approval' => 'approved'
    //             ]);
    //         }



    //     // return response()->json([
    //     //     "message" => "successfully approved",
    //     // ],204);

    // }

    public function approveIdea(Board $board, Post $post)
{
    if (in_array($post->post_approval, ['pendding', 'reject'])) {
        $post->update([
            'post_approval' => 'approved'
        ]);
    }

    return response()->json([
        "message" => "successfully approved",
    ], 200);
}

    public function rejectIdea(Post $post, Board $board )
    {
        // $posts = Post::where('post_approval', '=',  'approved')
        // ->update([
        //     'post_approval' => 'reject'
        // ]);
        // $post->getChanges();
        if (in_array($post->post_approval, ['pendding', 'approved'])) {
            $post->update([
                'post_approval' => 'reject'
            ]);
        }

        return response()->json([
            "message" => "successfully rejected",
        ],204);
    }

}
