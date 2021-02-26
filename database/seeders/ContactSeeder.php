<?php

namespace Database\Seeders;

use App\Models\Contact;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = json_decode(file_get_contents(database_path('data/contacts.json')), true);
        foreach ($data as $contact) {
            Contact::updateOrCreate(
                [
                    'uuid' => $contact['contactId']
                ],
                [
                    "object_id" => $contact['_id'],
                    "uuid" => $contact['contactId'],
                    "status" => $contact['contactStatus'],
                    "name" => $contact['contactName'],
                    "ground" => $contact['contactGround'],
                    "satellite" => $contact['contactSatellite'],
                    "equipment" => $contact['contactEquipment'],
                    "state" => $contact['contactState'],
                    "step" => $contact['contactStep'],
                    "detail" => $contact['contactDetail'],
                    "begin_at" => Carbon::createFromTimestampMs($contact['contactBeginTimestamp']),
                    "end_at" => Carbon::createFromTimestampMs($contact['contactEndTimestamp']),
                    "lng" => $contact['contactLatitude'],
                    "lat" => $contact['contactLongitude'],
                    "azimuth" => $contact['contactAzimuth'],
                    "elevation" => $contact['contactElevation'],
                    "resolution" => $contact['contactResolution'],
                    "resolution_status" => $contact['contactResolutionStatus'],
                ]
            );
        }
    }
}
