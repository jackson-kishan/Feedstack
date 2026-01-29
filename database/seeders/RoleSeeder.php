<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => "Super Admin"]);
        $admin = Role::create(['name' => "Admin"]);
        $contributor = Role::create(['name' => "Contributor"]);
        $viewer = Role::create(['name' => "Viewer"]);

        $admin->givePermissionTo([
           'create user',
            'edit user',
            'delete user',
            'view user',
            'create board',
            'edit board',
            'delete board',
            'view board',
            'create post',
            'edit post',
            'delete post',
            'view post',
            'create comment',
            'edit comment',
            'delete comment',
            'view comment',
            'create team',
            'edit team',
            'delete team',
            'view team',
            'create role',
            'edit role',
            'delete role',
            'view role',
            'create permission',
            'edit permission',
            'delete permission',
            'view permission',
            'approved post',
            'approved comment',
            'reject post',
            'reject comment',
        ]);

        $contributor->givePermissionTo([
            'view board',
            'create post',
            'edit post',
            'delete post',
            'view post',
            'create comment',
            'edit comment',
            'delete comment',
            'view comment',
            'approved post',
            'approved comment',
            'reject post',
            'reject comment',
            'view role',
        ]);

        $viewer->givePermissionTo([
            'view board',
            'view post',
            'create post',
            'edit post',
            'delete post',
            'view post',
            'create comment',
            'edit comment',
            'delete comment',
            'view comment',
        ]);
    }
}
