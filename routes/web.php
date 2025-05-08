<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\HeroSliderController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\ProjectController;
use App\Http\Controllers\Dashboard\ServiceController;
use App\Http\Controllers\Dashboard\ContactController;
use App\Http\Controllers\ContactUsController;

use App\Models\Service;
use App\Models\Project;
use App\Models\Heroslider;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'services' => Service::all(),
        'projects' => Project::all(),
        'heroSlides' => Heroslider::all(),
    ]);
})->name('home');

Route::get('/contact-us', [ContactUsController::class, 'create'])->name('contact-us.create');
Route::middleware(['throttle:10,1'])->post('/contact-us', [ContactUsController::class, 'store'])->name('contact-us.store');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('dashboard/hero-slider', HeroSliderController::class);
    Route::resource('dashboard/categories', CategoryController::class);
    Route::resource('dashboard/projects', ProjectController::class);
    Route::resource('dashboard/services', ServiceController::class);
    Route::resource('dashboard/contacts', ContactController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
