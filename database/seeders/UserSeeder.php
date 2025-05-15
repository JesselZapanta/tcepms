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
                'name' => 'Jay Matin-ao',
                'email' => 'jaymatinao@gmail.com',
                'contact' => '+639380012055',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jaymatinao'),
            ],
            [
                'name' => 'Nicole Galvez',
                'email' => 'nicolegalvez@gmail.com',
                'contact' => '+639380012055',
                'role' => '1',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('nicolegalvez'),
            ],
            [
                'name' => 'Vangie Bantilan',
                'email' => 'vangiebantilan@gmail.com',
                'contact' => '+639380012055',
                'role' => '2',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('vangiebantilan'),
            ],
            [
                'name' => 'Engr. Erwin Lacpao',
                'email' => 'erwinlacpao@gmail.com',
                'contact' => '+639380012055',
                'role' => '3',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('erwinlacpao'),
            ],
            [
                'name' => 'Engr. Andrey Tuastomban',
                'email' => 'andreytuastomban@gmail.com',
                'contact' => '+639380012055',
                'role' => '3',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('andreytuastomban'),
            ],
            [
                'name' => 'Engr. Sofia Garcia',
                'email' => 'sofiagarcia@gmail.com',
                'contact' => '+639380012055',
                'role' => '3',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('sofiagarcia'),
            ],
            [
                'name' => 'Sabiniano "Ben" S. Canama',
                'email' => 'bencanama@gmail.com',
                'contact' => '+639380012055',
                'role' => '4',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('bencanama'),
            ],
        ];

        User::insertOrIgnore($users);
    }
}
