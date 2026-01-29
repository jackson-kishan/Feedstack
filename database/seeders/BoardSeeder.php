<?php

namespace Database\Seeders;

use App\Models\Board;
use Illuminate\Database\Seeder;

class BoardSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $boards = [
            ['name' => 'Spotlight',  'slug' => 'spotlight', 'user_id' => 2 ],
            ['name' => 'Adminify',  'slug' => 'adminify', 'user_id' => 2 ],
        ];

        foreach( $boards as $board){
          Board::create($board);
        }
    }
}
