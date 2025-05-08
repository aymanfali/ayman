<?php

namespace App\Http\Controllers\Dashboard;
use App\Http\Controllers\controller;

use App\Models\Heroslider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class HeroSliderController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/hero-slider/index', [
            'slides' => HeroSlider::all()
        ]);
    }

    public function show(HeroSlider $heroSlider): Response
    {
        return Inertia::render('dashboard/hero-slider/show', [
            'slide' => $heroSlider
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/hero-slider/create');
    }

    private function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $count = HeroSlider::where('slug', 'LIKE', "{$slug}%")->count();

        return $count ? "{$slug}-" . ($count + 1) : $slug;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data['slug'] = $this->generateUniqueSlug($data['title']);

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $data['image'] = Storage::disk('public')->put('hero-slides', $request->file('image'));
        }

        // Create HeroSlider
        $HeroSlider = $request->user()->heroSlider()->create($data);

        return to_route('hero-slider.index')->with('success', 'HeroSlider created successfully!');
    }

    public function edit(HeroSlider $HeroSlider)
    {
        // Eager load the faqs relationship
        $HeroSlider = HeroSlider::find($HeroSlider->id);

        return Inertia::render('dashboard/hero-slider/edit', [
            'slides' => $HeroSlider,
        ]);
    }

    public function update(Request $request, HeroSlider $HeroSlider)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:valid,invalid',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $data['slug'] = $this->generateUniqueSlug($data['title']);
        $data['image'] = $HeroSlider->image;

        if ($request->hasFile('image')) {
            if ($HeroSlider->image) {
                Storage::disk('public')->delete($HeroSlider->image);
            }
            $data['image'] = Storage::disk('public')->put('hero-slides', $request->file('image'));
        }


        // Update HeroSlider
        $HeroSlider->update($data);      

        return to_route('hero-slider.index')->with('success', 'HeroSlider updated successfully!');
    }

    public function destroy($id)
    {
        $item = HeroSlider::findOrFail($id);

        if ($item->image) {
            // Delete the image from storage
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();
        return redirect()->route('hero-slider.index')
            ->with('success', 'HeroSlider deleted successfully.');
    }
}
