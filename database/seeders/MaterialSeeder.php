<?php

namespace Database\Seeders;

use App\Models\Concrete;
use App\Models\Equipment;
use App\Models\Excavation;
use App\Models\Metal;
use App\Models\PlasterFinish;
use App\Models\Water;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //Excavation

        $excavation = [
            [
                'project' => 1,
                'material' => 'Foreman',
                'quantity' => 1,
                'no_of_days' => 5,
                'rate' => 400,
                'cost' => 2000,
            ],
            [
                'project' => 1,
                'material' => 'Laborer',
                'quantity' => 5,
                'no_of_days' => 9,
                'rate' => 300,
                'cost' => 13500,
            ],
        ];

        //Concrete Works
        
        $concrete = [
            [
                'project' => 1,
                'material' => 'Portland Cement 40 kg',
                'unit' => 'bag',
                'quantity' => 140,
                'unit_cost' => 290,
                'cost' => 40600,
            ],
            [
                'project' => 1,
                'material' => 'Washed Sand',
                'unit' => 'cu.m',
                'quantity' => 9,
                'unit_cost' => 1200,
                'cost' => 10800,
            ],
            [
                'project' => 1,
                'material' => 'Crushed Gravel 3/4',
                'unit' => 'cu.m',
                'quantity' => 17,
                'unit_cost' => 1400,
                'cost' => 23800,
            ],
            [
                'project' => 1,
                'material' => 'Total No. of 10mm x 6m RSB',
                'unit' => 'pcs',
                'quantity' => 100,
                'unit_cost' => 160,
                'cost' => 16000,
            ],
            [
                'project' => 1,
                'material' => 'Total No. of 16mm x 6m RSB',
                'unit' => 'pcs',
                'quantity' => 90,
                'unit_cost' => 450,
                'cost' => 40500,
            ],
            [
                'project' => 1,
                'material' => 'Total No. of 20mm x 6m RSB',
                'unit' => 'pcs',
                'quantity' => 80,
                'unit_cost' => 712,
                'cost' => 56960,
            ],
            [
                'project' => 1,
                'material' => 'Ordinary Plywood 1/4" thick',
                'unit' => 'pcs',
                'quantity' => 26,
                'unit_cost' => 385,
                'cost' => 10010,
            ],
            [
                'project' => 1,
                'material' => '2 x 3 x 10 Coco Lumber',
                'unit' => 'bd.ft.',
                'quantity' => 170,
                'unit_cost' => 18,
                'cost' => 3060,
            ],
            [
                'project' => 1,
                'material' => '2 x 2 x 10 Coco Lumber',
                'unit' => 'bd.ft.',
                'quantity' => 205,
                'unit_cost' => 18,
                'cost' => 3690,
            ],
            [
                'project' => 1,
                'material' => 'No. 3 CW Nails',
                'unit' => 'kg',
                'quantity' => 15,
                'unit_cost' => 65,
                'cost' => 975,
            ],
            [
                'project' => 1,
                'material' => 'No. 1 1/2 CW Nails',
                'unit' => 'kg',
                'quantity' => 15,
                'unit_cost' => 68,
                'cost' => 1020,
            ],
            [
                'project' => 1,
                'material' => 'No. 16 G.I. Tie Wire (Using 250 mm)',
                'unit' => 'kg',
                'quantity' => 26,
                'unit_cost' => 75,
                'cost' => 1950,
            ],
            [
                'project' => 1,
                'material' => 'Hacksaw Blade',
                'unit' => 'pcs',
                'quantity' => 15,
                'unit_cost' => 70,
                'cost' => 1050,
            ],
        ];

        //Water Works
        $water = [
            [
                
                'project' => 1,
                'material' => 'Steel Water Tank',
                'unit' => 'set',
                'quantity' => 2,
                'unit_cost' => 253000,
                'cost' => 506000,
            ]
        ];
        //Metal Works
        $metal = [
            [
                'project' => 1,
                'material' => '16mm x 6m Plain Round Bars',
                'unit' => 'pcs',
                'quantity' => 50,
                'unit_cost' => 450,
                'cost' => 22500,
            ],
            [
                'project' => 1,
                'material' => '1 1/2 x 6m G.I. Pipe S-40',
                'unit' => 'pcs',
                'quantity' => 7,
                'unit_cost' => 1100,
                'cost' => 7700,
            ],
            [
                'project' => 1,
                'material' => '2 x 6m G.I. Pipe S-40',
                'unit' => 'pcs',
                'quantity' => 2,
                'unit_cost' => 1620,
                'cost' => 3240,
            ],
            [
                'project' => 1,
                'material' => '1/4 x 2 x 6m Flat Bar',
                'unit' => 'pcs',
                'quantity' => 6,
                'unit_cost' => 420,
                'cost' => 2520,
            ],
            [
                'project' => 1,
                'material' => '5/8 x 6 Anchor Bolt',
                'unit' => 'pcs',
                'quantity' => 60,
                'unit_cost' => 65,
                'cost' => 3900,
            ],
            [
                'project' => 1,
                'material' => 'Hacksaw Blade',
                'unit' => 'pcs',
                'quantity' => 10,
                'unit_cost' => 120,
                'cost' => 1200,
            ],
            [
                'project' => 1,
                'material' => 'Welding Rod',
                'unit' => 'pcs',
                'quantity' => 50,
                'unit_cost' => 125,
                'cost' => 6250,
            ],
        ];
        //Cement and Plaster Works
        $cementPlaster = [
            [
                'project' => 1,
                'material' => 'Portland Cement 40kg',
                'unit' => 'bags',
                'quantity' => 35,
                'unit_cost' => 290,
                'cost' => 10179,
            ],
            [
                'project' => 1,
                'material' => 'Sand',
                'unit' => 'cu.m',
                'quantity' => 3,
                'unit_cost' => 1200,
                'cost' => 3510,
            ],
        ];
        //Equipment

        $eqipment = [
            [
                'project' => 1 ,
                'equipment' => 'Bagger Mixer',
                'quantity' => 1,
                'no_of_days' => 7,
                'rate' => 1500,
                'cost' => 10500,
            ],
            [
                'project' => 1 ,
                'equipment' => 'Drilling Tools',
                'quantity' => 1,
                'no_of_days' => 2,
                'rate' => 1500,
                'cost' => 3000,
            ],
            [
                'project' => 1 ,
                'equipment' => 'Welding Tools',
                'quantity' => 1,
                'no_of_days' => 7,
                'rate' => 1500,
                'cost' => 10500,
            ],
        ];

        Excavation::insertOrIgnore($excavation);
        Concrete::insertOrIgnore($concrete);
        Water::insertOrIgnore($water);
        Metal::insertOrIgnore($metal);
        PlasterFinish::insertOrIgnore($cementPlaster);
        Equipment::insertOrIgnore($eqipment);
    }
}
