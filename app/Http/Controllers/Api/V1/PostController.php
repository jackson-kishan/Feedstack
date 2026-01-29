<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostController extends Controller
{

    public function index()
    {
        $data = [
            Post::with('board')->all()
        ];
        return response()->json($data);
    }

    public function store(Request $request)
    {
      $validation = $request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
        'board_id' => 'required|integer',
      ]);
    }
}
