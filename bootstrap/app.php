<?php

use App\Http\Middleware\CheckBoardAccess;
use App\Http\Middleware\EnsureUserHasRole;
use App\Http\Middleware\SetBoard;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        apiPrefix: 'api/v1',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,
            'board_user' => EnsureUserHasRole::class,
            'role.redirect' => \App\Http\Middleware\RoleRedirect::class,
            'has.board.access' => \App\Http\Middleware\HasBoardAccess::class,
        ]);


        $middleware->validateCsrfTokens(except: [
            'http://127.0.0.1:8000/login',
            'http://127.0.0.1:8000/admin/kishan/setting/statuses',
            'http://127.0.0.1:8000/b/kishan/idea',
            'http://127.0.0.1:8000/b/{board}/idea/{post',
            "http://localhost:8000/ideas-reject/9",
            "http://localhost:8000/p/9",
            "http://127.0.0.1:8000/admin/bar/annoucement"


        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
