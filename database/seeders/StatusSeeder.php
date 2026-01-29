<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            ['name' => 'Under Review', 'color' => '#85b5b5', 'user_id' => 1, 'board_id' => 1, 'in_roadmap' => true],
            ['name' => 'Under Review', 'color' => '#85b5b5', 'user_id' => 2, 'board_id' => 1, 'in_roadmap' => true],
            ['name' => 'Under Review', 'color' => '#85b5b5', 'user_id' => 3, 'board_id' => 2, 'in_roadmap' => true],
            ['name' => 'Planned', 'color' => '#1fa0ff','user_id' => 1, 'board_id' => 1, 'in_roadmap' => true],
            ['name' => 'In Progress', 'color' => '#c17aff','user_id' => 1, 'board_id' => 1, 'in_roadmap' => true],
            ['name' => 'Complete', 'color' => '#6cd345','user_id' => 1, 'board_id' => 1, 'in_roadmap' => true],
            ['name' => 'Closed', 'color' => '#ed2b2b','user_id' => 1, 'board_id' => 1, 'in_roadmap' => false],
        ];

        foreach( $statuses as $status){
           Status::create($status);
        }
    }
}
