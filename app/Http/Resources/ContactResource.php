<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "_id" => $this->object_id,
            "contactId" => $this->uuid,
            "contactStatus" => $this->status,
            "contactName" => $this->name,
            "contactGround" => $this->ground,
            "contactSatellite" => $this->satellite,
            "contactEquipment" => $this->equipment,
            "contactState" => $this->state,
            "contactStep" => $this->step,
            "contactDetail" => $this->detail,
            "contactBeginTimestamp" => $this->begin_at->getPreciseTimestamp(3),
            "contactEndTimestamp" => $this->end_at->getPreciseTimestamp(3),
            "contactLatitude" => $this->lng,
            "contactLongitude" => $this->lat,
            "contactAzimuth" => $this->azimuth,
            "contactElevation" => $this->elevation,
            "contactResolution" => $this->resolution,
            "contactResolutionStatus" => $this->resolution_status,

        ];
    }
}
