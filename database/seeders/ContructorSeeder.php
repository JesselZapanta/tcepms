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
                'company_name' => 'Bob\'s Construction Supply',
                'description' => 'A hardware store providing quality construction products for over 30 years in Tangub City.',
                'contact' => '',
                'address' => '3P7X+98F, Tangub City, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'RN Builders',
                'description' => 'Offers construction supplies and services in Tangub City.',
                'contact' => '',
                'address' => '3P7W+HCV, Labuyo-Tangub-Silaya Rd, Tangub City, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'Seclot Enterprises',
                'description' => 'Sells paints, electrical, plumbing, and construction supplies in Tangub City.',
                'contact' => '',
                'address' => 'Brgy. III, Tangub City, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'Ritche-Nathalie Development Corp.',
                'description' => 'A construction company involved in various projects, including the Misamis Occidental Provisional Hospital.',
                'contact' => '',
                'address' => '2nd Street, Barangay III, Tangub City, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'Henry S. Oaminal Construction and General Merchandise',
                'description' => 'Construction and general merchandise company located at Oaminal Compound Circumferential Road, Lam-An, Ozamis City.',
                'contact' => '',  // No contact info available
                'address' => 'HSO Building, Circumferential Road, Oaminal Compound, Lam-an, Ozamiz City, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'Animas Bros Construction',
                'description' => 'Provides construction equipment and materials supply, located in Poblacion, Sapang Dalaga.',
                'contact' => '',
                'address' => 'Poblacion, Sapang Dalaga, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'Grace Construction Corporation',
                'description' => 'Established in 1977, specializes in highway, street, and bridge construction, based in Bernad Subdivision, Los Aguadas.',
                'contact' => '',
                'address' => '5R2W+V8R, Ozamiz City, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => "3R's Builders and Resources",
                'description' => 'Engages in general building construction, located along the National Highway in Barangay Nailon.',
                'contact' => '',
                'address' => 'Purok Camanse 2, Sinacaban, 7203 Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'EM Design Construction & Gen. Mdse',
                'description' => 'Provides construction services and general merchandise.',
                'contact' => '+63 919 078 3376',
                'address' => '50th, 14-F Don Gallardo Street, Brgy, Ozamiz City, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'RMDEE Construction Supply',
                'description' => 'Supplies construction materials and general merchandise, located along Mobod highway.',
                'contact' => '',
                'address' => '4RXX+HRV, Ozamiz City, Misamis Occidental, Philippines',
                'status' => '1',
            ],
            [
                'company_name' => 'Junjing Construction',
                'description' => 'A construction and development company based in Bonifacio.',
                'contact' => '',
                'address' => '38 JP Rizal Avenue, Ozamiz City, 7200 Misamis Occidental, Philippines',
                'status' => '1',
            ],
        ];


        Contructor::insertOrIgnore($contructors);
    }
}
