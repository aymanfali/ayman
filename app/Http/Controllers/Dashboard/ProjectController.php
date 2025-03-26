<?php
namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\controller;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/projects/index', [
            'projects' => Project::all()
        ]);
    }

    public function show(Project $project): Response
    {
        return Inertia::render('dashboard/projects/show', [
            'project' => $project
        ]);
    }

    public function create(): Response
    {
        return Inertia::render(
            'dashboard/projects/create'
        );
    }

    private function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $count = Project::where('slug', 'LIKE', "{$slug}%")->count();

        return $count ? "{$slug}-" . ($count + 1) : $slug;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'github_link' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'files' => 'nullable|array',
            'files.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data['slug'] = $this->generateUniqueSlug($data['name']);

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $data['image'] = Storage::disk('public')->put('projects', $request->file('image'));
        }

        $uploadedFiles = [];
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                if ($file->isValid()) {
                    $uploadedFiles[] = ['files' => $file->store('projects', 'public')];
                }
            }
        }

        // Create project
        $project = $request->user()->projects()->create($data);

        if (!empty($uploadedFiles)) {
            $project->files()->createMany($uploadedFiles);
        }

        return to_route('projects.index')->with('success', 'Project created successfully!');
    }


    public function edit(Project $project)
    {
        // Eager load the faqs relationship
        $project = Project::with('files')->find($project->id);

        return Inertia::render('dashboard/projects/edit', [
            'project' => $project,
        ]);
    }

    public function update(Request $request, project $project)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:valid,invalid',
            'description' => 'required|string',
            'github_link' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'files' => 'nullable|array',
            'files.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        dd($data);

        $data['slug'] = $this->generateUniqueSlug($data['name']);
        $data['image'] = $project->image;

        if ($request->hasFile('image')) {
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $data['image'] = Storage::disk('public')->put('projects', $request->file('image'));
        }

        $uploadedFiles = [];
        if ($request->file('files')) {
            dd(''. $project->id .'');
            foreach ($request->file('files') as $file) {
                if ($file->isValid()) {
                    $uploadedFiles[] = ['files' => $file->store('projects', 'public')];
                }
            }
        }
        
        // Update project
        $project->update($data);

        if (!empty($uploadedFiles)) {
            $project->files()->createMany($uploadedFiles);
        }

        return to_route('projects.index')->with('success', 'project updated successfully!');
    }

    public function destroy($id)
    {
        $item = project::findOrFail($id);

        // Delete project files from storage
        foreach ($item->files as $file) {
            Storage::disk('public')->delete($file->files);
        }

        // Delete item files from the database
        $item->files()->delete();

        if ($item->image) {
            // Delete the image from storage
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();
        return redirect()->route('projects.index')
            ->with('success', 'project deleted successfully.');
    }
}
