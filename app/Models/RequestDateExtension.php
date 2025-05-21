<?php

namespace App\Models;

use App\Casts\ManilaDateTimeCast;
use Illuminate\Database\Eloquent\Model;

class RequestDateExtension extends Model
{
    protected $table = 'request_date_extensions';
    protected $fillable = [
        'project',
        'requested_by',
        'current_end_date',
        'requested_end_date',
        'reason',
        'requested_at',
        'remarks',
        'status',
    ];

    // protected $casts = [
    //     'current_end_date' => ManilaDateTimeCast::class,
    //     'requested_end_date' => ManilaDateTimeCast::class,
    // ];
    

    public function project()
    {
        return $this->belongsTo(Project::class, 'project');
    }
}
