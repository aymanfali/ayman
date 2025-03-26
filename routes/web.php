<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\ProjectController;
use App\Http\Controllers\Dashboard\ServiceController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::resource('dashboard/categories', CategoryController::class);
    Route::resource('dashboard/projects', ProjectController::class);
    Route::resource('dashboard/services', ServiceController::class);

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
