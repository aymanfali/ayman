<?php

namespace App\Http\Controllers;
use App\Http\Controllers\controller;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ServicesController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('welcome', [
            'services' => Service::all()
        ]);
    }

    // public function show(Service $service): Response
    // {
    //     return Inertia::render('dashboard/services/show', [
    //         'service' => $service
    //     ]);
    // }
}
