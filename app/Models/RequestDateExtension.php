<?php

namespace App\Models;

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

    public function project()
    {
        return $this->belongsTo(Project::class, 'project');
    }
}
