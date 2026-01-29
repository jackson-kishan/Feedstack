<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcment extends Model
{

    protected $fillable = [
        'image',
        'title',
        'description',
        'board_id',
    ];

    public function board()
    {
        return $this->belongsTo(Board::class);
    }
}
