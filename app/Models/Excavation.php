<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Excavation extends Model
{
    protected $table = 'excavations';

    protected $fillable = [
        'project',
        'material',
        'quantity',
        'no_of_days',
        'rate',
        'cost',
    ];

    public function project()
    {
        return $this->belongsTo(User::class, 'project');
    }
}
