<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("places")->insert([
            [
                "placeName"=>"farmacity", 
                "placeAddress"=>"Moreno 806, P3600 OCZ, Formosa", 
                "placeCategory_id"=> 1, 
                "placeLatitude"=> "-26.18323613493807", 
                "placeLongitude"=>"-58.16716395524154",
                "placeImage"=> file_get_contents("https://lh5.googleusercontent.com/p/AF1QipNPL4nGk403C-Uaq8DtlVgjdWmtkGY6w0yPCABn=w426-h240-k-no")
            ],
            [
                "placeName"=>"Carrefour", 
                "placeAddress"=>"Av. Dr. Luis Gutniski 2040, P3600 Formosa", 
                "placeCategory_id"=> 2, 
                "placeLatitude"=> "-26.19014154341129", 
                "placeLongitude"=>"-58.187465147096255",
                "placeImage"=> file_get_contents("https://lh5.googleusercontent.com/p/AF1QipOJoU6xgrnKkj-g1f-XQ823W84vH2v7vqCUUnby=w408-h306-k-no")
            ]
        ]);
    }
}
