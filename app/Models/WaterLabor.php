<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WaterLabor extends Model
{
    protected $table = 'water_labors';

    protected $fillable = [
        'project',
        'position',
        'quantity',
        'no_of_days',
        'rate',
        'cost',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project');
    }
}
