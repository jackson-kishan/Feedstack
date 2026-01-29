<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Models\Board;
use App\Models\Topic;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board)
    {
       $data = [
            'board' => $board,
            'userBoards' => $board->where('user_id', auth()->user()->id)->get(),
            'topics' => Topic::where('board_id', $board->id)->get(),
       ];
       return inertia( 'Admin/Settings/Topics', $data);
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
        $validator = $request->validate([
        'name' => 'required|string|max:255',
        ]);

       if($validator) {
       Topic::create([
         'name' => $request->name,
         'board_id' => $board->id,
         'user_id' => auth()->user()->id,
       ]);
    }

    return back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic, Board $board)
    {
        $data = [
            'board' => $board,
            'userBoards' => $board->where('user_id', auth()->user()->id)->get(),
            'topics' => Topic::where('board_id', $board->id)->get(),
       ];

       return response()->json($data);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Topic $topic, Board $board)
    {

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Board $board, Topic $topic)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

            $topic->update([
                'name' => $request->name,
            ]);


        return back()->with('success', 'Successfully updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board, Topic $topic)
    {

            $topic->delete();

        return redirect()->back()->with('success','Successfully deleted');

    }
}
