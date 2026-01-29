<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $with =['roles', 'permissions'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function boards()
    {
        $this->hasMany(Board::class, 'user');
    }

    public function ownsBoard(Board $board)
    {
        return $this->id === $board->user_id;
    }

    public function userRole()
    {
       return $this->hasMany(UserRoles::class, 'user_id');
    }

    public function getRoleNamesAttribute()
    {
        return $this->getRoleNames();
    }

    public function getPermissionsAttribute()
    {
        return $this->getPermissionsViaRoles()->pluck('name');
    }
}
