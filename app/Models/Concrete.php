<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Concrete extends Model
{
    protected $table = 'concretes';

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
