<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['user_id', 'contents', 'tags', 'claps'];
    protected $table = "posts_spa_l";

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
