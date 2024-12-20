<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contructor extends Model
{
    protected $table = 'contructors';

    protected $fillable = [
        'company_name',
        'description',
        'contact',
        'website',
        'address',
        'status',
    ];
}
