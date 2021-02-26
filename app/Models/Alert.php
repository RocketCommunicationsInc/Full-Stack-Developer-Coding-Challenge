<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Alert extends Model
{
    use HasFactory;

//    protected $dateFormat = 'U';
    protected $dateFormat = 'Y-m-d H:i:s.u';

    protected $casts = [
        'time' => 'datetime',
        'selected' => 'boolean',
        'new' => 'boolean',
        'expanded' => 'boolean'
    ];
}
