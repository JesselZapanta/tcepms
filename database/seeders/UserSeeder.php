<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 0 = admin, 1 = staff 1, 2 = staff 2, 3 = on-site engineer, 4 = mayor
        $users = [
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszapanta9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Staff 1',
                'email' => 'staffone@gmail.com',
                'contact' => '09786543212',
                'role' => '1',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('staffone'),
            ],
            [
                'name' => 'Staff 2',
                'email' => 'stafftwo@gmail.com',
                'contact' => '09786543212',
                'role' => '2',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('stafftwo'),
            ],
            [
                'name' => 'Engineer 1',
                'email' => 'engineer1@gmail.com',
                'contact' => '09786543212',
                'role' => '3',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('engineer1'),
            ],
            [
                'name' => 'Engineer 2',
                'email' => 'engineer2@gmail.com',
                'contact' => '09786543212',
                'role' => '3',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('engineer2'),
            ],
            [
                'name' => 'Engineer 3',
                'email' => 'engineer3@gmail.com',
                'contact' => '09786543212',
                'role' => '3',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('engineer3'),
            ],
            [
                'name' => 'City Mayor',
                'email' => 'mayor@gmail.com',
                'contact' => '09786543212',
                'role' => '4',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('mayor'),
            ],
        ];

        User::insertOrIgnore($users);
    }
}
