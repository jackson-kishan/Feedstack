<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'body',
        'vote',
        'post_status',
        'user_id',
        'board_id',
        'status_id',
        'created_by',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            $slug = Str::slug($post->title);
            $count = Post::whereRaw("slug RLIKE '^{$slug}(-[0-9]+)?$'")->count();

            $post->slug = $count ? "{$slug}-{$count}" : $slug;

            if(auth()->id() && !$post->created_by){
               $post->created_by = auth()->id();
            }
        });

    }

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function boards()
    {
        return $this->belongsTo(Board::class, 'board_id', 'id');
    }

    // public function categories()
    // {
    //    return $this->hasMany(Category::class);
    // }

    public function votes()
    {
       return $this->hasMany( Vote::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function created_by()
    {
        return $this->belongsTo(User::class,  'created_by',  'id');
    }

    public function topics()
    {
        return $this->belongsToMany(Topic::class, 'post_topics');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function scopeWithVote($query)
    {
        if (auth()->check()) {
            $userId = auth()->id();

            $query->addSelect([
                'has_voted' => Vote::selectRaw('count(*)')
                    ->whereColumn('post_id', 'posts.id')
                    ->where('user_id', $userId)
                    ->take(1)
            ]);
        }
    }



}
