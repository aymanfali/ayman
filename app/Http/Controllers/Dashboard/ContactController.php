<?php

namespace App\Http\Controllers\Dashboard;
use App\Http\Controllers\controller;

use Illuminate\Http\Request;
use App\Models\Contact;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard/contacts/index', [
            'messages' => Contact::all()
        ]);
    }

    public function show(Contact $message): Response
    {
        return Inertia::render('dashboard/contacts/show', [
            'message' => $message
        ]);
    }
}
