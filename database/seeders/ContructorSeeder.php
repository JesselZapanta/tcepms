<?php

namespace Database\Seeders;

use App\Models\Contructor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContructorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contructors = [
            [
                'company_name' => 'Company 1',
                'description' => 'Company 1 Description',
                'contact' => '09876543212',
                'address' => 'Tangub City',
                'status' => '1',
            ],
            [
                'company_name' => 'Company 2',
                'description' => 'Company 2 Description',
                'contact' => '09876543222',
                'address' => 'Tangub City',
                'status' => '1',
            ],
            [
                'company_name' => 'Company 3',
                'description' => 'Company 3 Description',
                'contact' => '09876543232',
                'address' => 'Tangub City',
                'status' => '1',
            ],
            [
                'company_name' => 'Company 4',
                'description' => 'Company 4 Description',
                'contact' => '09876543242',
                'address' => 'Tangub City',
                'status' => '1',
            ],
        ];

        Contructor::insertOrIgnore($contructors);
    }
}
