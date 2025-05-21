<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $projects = [
            [
                'name' => 'Construction of Steel Water Tank Concrete Platform',
                'project_code' => 'TNK-CON-2019-001',
                'description' => 'The Construction of Steel Water Tank Concrete Platform project (Project Code: TNK-CON-2019-001) is situated at GADTC Sports Complex, Misamis Occidental, Philippines. This infrastructure initiative involves the development of a reinforced concrete platform designed to securely support a steel water tank. The platform will serve as a critical component in improving water storage and distribution facilities within the area, enhancing both operational capacity and community access to water resources.',
                'start_date' => '2019-03-14',
                'end_date' => '2019-05-14',
                'actual_start_date' => null,
                'actual_end_date' => null, // ongoing project
                'budget' => 1700000.00,
                'cost' => null,
                'source' => 'LGU Infrastructure Fund',
                'location' => 'Gadtc Sports Complex, Misamis Occidental, Philippines',
                'engineer' => 5,
                'contructor' => 6,
                'category' => 'Public Buildings',
                'priority' => 'High',
                'contractual' => 0,//need materials and labors
                'status' => 'Ongoing',
            ],
            [
                'name' => 'Tangub City Hall Renovation',
                'project_code' => 'TC-RENOV-2025-001',
                'description' => 'A full renovation of Tangub City Hall including structural upgrades, interior remodeling, and landscaping.',
                'start_date' => '2025-06-01',
                'end_date' => '2025-12-15',
                'actual_start_date' => '2025-06-03',
                'actual_end_date' => null, // ongoing project
                'budget' => 15000000.00,
                'cost' => null,
                'source' => 'LGU Infrastructure Fund',
                'location' => 'Tangub City, Misamis Occidental, Philippines',
                'engineer' => 5,
                'contructor' => 6,
                'category' => 'Public Buildings',
                'priority' => 'High',
                'contractual' => 1,
                'status' => 'Ongoing',
            ],
            [
                'name' => 'Barangay Road Improvement - San Isidro',
                'project_code' => 'BRI-SI-2025-001',
                'description' => 'Improvement of Barangay San Isidro road including asphalt paving, drainage, and roadside barriers.',
                'start_date' => '2025-06-01',
                'end_date' => '2025-08-31',
                'actual_start_date' => '2025-06-05',
                'actual_end_date' => null,
                'budget' => 3000000.00,
                'cost' => null,
                'source' => 'LGU Infrastructure Fund',
                'location' => 'San Isidro, Tangub City',
                'engineer' => 4,
                'contructor' => 1,
                'category' => 'Barangay Roads',
                'priority' => 'High',
                'contractual' => 1,
                'status' => 'Ongoing',
            ],
            [
                'name' => 'Bridge Construction - Barangay San Miguel',
                'project_code' => 'BC-SM-2025-006',
                'description' => 'Construction of a new concrete bridge over San Miguel River to improve access for residents and emergency vehicles.',
                'start_date' => '2025-07-01',
                'end_date' => '2025-12-31',
                'actual_start_date' => '2025-07-03',
                'actual_end_date' => null,
                'budget' => 15000000.00,
                'cost' => null,
                'source' => 'LGU Infrastructure Fund',
                'location' => 'Barangay San Miguel, Tangub City',
                'engineer' => 6,
                'contructor' => 6,
                'category' => 'Bridges',
                'priority' => 'High',
                'contractual' => 1,
                'status' => 'Ongoing',
            ]
        ];

        Project::insertOrIgnore($projects);
    }
}
