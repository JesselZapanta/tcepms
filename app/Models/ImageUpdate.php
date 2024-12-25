<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImageUpdate extends Model
{
    protected $table = 'image_updates';
    protected $fillable = [
        'project_update',
        'file_path',
    ];
    
    public function projectUpdate()
    {
        return $this->belongsTo(ProjectUpdate::class, 'project_update');
    }
}
