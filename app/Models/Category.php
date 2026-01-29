<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
       'name',
       'color',
       'board_id',
    ];

    public function board(){
        return $this->belongsTo(Board::class);
    }
}
