<?php

use App\Models\MobileRoom;
use App\Services\RoomSynchronizer;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
});

Route::get('/rooms', function () {
    // pull latest rooms from the website API 
    RoomSynchronizer::run();

    return Inertia::render('MobileDashboard', [
        'rooms' => MobileRoom::latest()->get()
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About');
});

Route::get('/contactus', function () {
    return Inertia::render('ContactUs');
});
