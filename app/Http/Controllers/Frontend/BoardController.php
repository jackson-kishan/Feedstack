<?php

namespace App\Http\Controllers\Frontend;

use App\Models\Post;
use App\Models\UserRoles;
use App\Models\Vote;
use App\Models\Board;
use App\Models\Topic;
use App\Models\Status;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Board $board)
    {
        $data = [
            'board' => $board->where('user_id', auth()->user()->id)->get(),
        ];
        return Inertia ("Tenant/CreateTenant", $data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Board $board)
    {
        $request->validate([
            'name' => 'required|string|max: 255',
         ]);

         $user = Auth::user();

         $board = Board::create([
           'name' => $request->name,
           'slug' => Str::slug(title: $request->name),
           'user_id' => auth()->user()->id,
           'privacy' => 'public',
         ]);
         $uId = auth()->user()->id;

         $topics = [
            ['name' => 'Welcome', 'user_id' => $uId, 'board_id' => $board->id],
            ['name' => 'Feature request', 'user_id' => $uId, 'board_id' => $board->id],
            ['name' => 'Bug', 'user_id' => $uId, 'board_id' => $board->id],
            ['name' => 'Integration', 'user_id' => $uId, 'board_id' => $board->id],
          ];
          $statuses = [
            ['name' => 'Under Review', 'color' => '#85b5b5', 'user_id' => $uId, 'board_id' => $board->id, 'in_roadmap' => true],
            ['name' => 'Planned', 'color' => '#1fa0ff','user_id' => $uId, 'board_id' => $board->id, 'in_roadmap' => true],
            ['name' => 'In Progress', 'color' => '#c17aff','user_id' => $uId, 'board_id' => $board->id, 'in_roadmap' => true],
            ['name' => 'Complete', 'color' => '#6cd345','user_id' => $uId, 'board_id' => $board->id, 'in_roadmap' => true],
            ['name' => 'Closed', 'color' => '#ed2b2b','user_id' => $uId, 'board_id' => $board->id, 'in_roadmap' => false],
        ];

         if($board){

            $user->assignRole("Admin");
            $role = Role::where('name', "Admin")->first();

            UserRoles::create([
              'user_id' => $uId,
              'role_id' => $role->id,
              'board_id' => $board->id,
            ]);

            foreach($topics as $topic){
                Topic::create($topic);
               }

            foreach($statuses as $status){
                Status::create($status);
            }

         }
         return redirect()->back()->with('success', 'Board created successfully');

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Board $board)
    {
        $orderBy = 'vote';
        $sortFields = [
            'latest' => 'created_at',
            'oldest' => 'created_at',
            'voted' => 'vote',
            'commented' => 'comments',
        ];

        $postsQuery = Post::where('board_id', $board->id);

        // If the user is logged in, add the subquery to check for votes
        if(Auth::check()){
            $userId = Auth::id();

            $postsQuery->addSelect([
               'has_voted' => Vote::selectRaw('count(*)')
                                   ->whereColumn('post_id', 'post.id')
                                   ->where('user_id', $userId)
                                   ->take(1)
            ]);
        }

        if($request->has('sort') && in_array($request->sort, array_keys($sortFields))){
           $orderBy = $sortFields[$request->sort];
        }

        $postsQuery->orderBy($orderBy, $request->sort === 'oldest' ? 'asc' : 'desc');
        $posts = $postsQuery->get();

        $data = [
           'board' => $board,
           'posts' => $posts,
        ];

        // return inertia();
        return response()->json($data);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Board $board)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Board $board)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $board->update([
          'name' => $request->input('name'),
          'slug' => Str::slug($request->input('name')),
        ]);

        return redirect()->back()->with('success', 'Board updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Board $board)
    {
      if($board){
        Board::destroy($board->id);
      }
    }
}
