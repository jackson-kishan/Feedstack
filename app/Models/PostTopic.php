<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostTopic extends Model
{
    protected $fillable = [
        'post_id',
        'topic_id'
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class);
    }
}
