<?php

namespace Database\Seeders;

use App\Models\ConcreteLabor;
use App\Models\MetalLabor;
use App\Models\PlasterFinishLabor;
use App\Models\WaterLabor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LaborerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //concrete
        $concreateLabor = [
            [
                'project' => 1,
                'position' => 'Foreman',
                'quantity' => 1,
                'no_of_days' => 50,
                'rate' => 400,
                'cost' => 20000,
            ],
            [
                'project' => 1,
                'position' => 'Cement Mason',
                'quantity' => 2,
                'no_of_days' => 40,
                'rate' => 350,
                'cost' => 28000,
            ],
            [
                'project' => 1,
                'position' => 'Laborer',
                'quantity' => 3,
                'no_of_days' => 40,
                'rate' => 300,
                'cost' => 36000,
            ],
        ];
        

        //water

        $waterLabor = [
            [
                'project' => 1,
                'position' => 'Pipefitter',
                'quantity' => 4,
                'no_of_days' => 47,
                'rate' => 400,
                'cost' => 75200,
            ],
            [
                'project' => 1,
                'position' => 'Welder',
                'quantity' => 3,
                'no_of_days' => 47,
                'rate' => 400,
                'cost' => 56400,
            ],
            [
                'project' => 1,
                'position' => 'Laborer',
                'quantity' => 5,
                'no_of_days' => 47,
                'rate' => 300,
                'cost' => 70500,
            ],
        ];
        

        //metal
        $metalLabor = [
            [
                'project' => 1,
                'position' => 'Welder',
                'quantity' => 1,
                'no_of_days' => 12,
                'rate' => 400,
                'cost' => 4800,
            ],
            [
                'project' => 1,
                'position' => 'Steelman',
                'quantity' => 2,
                'no_of_days' => 10,
                'rate' => 400,
                'cost' => 8000,
            ],
            [
                'project' => 1,
                'position' => 'Laborer',
                'quantity' => 2,
                'no_of_days' => 11,
                'rate' => 300,
                'cost' => 6600,
            ],
        ];
        
        //cement and plaster

        $cementPlasterLabor = [
            [
                'project' => 1,
                'position' => 'Plasterer',
                'quantity' => 1,
                'no_of_days' => 5,
                'rate' => 400,
                'cost' => 2000,
            ],
            [
                'project' => 1,
                'position' => 'Helper',
                'quantity' => 1,
                'no_of_days' => 5,
                'rate' => 350,
                'cost' => 1750,
            ],
            [
                'project' => 1,
                'position' => 'Laborer',
                'quantity' => 1,
                'no_of_days' => 5,
                'rate' => 300,
                'cost' => 1500,
            ],
        ];
        
        ConcreteLabor::insertOrIgnore($concreateLabor);
        WaterLabor::insertOrIgnore($waterLabor);
        MetalLabor::insertOrIgnore($metalLabor);
        PlasterFinishLabor::insertOrIgnore($cementPlasterLabor);
    }
}
