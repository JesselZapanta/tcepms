<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Water extends Model
{
    protected $table = 'waters';

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
