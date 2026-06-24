<?php

use App\Models\MobileRoom;
use App\Services\RoomSynchronizer;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // 1. Silently pull latest rooms from the website API down into local SQLite
    RoomSynchronizer::run();

    // 2. Always render your offline-ready local rooms to the mobile interface
    return Inertia::render('MobileDashboard', [
        'rooms' => MobileRoom::latest()->get()
    ]);
});
