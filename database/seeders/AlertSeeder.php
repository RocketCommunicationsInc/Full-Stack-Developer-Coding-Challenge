<?php

namespace Database\Seeders;

use App\Models\Alert;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class AlertSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = json_decode(file_get_contents(database_path('data/alerts.json')), true);
        foreach ($data as $alert) {
            Alert::updateOrCreate(
                [
                    'uuid' => $alert['errorId']
                ],
                [
                    'uuid' => $alert['errorId'],
                    'severity' => $alert['errorSeverity'],
                    'category' => $alert['errorCategory'],
                    'message' => $alert['errorMessage'],
                    'long_message' => $alert['longMessage'],
                    'time' => Carbon::createFromTimestampMs($alert['errorTime']),
                    'selected' => $alert['selected'],
                    'new' => $alert['new'],
                    'expanded' => $alert['expanded'],
                ]
            );
        }

    }
}
