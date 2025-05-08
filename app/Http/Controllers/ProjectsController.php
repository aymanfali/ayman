<?php
namespace App\Http\Controllers;

use App\Http\Controllers\controller;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectsController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('/welcome', [
            'projects' => Project::all()
        ]);
    }

    // public function show(Project $project): Response
    // {
    //     return Inertia::render('dashboard/projects/show', [
    //         'project' => $project
    //     ]);
    // }
}
