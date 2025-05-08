<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;
use Inertia\Inertia;

class ContactUsController extends Controller
{

    public function create(){
        return Inertia::render('contact');
    }
    
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255',
            'subject' => 'nullable|string',
            'content' => 'required|string|max:255',
        ]);

        // Create message
        $message = Contact::create($data);

        return to_route('home')->with('success', 'Message Sent successfully!');
    }
}
