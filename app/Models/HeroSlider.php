<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Heroslider extends Model
{
    use HasFactory;
    
    protected $fillable = ['title', 'description', 'image', 'slug', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
