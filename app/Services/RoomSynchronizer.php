<?php

namespace App\Services;

use App\Models\MobileRoom;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Native\Mobile\Facades\Network;

class RoomSynchronizer
{
    public static function run(): void
    {
        // Dynamically  URL and Image Base URL 
        $serverUrl = env('ROOMS_API_URL');
        $imageBaseUrl = env('ROOMS_IMAGE_BASE_URL');

        if (!$serverUrl) {
            $serverUrl = "http://127.0.0.1:8000/api/rooms/sync";
        }

        if (!$imageBaseUrl) {
            $imageBaseUrl = "http://127.0.0.1:8000/storage/";
        }

        //  network check for the dev emulator
        try {
            if (class_exists('Native\Mobile\Facades\Network') && Network::status()->isOffline()) {
                Log::info('Mobile Sync skipped: Emulator reports offline state.');
                return;
            }
        } catch (\Throwable $th) {
            // Fallback gracefully if facade is still pairing with mobile driver hooks
        }

        try {
            Log::info('Mobile Sync initiating hit to: ' . $serverUrl);

            $response = null;
            try {
                $res = Http::timeout(3)->get($serverUrl);
                if ($res->successful()) {
                    $response = $res;
                }
            } catch (\Exception $e) {
                Log::warning('Mobile Sync primary host connection failed: ' . $e->getMessage());
            }


            // fallback to the emulator host loopback IP.
            if ((!$response || !$response->successful()) && str_contains($serverUrl, '127.0.0.1') && PHP_OS_FAMILY === 'Linux') {
                $fallbackUrl = str_replace('127.0.0.1', '10.0.2.2', $serverUrl);
                Log::info('Mobile Sync attempting fallback to Android emulator host IP: ' . $fallbackUrl);
                try {
                    $res = Http::timeout(5)->get($fallbackUrl);
                    if ($res->successful()) {
                        $response = $res;
                        $imageBaseUrl = str_replace('127.0.0.1', '10.0.2.2', $imageBaseUrl);
                    }
                } catch (\Exception $e) {
                    Log::error('Mobile Sync fallback connection failed: ' . $e->getMessage());
                }
            }

            // Fallback to initial response if it was set but not successful
            if (!$response) {
                Log::error('Mobile Sync could not connect to local host or emulator fallback.');
                return;
            }

            if ($response->successful()) {
                $remoteRooms = $response->json('rooms') ?? [];

                Log::info('Mobile Sync successful! Found rooms count: ' . count($remoteRooms));

                foreach ($remoteRooms as $room) {
                    // Use the API's numeric `id` as the reliable sync key.
                    $remoteId = $room['id'] ?? null;

                    if (!$remoteId) {
                        Log::warning('Mobile Sync skipped a room with no id', $room);
                        continue;
                    }

                    // Build the full image URL
                    $imagePath = $room['image'] ?? null;
                    if ($imagePath) {
                        if (str_starts_with($imagePath, 'http://') || str_starts_with($imagePath, 'https://')) {
                            $fullImageUrl = $imagePath;
                        } else {
                            $fullImageUrl = rtrim($imageBaseUrl, '/') . '/' . ltrim($imagePath, '/');
                        }
                    } else {
                        $fullImageUrl = null;
                    }

                    MobileRoom::updateOrCreate(
                        ['remote_id' => $remoteId],
                        [
                            'uuid'        => $room['uuid'] ?: null,
                            'title'       => $room['title'],
                            'description' => $room['description'],
                            'price'       => $room['price'],
                            'image'       => $fullImageUrl,
                        ]
                    );
                }
            } else {
                Log::error('Mobile Sync failed status code: ' . $response->status());
            }
        } catch (\Exception $e) {
            Log::error('Mobile Sync connection error: ' . $e->getMessage());
        }
    }
}
