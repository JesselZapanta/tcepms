<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $table = 'projects';
    protected $fillable = [
        'name',
        'description',
        'start_date',
        'end_date',
        'actual_start_date',
        'actual_end_date',
        'budget',
        'cost',
        'source',
        'location',
        'latitude',
        'longitude',
        'engineer',
        'contructor',
        'status',
        'priority',
    ];
    public function siteEngineer()
    {
        return $this->belongsTo(User::class, 'engineer');
    }
    public function contructor()
    {
        return $this->belongsTo(Contructor::class, 'contructor');
    }
}
