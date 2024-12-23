<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetalLabor extends Model
{
    protected $table = 'metal_labors';

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
