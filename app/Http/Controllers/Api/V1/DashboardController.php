<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Board;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index(Board $board)
    {
        $data = [
         'board' => $board,
        ];
        return Inertia::render("Guest/Dashboard", $data);
    }
}
