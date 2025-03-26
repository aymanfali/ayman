<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/categories/index', [
            'categories' => Category::all()
        ]);
    }

    public function show(Category $category): Response
    {
        return Inertia::render('dashboard/categories/index', [
            'category' => $category
        ]);
    }

    private function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $count = Category::where('slug', 'LIKE', "{$slug}%")->count();

        return $count ? "{$slug}-" . ($count + 1) : $slug;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data['slug'] = $this->generateUniqueSlug($data['name']);

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $data['image'] = Storage::disk('public')->put('categories', $request->file('image'));
        }

        // Create Category
        Category::create($data);

        return to_route('categories.index')->with('success', 'Category created successfully!');
    }

    public function edit(Category $category)
    {
        return Inertia::render('dashboard/categories/edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        // dd($request->all(), $category);
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'status' => 'required|in:valid,invalid',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data['slug'] = $this->generateUniqueSlug($data['name']);

        $data['image'] = $category->image;

        if ($request->hasFile('image')) {
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $data['image'] = Storage::disk('public')->put('categories', $request->file('image'));
        }

        // Update Category
        $category->update($data);
        return to_route('categories.index')->with('success', 'Category updated successfully!');
    }

    public function destroy($id)
    {
        $item = Category::findOrFail($id);
        if ($item->image) {
            // Delete the image from storage
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();
        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully.');
    }

}
