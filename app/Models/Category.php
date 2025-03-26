<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'image', 'slug', 'status'];

    public function services()
    {
        return $this->belongsToMany(Service::class);
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class);
    }
}
