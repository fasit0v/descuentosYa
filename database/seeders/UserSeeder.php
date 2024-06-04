<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("users")->insert([
            [
            "id"=>1,
            "name"=>"Ariel Alejandro Ayala",
            "email"=> "ariel170802@gmail.com",
            "password" => Hash::make("ariel123")
            ],[
            "id"=>2,
            "name"=>"Santiago Ivan Handel",
            "email"=> "santiago@gmail.com",
            "password" => Hash::make("santiago123")
            ],[
            "id"=>3,
            "name"=>"Fabricio Valdez",
            "email"=> "fabricio@gmail.com",
            "password" => Hash::make("fabricio123")
            ],
    ]);
    }
}
