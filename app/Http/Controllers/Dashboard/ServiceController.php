<?php

namespace App\Http\Controllers\Dashboard;
use App\Http\Controllers\controller;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServiceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/services/index', [
            'services' => Service::all()
        ]);
    }

    public function show(Service $service): Response
    {
        return Inertia::render('dashboard/services/show', [
            'service' => $service
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('dashboard/services/create');
    }

    private function generateUniqueSlug($name)
    {
        $slug = Str::slug($name);
        $count = Service::where('slug', 'LIKE', "{$slug}%")->count();

        return $count ? "{$slug}-" . ($count + 1) : $slug;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'faqs' => 'nullable|array',
            'faqs.*.question' => 'required|string',
            'faqs.*.answer' => 'required|string',
        ]);

        $data['slug'] = $this->generateUniqueSlug($data['name']);

        // Handle Image Upload
        if ($request->hasFile('image')) {
            $data['image'] = Storage::disk('public')->put('services', $request->file('image'));
        }

        // Create service
        $service = $request->user()->services()->create($data);
        if (!empty($data['faqs'])) {
            $service->faqs()->createMany($data['faqs']);
        }

        return to_route('services.index')->with('success', 'service created successfully!');
    }

    public function edit(Service $service)
    {
        // Eager load the faqs relationship
        $service = Service::with('faqs')->find($service->id);

        return Inertia::render('dashboard/services/edit', [
            'service' => $service,
        ]);
    }

    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:valid,invalid',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'faqs' => 'nullable|array',
            'faqs.*.id' => 'nullable|exists:faqs,id', // Validate existing FAQ IDs
            'faqs.*.question' => 'required|string',
            'faqs.*.answer' => 'required|string',
        ]);

        $data['slug'] = $this->generateUniqueSlug($data['name']);
        $data['image'] = $service->image;

        if ($request->hasFile('image')) {
            if ($service->image) {
                Storage::disk('public')->delete($service->image);
            }
            $data['image'] = Storage::disk('public')->put('services', $request->file('image'));
        }


        // Update service
        $service->update($data);

        if (!empty($data['faqs'])) {
            $existingFaqs = collect($data['faqs'])->whereNotNull('id')->toArray();
            $newFaqs = collect($data['faqs'])->whereNull('id')->map(function ($faq) use ($service) {
                return [
                    'service_id' => $service->id,
                    'question' => $faq['question'],
                    'answer' => $faq['answer'],
                ];
            })->toArray();

            // Remove FAQs that were deleted
            $existingFaqIds = $service->faqs()->pluck('id')->toArray();
            $newFaqIds = collect($data['faqs'])->pluck('id')->filter()->toArray(); // Ignore null values

            $faqsToDelete = array_diff($existingFaqIds, $newFaqIds);
            if (!empty($faqsToDelete)) {
                $service->faqs()->whereIn('id', $faqsToDelete)->delete();
            }

            // Update existing FAQs
            if (!empty($existingFaqs)) {
                $service->faqs()->upsert($existingFaqs, ['id'], ['question', 'answer']);
            }

            // Insert new FAQs
            if (!empty($newFaqs)) {
                $service->faqs()->createMany($newFaqs);
            }

        } else {
            // Delete all FAQs if no data is provided
            $service->faqs()->delete();
        }

        return to_route('services.index')->with('success', 'Service updated successfully!');
    }

    public function destroy($id)
    {
        $item = service::findOrFail($id);

        $item->faqs()->delete();

        if ($item->image) {
            // Delete the image from storage
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();
        return redirect()->route('services.index')
            ->with('success', 'service deleted successfully.');
    }
}
