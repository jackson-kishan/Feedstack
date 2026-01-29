<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class UserRoles extends Model
{

    protected $fillable = ['user_id', 'role_id', 'board_id'];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Board()
    {
        return $this->belongsTo(Board::class);
    }

    public function Role()
    {
        return $this->belongsTo(Role::class);
    }
}
