<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlaceCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("place_categories")->insert([
            ["placeCategoryName"=>"Farmacia"],
            ["placeCategoryName"=>"HiperMercado"]
        ]);
    }
}
