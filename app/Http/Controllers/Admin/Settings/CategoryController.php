<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Models\Board;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board)
    {
        $data = [
            'board' => $board,
            'userBoards' => $board->where('user_id', auth()->user()->id)->get(),
            'categories' => Category::where('board_id', $board->id)->get(),
        ];
        return inertia('Admin/Settings/Categories', $data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Board $board)
    {
       $validator = $request->validate([
           'name' => 'required|string|max:255',
           'color' => 'required|string|max:255',
           'board_id' => 'required|exists:boards,id'
       ]);

       if($validator){
         Category::create([
          'name' => $request->name,
          'color' => $request->color,
          'board_id' => $board->id,
         ]);
       }

       return response()->route('categories.index', ['board' => $board]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id, Board $board)
    {
        $validator = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'board_id' => 'required|exists:boards,id'
        ]);

        if($validator){
            Category::where('id', $id)
                ->where('board_id', $board->id)
                ->update([
                 'name' => $request->name,
                 'color' => $request->color,
                 'board_id' => $board->id,
            ]);
        }

        return response()->redirectToRoute('categories.index', ['board' => $board]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Board $board)
    {
        Category::where('id', $id)
            ->where('board_id', $board->id)
            ->delete();
        return response()->redirectToRoute('categories.index', ['board' => $board]);
    }
}
