<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'image',
        'url',
        'user_id',
        'privacy',
    ];


    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function users()
    {
        $this->belongsToMany(User::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}
