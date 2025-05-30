<?php

namespace App\Models;

use App\Casts\ManilaDateTimeCast;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Project extends Model
{
    use HasFactory, Notifiable;

    protected $table = 'projects';
    protected $fillable = [
        'name',
        'project_code',
        'description',
        'start_date',
        'end_date',
        'actual_start_date',
        'actual_end_date',
        'duration',
        'budget',
        'cost',
        'source',
        'location',
        'lot_size',
        'structural_plan',
        'compliance_standards',
        'building_permit',
        'environmental_compliance_certificate',
        'barangay_clearance',
        'zoning_clearance',
        'contractor_accreditation',
        'engineer',
        'contructor',
        'category',
        'priority',
        'contractual',
        'status',
    ];

    // protected $casts = [
    //     'start_date' => ManilaDateTimeCast::class,
    //     'end_date' => ManilaDateTimeCast::class,
    // ]; 
    

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
