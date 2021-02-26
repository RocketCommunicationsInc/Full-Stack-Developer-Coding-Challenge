<?php

namespace Tests\Feature;

use App\Models\Contact;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ContactControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_fetch_contacts()
    {

        $this->withoutExceptionHandling();
        Contact::factory()->create([
            'object_id' => "5c926e56fddac523882598d8",
            'uuid' => "01bb9a28-7f3a-519c-8b47-0481f946b14a",
            'status' => "normal",
            'name' => 64900,
            'ground' => "CTS",
            'satellite' => "USA-256",
            'equipment' => "ANT62 VAFB1 SFEP215CH1 ECEU6 WS388 USP182",
            'state' => "executing",
            'step' => "Critical Health",
            'detail' => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            'begin_at' => Carbon::createFromTimestampMs(1563753600),
            'end_at' => Carbon::createFromTimestampMs(1563754620),
            'lng' => 6.62334,
            'lat' => -50.78854,
            'azimuth' => 141.771,
            'elevation' => 62.9,
            'resolution' => "complete",
            'resolution_status' => "normal"
        ]);
        $contacts = Contact::factory()->count(5)->create();
        $response = $this->getJson('/api/contacts');
        $response->assertOk();

        $response->assertJsonFragment([
                "_id" => "5c926e56fddac523882598d8",
                "contactId" => "01bb9a28-7f3a-519c-8b47-0481f946b14a",
                "contactStatus" => "normal",
                "contactName" => 64900,
                "contactGround" => "CTS",
                "contactSatellite" => "USA-256",
                "contactEquipment" => "ANT62 VAFB1 SFEP215CH1 ECEU6 WS388 USP182",
                "contactState" => "executing",
                "contactStep" => "Critical Health",
                "contactDetail" => "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "contactBeginTimestamp" => 1563753600,
                "contactEndTimestamp" => 1563754620,
                "contactLatitude" => 6.62334,
                "contactLongitude" => -50.78854,
                "contactAzimuth" => 141.771,
                "contactElevation" => 62.9,
                "contactResolution" => "complete",
                "contactResolutionStatus" => "normal"
        ]);

        foreach ($contacts as $contact) {
            $response->assertJsonFragment([
                "_id" => $contact->object_id,
                "contactId" => $contact->uuid,
                "contactStatus" => $contact->status,
                "contactName" => $contact->name,
                "contactGround" => $contact->ground,
                "contactSatellite" => $contact->satellite,
                "contactEquipment" => $contact->equipment,
                "contactState" => $contact->state,
                "contactStep" => $contact->step,
                "contactDetail" => $contact->detail,
                "contactBeginTimestamp" => $contact->begin_at->getPreciseTimestamp(3),
                "contactEndTimestamp" => $contact->end_at->getPreciseTimestamp(3),
                "contactLatitude" => $contact->lng,
                "contactLongitude" => $contact->lat,
                "contactAzimuth" => $contact->azimuth,
                "contactElevation" => $contact->elevation,
                "contactResolution" => $contact->resolution,
                "contactResolutionStatus" => $contact->resolution_status,
            ]);
        }

    }

}
