<?php

use App\Models\Board;
use App\Models\Post;
use App\Models\Status;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\HomeController;
use App\Http\Controllers\Api\V1\CommentController;
use App\Http\Controllers\Api\V1\RoadmapController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Idea post
Route::get('/p/{board}/post', [HomeController::class, 'idea'])
      ->name('idea.index');
Route::post('/p/{board}/post', [HomeController::class, 'store'])
      ->name('idea.post');
Route::get('/p/{board}/post/{post}', [HomeController::class, 'show'])
      ->name('idea.show');

//Post Comments
Route::get('/p/{board}/post/{post}/comments', [CommentController::class, 'index'])
      ->name('post.comments');
Route::post('/p/{board}/post/{post}/comments', [CommentController::class, 'store'])
      ->name('post.comment.store');

//Post Vote
Route::post('/p/{board}/post/{post}/vote', [HomeController::class, 'vote'])
      ->name('post.vote');
Route::post('/p/{board}/post/{post}/addvote', [HomeController::class, 'addVote'])
      ->name('admin.post.vote');

// Show all roadmaps
Route::get('/p/{board}/roadmap', [HomeController::class, 'roadmap'])
       ->name('roadmap.index');

Route::get('/fetch-board', function (){
   $data = [
    'board'=> Board::get(),
    'status' => Status::get(),
    'topics' => Topic::get(),
    'posts' => Post::get(),
];
   return $data;
})->name('fetch.board');

