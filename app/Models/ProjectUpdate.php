<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectUpdate extends Model
{
    protected $table = 'project_updates';

    protected $fillable = [
        'project',
        'engineer',
        'name',
        'description',
        'excavation_progress',
        'concrete_works_progress',
        'water_works_progress',
        'metal_works_progress',
        'cement_plaster_and_finishes_progress',
        'update_date'
    ];

    public function project()
    {
        return $this->belongsTo(Project::class, 'project');
    }
    public function siteEngineer()
    {
        return $this->belongsTo(User::class, 'engineer');
    }

    public function images()
    {
        return $this->hasMany(ImageUpdate::class,'project_update');
    }
}
