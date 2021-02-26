<?php

namespace Tests\Feature;

use App\Models\Alert;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AlertControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function user_can_fetch_alerts()
    {
        Alert::factory()->create([
            "uuid" => "6d76630e-e99f-5615-9bd8-331a0fc4b955",
            "severity" => "caution",
            "category" => "software",
            "message" => "Red FEP 121 - Offline",
            "long_message" => "Red FEP 121 is offline at 18:37:45",
            "time" => Carbon::createFromTimestampMs(1542134265725),
            "selected" => false,
            "new" => false,
            "expanded" => false
        ]);
        $alerts = Alert::factory()->count(5)->create();
        $response = $this->getJson('/api/alerts');
        $response->assertOk();

        $response->assertJsonFragment([
            [
                "errorId" => "6d76630e-e99f-5615-9bd8-331a0fc4b955",
                "errorSeverity" => "caution",
                "errorCategory" => "software",
                "errorMessage" => "Red FEP 121 - Offline",
                "longMessage" => "Red FEP 121 is offline at 18:37:45",
                "errorTime" => 1542134265725,
                "selected" => false,
                "new" => false,
                "expanded" => false,
            ]
        ]);

        foreach ($alerts as $alert) {
            $response->assertJsonFragment([
                [
                    "errorId" => $alert->uuid,
                    "errorSeverity" => $alert->severity,
                    "errorCategory" => $alert->category,
                    "errorMessage" => $alert->message,
                    "longMessage" => $alert->long_message,
                    "errorTime" => $alert->time->getPreciseTimestamp(3),
                    "selected" => $alert->selected,
                    "new" => $alert->new,
                    "expanded" => $alert->expanded
                ]
            ]);
        }

    }
}
