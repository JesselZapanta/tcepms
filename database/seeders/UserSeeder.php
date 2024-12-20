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
                'name' => 'Jessel Zapatna',
                'email' => 'jeszaagaspanta9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszapantdsasa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszapanstdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jesfzapantdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszapantdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszgasdsadadapantdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszgadsdsaapantdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszagadapantdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszgacsgfapantdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jessadzapantdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszadsapantdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszapanfasatdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
            [
                'name' => 'Jessel Zapatna',
                'email' => 'jeszapantfasdsa9@gmail.com',
                'contact' => '09300192172',
                'role' => '0',
                'status' => '1',
                'email_verified_at' => now(),
                'password' => Hash::make('jeszapanta9'),
            ],
        ];

        User::insertOrIgnore($users);
    }
}
