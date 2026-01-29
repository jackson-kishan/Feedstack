<?php

namespace App\Http\Controllers\Admin\Settings;

use Inertia\Inertia;
use App\Models\Board;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GeneralSettingController extends Controller
{

    public function index(Board $board)
    {

        $data = [
          'board' => $board,
          'userBoards' => $board->where('user_id', auth()->user()->id)->get(),
        ];

        return Inertia::render('Admin/Settings/General', $data);
    }

    public function update(Request $request, Board $board)
    {
        $request->validate([
         'name' => 'required|string|max:255',
         'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
         'url' => 'regex:/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/'
      ]);

      $data = [
        'name' => $request->input('name'),
        'url' => $request->filled('url') ? $request->input('url'): null,
      ];

      $uploadPath = public_path('uploads');
      if(!file_exists($uploadPath)){
        mkdir($uploadPath, 0755, true);
      }
      if($request->hasFile('image')){
        $imageName = time() . '.' . $request->image()->extension();
        $data['image'] = $request->file('image')->move($uploadPath, $imageName);
      }

       $board->update($data);

      return back();

    }
}
