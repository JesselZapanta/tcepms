<?php

namespace Database\Seeders;

use App\Models\Fund;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FundSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $funds = [
            [
                'name' => 'LGU Infrastructure Fund',
                'status' => 1,
            ],
            [
                'name' => 'DPWH Infrastructure Fund',
                'status' => 1,
            ],
            [
                'name' => 'Provincial Government Infrastructure Fund',
                'status' => 1,
            ],
            [
                'name' => 'General Appropriations Act (GAA)',
                'status' => 1,
            ],
            [
                'name' => 'Foreign Assisted Project Fund',
                'status' => 1,
            ],
        ];

        Fund::insertOrIgnore($funds);
    }
}
