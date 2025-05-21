<?php

namespace Database\Seeders;

use App\Models\RequestDateExtension;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExtensionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $extension = [
            [
                'project' => 1,
                'requested_by' => 'Engr. Andrey Tuastomban',
                'current_end_date' => '2019-05-14',
                'requested_end_date' => '2019-05-21',
                'reason' => 'The extension is requested due to unforeseen weather conditions that significantly delayed critical construction activities, particularly during the excavation and concrete curing phases. This request ensures the project can be completed with the required safety and quality standards.',
                'requested_at' => now(),
                'remarks' => '',
                'status' => 0,
            ],
        ];
        
        RequestDateExtension::insertOrIgnore($extension);
    }
}
