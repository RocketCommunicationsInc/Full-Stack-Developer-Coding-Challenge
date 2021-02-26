<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AlertResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'errorId' => $this->uuid,
            'errorSeverity' => $this->severity,
            'errorCategory' => $this->category,
            'errorMessage' => $this->message,
            'longMessage' => $this->long_message,
            'errorTime' => $this->time->getPreciseTimestamp(3),
            'selected' => $this->selected,
            'new' => $this->new,
            'expanded' => $this->expanded
        ];
    }
}
