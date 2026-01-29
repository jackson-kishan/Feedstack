<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DefaultUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = User::create([
          'name' => 'Super Admin',
          'email' => 'superadmin@example.com',
          'password' => Hash::make('super'),
        ]);
        $superAdmin->assignRole('Super Admin');

        $admin = User::create([
          'name' => 'admin',
           'email' => 'admin@example.com',
           'password' => Hash::make('admin'),
        ]);
        $admin->assignRole('Admin');

        $contributor = User::create([
           'name' => 'contributor',
           'email' => 'contributor@example.com',
           'password' => Hash::make('contributor'),
        ]);
        $contributor->assignRole('Contributor');

        $viewer = User::create([
            'name' => 'viewer',
            'email' => 'viewer@example.com',
            'password' => Hash::make('viewer'),
         ]);
         $viewer->assignRole('Viewer');
    }


}
