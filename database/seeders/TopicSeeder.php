<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $topics = [
          ['name' => 'Welcome', 'user_id' => 1, 'board_id' => 1],
          ['name' => 'Feature request', 'user_id' => 1, 'board_id' => 1],
          ['name' => 'Bug', 'user_id' => 1, 'board_id' => 1],
          ['name' => 'Integration', 'user_id' => 1, 'board_id' => 1],
        ];

        foreach($topics as $topic){
            Topic::create($topic);
        }
    }
}
