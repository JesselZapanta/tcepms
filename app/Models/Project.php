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
        'engineer_id',
        'contructor_id',
        'status',
        'priority',
    ];
    public function engineer()
    {
        return $this->belongsTo(User::class, 'engineer_id');
    }
    public function contructor()
    {
        return $this->belongsTo(Contructor::class, 'contructor_id');
    }
}
