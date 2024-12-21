<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlasterFinish extends Model
{
    protected $table = 'plaster_finishes';

    protected $fillable = [
        'project',
        'material',
        'unit',
        'quantity',
        'unit_cost',
        'cost',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project');
    }
}
