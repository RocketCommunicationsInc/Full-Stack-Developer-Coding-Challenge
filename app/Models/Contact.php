<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;

    protected $dateFormat = 'Y-m-d H:i:s.u';

    protected $casts = [
        'begin_at' => 'datetime',
        'end_at' => 'datetime',
        'azimuth' => 'float',
        'elevation' => 'float',
        'lat' => 'float',
        'lng' => 'float',
        'name' => 'integer'
    ];

}
