<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'create user',
            'edit user',
            'delete user',
            'view user',
            'create board',
            'edit board',
            'delete board',
            'view board',
            'create task',
            'edit task',
            'delete task',
            'view task',
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
            'create post',
            'edit post',
            'delete post',
            'view post',
            'approved post',
            'approved comment',
            'reject post',
            'reject comment',
            

        ];

        foreach ($permissions as $permission){
            Permission::create(['name' => $permission]);
        }
    }
}
