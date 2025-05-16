<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            // Roads
            [
                'name' => 'Barangay Roads',
                'status' => 1,
            ],
            [
                'name' => 'Municipal Roads',
                'status' => 1,
            ],
            [
                'name' => 'Provincial Roads',
                'status' => 1,
            ],
            [
                'name' => 'Highway Roads',
                'status' => 1,
            ],
            [
                'name' => 'Roads',
                'status' => 1,
            ],
            [
                'name' => 'Bridges',
                'status' => 1,
            ],
            [
                'name' => 'Public Buildings',
                'status' => 1,
            ],
            [
                'name' => 'Water Systems',
                'status' => 1,
            ],
            [
                'name' => 'Drainage and Flood Control',
                'status' => 1,
            ],
            [
                'name' => 'Parks and Open Spaces',
                'status' => 1,
            ],
            [
                'name' => 'Street Lighting',
                'status' => 1,
            ],
            [
                'name' => 'Waste Management Facilities',
                'status' => 1,
            ],
        ];
        

        Category::insertOrIgnore($categories);
    }
}
