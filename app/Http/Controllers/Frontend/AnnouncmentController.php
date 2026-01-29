<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Board;
use App\Models\Announcment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AnnouncmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Board $board)
    {
        $data = [
            "board"=> $board,
            'userBoards' => $board->where('user_id', auth()->user()->id)->get(),
            "announcement" => Announcment::where("board_id", $board->id)->get(),
        ];
        return inertia("Admin/Annoucement/HomeAnnouncement", $data);
        // return response()->json($data, 200);
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
    public function store(Board $board, Request $request)
    {
       $validate = $request->validate([
          'title' => 'required|string',
          'description'=> 'required|string',
          'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
          'board_id' => 'required|exists:boards,id'
       ]);

       if($validate){

        $data = [
            'title'=> $request->title,
            'description'=> $request->description,
            'board_id' => $board->id,
        ];

        $uploadPath = public_path('annoucement');
        if(!file_exists($uploadPath)){
        mkdir($uploadPath, 0755, true);
        }
        if($request->hasFile('image')){
        $imageName = time() . '.' . $request->image()->extension();
        $data['image'] = $request->file('image')->move($uploadPath, $imageName);
        }
      $announcment =  Announcment::create($data);

       }

       return response()->json([
         'message' => 'success',
         'data' => $announcment,
       ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Announcment $announcment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Announcment $announcment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Board $board, Request $request, Announcment $announcment)
    {
        $validate = $request->validate([
            'title' => 'required|string',
            'description'=> 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'board_id' => 'required|exists:boards,id'
         ]);

         if($validate){

          $data = [
              'title'=> $request->title,
              'description'=> $request->description,
          ];

          $uploadPath = public_path('annoucement');
          if(!file_exists($uploadPath)){
          mkdir($uploadPath, 0755, true);
          }
          if($request->hasFile('image')){
          $imageName = time() . '.' . $request->image()->extension();
          $data['image'] = $request->file('image')->move($uploadPath, $imageName);
          }
        $announcment =  Announcment::update($data);

         }

         return response()->json([
           'message' => 'success',
           'data' => $announcment,
         ], 201);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board, Announcment $announcment)
    {
        if($board) {
            Announcment::destroy($announcment->id);
        }
    }
}
