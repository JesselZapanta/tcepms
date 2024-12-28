<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Project extends Model
{
    use HasFactory, Notifiable;

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
        'category',
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
    //has many relation
    public function excavation()
    {
        return $this->hasMany(Excavation::class, 'project');
    }
    public function concrete()
    {
        return $this->hasMany(Concrete::class, 'project');
    }
    public function concreteLabor()
    {
        return $this->hasMany(ConcreteLabor::class, 'project');
    }
    public function water()
    {
        return $this->hasMany(Water::class, 'project');
    }
    
    public function waterLabor()
    {
        return $this->hasMany(WaterLabor::class, 'project');
    }
    public function metal()
    {
        return $this->hasMany(Metal::class, 'project');
    }
    public function metalLabor()
    {
        return $this->hasMany(MetalLabor::class, 'project');
    }
    public function plasterFinish()
    {
        return $this->hasMany(PlasterFinish::class, 'project');
    }
    public function plasterFinishLabor()
    {
        return $this->hasMany(PlasterFinishLabor::class, 'project');
    }
    public function equipment()
    {
        return $this->hasMany(Equipment::class, 'project');
    }
    //updates

    public function updates()
    {
        return $this->hasMany(ProjectUpdate::class,'project');
    }
}
