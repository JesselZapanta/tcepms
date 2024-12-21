<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $table = 'equipments';

    protected $fillable = [
        'project',
        'equipment',
        'quantity',
        'no_of_days',
        'rate',
        'cost',
    ];
    
    public function project ()
    {
        return $this->belongsTo(Project::class, 'project');
    }
}
