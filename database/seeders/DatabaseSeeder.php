<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'User',
        //     'email' => 'test@example.com',
        //     'password' => bcrypt('12345678')
        // ]);
        $this->call([
            PermissionSeeder::class,
            RoleSeeder::class,
            DefaultUserSeeder::class,
            BoardSeeder::class,
            StatusSeeder::class,
            TopicSeeder::class
        ]);
    }
}
