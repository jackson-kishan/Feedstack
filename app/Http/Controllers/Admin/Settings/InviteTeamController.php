<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Models\Board;
use App\Models\User;
use App\Models\UserRoles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class InviteTeamController extends Controller
{

    public function index(Board $board)
    {
        $data = [
            'board' => $board,
            'userBoards' => $board
                           ->where('user_id', auth()->user()->id)
                           ->get(),
            'users' => UserRoles::where('board_id', $board->id)
                          ->with('User')
                          ->get(),
            'roles' => Role::get(),
            'permissions' => Permission::get(),
        ];

        // return response()->json($data);
         return inertia('Admin/Settings/InviteTeam', $data);
    }

    public function store(Board $board, Request $request)
    {
       $permissions = (array) $request->input('permission');
       $roleId = $request->input('role');
       $validator = $request->validate([
            'email' => 'required|email',
            'role' => 'required'
           ]);
    $role = Role::findOrFail($roleId);

       $pass = rand(00000000, 99999999);
       if($validator){
        $user = User::create([
         'name' => "Anonymous",
         'email' => $request->input('email'),
         "password" => Hash::make($pass)
        ]);
       $user->assignRole($role->name);
       $role->givePermissionTo($permissions);




       logger($pass);
      UserRoles::create([
        "user_id"=> $user->id,
        "board_id" => $board->id,
        "role_id" => $role->id,
      ]);

       }

       return back()->with("success","Invitation mail send");

    }

}
