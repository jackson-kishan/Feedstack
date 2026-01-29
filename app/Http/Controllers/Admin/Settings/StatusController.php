<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Models\Board;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board)
    {
        $data = [
            'board' => $board,
            'userBoards' => $board->where('user_id', auth()->user()->id)->get(),
            'statuses' => Status::where('board_id', $board->id)
                                ->with(['user', 'board'])
                                ->get(),
        ];
        return inertia('Admin/Settings/Statuses', $data);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Board $board ,Request $request)
    {
        $validator = $request->validate([
           'name' => 'required|string|max:255',
        ]);

        if($validator) {
           $status = Status::create([
              'name' => $request->input('name'),
              'color' => $request->input('color'),
              'user_id' => auth()->user()->id,
              'board_id' => $board->id,
            ]);
        }

        // return response()->json([
        //     'message' => "Successful",
        //     'status' => $status,
        // ]);
        return back();

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
    public function edit(Board $board, Status $status)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Board $board, Status $status)
    {
         $request->validate([
           'name' => 'required|string|max:255',
        ]);

            $status->update([
              "name" => $request->input('name'),
            ]);

        return redirect()->back()->with('success', 'Board updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board, Status $status)
    {

         $status->delete();

        return redirect()->back()->with('success', 'Board deleted successfully');
    }
}
