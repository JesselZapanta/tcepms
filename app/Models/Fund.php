<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fund extends Model
{
    protected $table = 'funds';
    protected $fillable = [
        'name',
        'status',
    ];

}
