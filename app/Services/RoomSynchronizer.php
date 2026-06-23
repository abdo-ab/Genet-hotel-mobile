<?php

namespace App\Services;

use App\Models\MobileRoom;
use Illuminate\Support\Facades\Http;
use Native\Mobile\Facades\Network;

class RoomSynchronizer
{
    protected static string $serverUrl = 'http://sefefu.test/api/rooms/sync';

    public static function run(): void
    {
        $status = Network::status();
        if (!$status || !($status->connected ?? false)) {
            return; // Exit silently. The app will safely serve cached rows from local SQLite.
        }

        try {
            // 2. Query the Main Website project's endpoint
            $response = Http::timeout(5)->get(self::$serverUrl);

            if ($response->successful()) {
                $remoteRooms = $response->json('rooms') ?? [];

                // 3. Clear or update local SQLite rows safely to match the server state
                foreach ($remoteRooms as $room) {
                    MobileRoom::updateOrCreate(
                        ['uuid' => $room['uuid']],
                        [
                            'title'       => $room['title'],
                            'description' => $room['description'],
                            'price'       => $room['price'],
                            'image'       => $room['image'],
                        ]
                    );
                }
            }
        } catch (\Exception $e) {
            // Log or handle endpoint timeout failures safely
        }
    }
}
