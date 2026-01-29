<?php

use App\Helpers\HasPermissionAccess;
use App\Http\Controllers\Admin\NotificationController;
use App\Http\Controllers\Frontend\AnnouncmentController;
use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Board;
use App\Models\UserRoles;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\EnsureUserHasRole;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\TestController;
use App\Http\Controllers\Frontend\BoardController;
use App\Http\Controllers\Frontend\CommentController;
use App\Http\Controllers\Frontend\ContentController;
use App\Http\Controllers\Admin\BoardMembersController;
use App\Http\Controllers\Admin\Settings\TopicController;
use App\Http\Controllers\Admin\Settings\StatusController;
use App\Http\Controllers\Admin\Settings\CategoryController;
use App\Http\Controllers\Admin\Settings\InviteTeamController;
use App\Http\Controllers\Admin\Settings\IdeaApproveController;
use App\Http\Controllers\Admin\Settings\CommentApproveController;
use App\Http\Controllers\Admin\Settings\GeneralSettingController;





// Show Frontend View
Route::get('/', [HomeController::class, 'index'])
      ->name('home');
//Idea post
Route::get('/p/{board}/post', [\App\Http\Controllers\Api\V1\HomeController::class, 'idea'])
      ->name('idea.index');
Route::get('/p/{board}/post/{post}', [\App\Http\Controllers\Api\V1\HomeController::class, 'show'])
      ->name('idea.show');

Route::get('/p/{board}/announcement', function(Board $board) {
    return 'Hello announcement' . $board;
  })->name("idea.announcement");



// Show all roadmaps
Route::get('/p/{board}/roadmap', [\App\Http\Controllers\Api\V1\HomeController::class, 'roadmap'])
       ->name('roadmap.index');

// User Dashboard
Route::middleware(['auth', 'verified'])->group( function() {

    Route::get('/u/{board}/dashboard', [\App\Http\Controllers\Api\V1\DashboardController::class, 'index'])
        ->name('user.dashboard');
    Route::get('/u/{board}/my-content', function() {

    });

    //Post Vote
    Route::post('/p/{board}/post/{post}/vote', [\App\Http\Controllers\Api\V1\HomeController::class, 'vote'])
      ->name('post.vote');
    Route::post('/p/{board}/post/{post}/addvote', [\App\Http\Controllers\Api\V1\HomeController::class, 'addVote'])
      ->name('admin.post.vote');

     //User Profile
    Route::get('/{board}/profile', [\App\Http\Controllers\Api\V1\UserProfileController::class, 'edit'])->name('user.profile.edit');
    Route::patch('/{board}/profile', [\App\Http\Controllers\Api\V1\UserProfileController::class, 'update'])->name('user.profile.update');
    Route::delete('/{board}/profile', [\App\Http\Controllers\Api\V1\UserProfileController::class, 'destroy'])->name('user.profile.destroy');


});




// Admin Part
Route::middleware(['auth' ,'verified', 'board_user', 'role.redirect', 'has.board.access'])->group(function () {
    Route::get('/b/{board}/idea', [HomeController::class, 'idea'])
      ->name('frontend.idea');
    Route::get('/b/{board}/idea/{post}', [HomeController::class, 'show'])
        ->name('frontend.idea.show');
    Route::get('/b/{board}/roadmap', [HomeController::class, 'roadmap'])
        ->name('frontend.roadmap');
    Route::get('/b/{board}/idea/{post}/comments', [CommentController::class, 'index'])
        ->name('post.comments.index');
    // Route::get('/b/{board}/announcement', [HomeController::class, 'announcement'])
    //     ->name('frontend.announcement');
    Route::post('/b/{board}/idea', [HomeController::class, 'sortStatus'])
            ->name('frontend.sortstatus');

    //Ideas Approval
    Route::patch('/board/{board}/ideas-approve/{post}', [IdeaApproveController::class, 'approveIdea'])
            ->name('idea.approve');
    Route::put('/ideas-reject/{post}', [IdeaApproveController::class, 'rejectIdea'])
            ->name('idea.reject');

    //Comments Approval
    // Route::get('comments-approve/{comment}' [CommentApproveController::class , 'show'])
    //      ->name('comments.show');
    // Route::post('comments-approve/{comment}' [CommentApproveController::class, 'approve'])
    //      ->name('comments.store');

});


// Board create Resource Route
Route::resource("boards", BoardController::class)
              ->middleware(['auth', 'verified', 'role.redirect']);




Route::middleware(['auth', 'verified', 'board_user', 'role.redirect'])->prefix('admin')->group(function () {
    // Admin Dashboard
    Route::get('/{board}/dashboard', [DashboardController::class, 'show'])->name('dashboard');

    // Team Members
    Route::get('/{board}/members', [BoardMembersController::class, 'index'])->name('members');

    // Ower Content
    Route::get("/{board}/my-content", [ContentController::class, 'index'])->name('my-content');

    // Announcement
    Route::resource('/{board}/annoucement',AnnouncmentController::class);

    //Notification
    Route::get('/{board}/notification', [NotificationController::class,'index'])->name('notification.index');

    // Admin Profile
    Route::get('/{board}/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/{board}/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/{board}/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Settings Group Controller
    Route::prefix('/{board:slug}/setting')->group(function () {
        // Admin Topics
    Route::resource('/topics', TopicController::class);

    // Admin Categories
    Route::resource('/categories', CategoryController::class);

    // General Settings
    Route::get('/general', [GeneralSettingController::class, 'index'])->name('general.index');
    Route::put('/general', [GeneralSettingController::class, 'update'])->name('general.update');

    // Invite Team Member
    Route::get('/invite-team',[InviteTeamController::class, 'index'])
           ->name('invite-team.index');
    Route::post('/invite-team',[InviteTeamController::class, 'store'])
           ->name('invite-team.store');

    // Roadmap Statuses
    Route::resource('/statuses', StatusController::class);

    });

});

Route::middleware(['auth', 'verified'])->group(function() {
    //Post Route
   Route::post('/b/{board}/idea', [HomeController::class, 'store'])
   ->name('frontend.idea.store');
   Route::post('/b/{board}/idea/{post}/vote', [HomeController::class, 'vote'])
   ->name('post.vote');
  Route::post('/b/{board}/idea/{post}/addvote', [HomeController::class, 'addVote'])
  ->name('admin.post.vote');
  Route::post('b/{board}/idea/{post}/comments', [CommentController::class, 'store'])
       ->name('post.comment');
});

Route::fallback( fn() => "404");

//Test
Route::get('/create-roadmap', function() {
   return Inertia::render('Admin/Feedbacks/Show');
});

Route::get('/test-role', function() {
   $role = HasPermissionAccess::isAdmin();
   $per = HasPermissionAccess::hasPermission('create user');

});


//Testing
Route::get('/back', function() {
    // return back();
});

require __DIR__.'/auth.php';
