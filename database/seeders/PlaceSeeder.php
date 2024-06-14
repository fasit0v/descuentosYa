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
                "placeName" => "farmacity",
                "placeAddress" => "Moreno 806, P3600 OCZ, Formosa",
                "placeCategory_id" => 1,
                "placeLatitude" => "-26.18323613493807",
                "placeLongitude" => "-58.16716395524154",
                "placeImage" => "https://lh5.googleusercontent.com/p/AF1QipNPL4nGk403C-Uaq8DtlVgjdWmtkGY6w0yPCABn=w426-h240-k-no"
            ],
            [
                "placeName" => "Carrefour",
                "placeAddress" => "Av. Dr. Luis Gutniski 2040, P3600 Formosa",
                "placeCategory_id" => 2,
                "placeLatitude" => "-26.19014154341129",
                "placeLongitude" => "-58.187465147096255",
                "placeImage" => "https://lh5.googleusercontent.com/p/AF1QipOJoU6xgrnKkj-g1f-XQ823W84vH2v7vqCUUnby=w408-h306-k-no"
            ],
            [
                "placeName" => "Cafe Martinez",
                "placeAddress" => "Av. 25 de Mayo 717, P3600 Formosa",
                "placeCategory_id" => 3,
                "placeLatitude" => "-26.183891740015998",
                "placeLongitude" => "-58.172034125058694",
                "placeImage" => "https://lh5.googleusercontent.com/p/AF1QipP-sxdSecAPx1EtVfuVd7rOOkkWHgn0MeBhdHGq=w408-h306-k-no"
            ],
            [
                "placeName" => "Otto Repuestos",
                "placeAddress" => "Av. Dr. Luis Gutniski 3236, P3600 Formosa",
                "placeCategory_id" => 4,
                "placeLatitude" => "-26.19282606010153",
                "placeLongitude" => "-58.19915662171732",
                "placeImage" => "https://lh5.googleusercontent.com/p/AF1QipParDOIdhM7Jx8sXVqwjX8o2wyp329Dn1c19her=w426-h240-k-no"
            ],
            [
                "placeName" => "Cremolati",
                "placeAddress" => "Saavedra 1099, P3600 Formosa",
                "placeCategory_id" => 5,
                "placeLatitude" => "-26.1838532178048",
                "placeLongitude" => "-58.17851100001839",
                "placeImage" => "https://lh5.googleusercontent.com/p/AF1QipMYy6hCqUfQ7uWxqZpC5MrDuPNzaGzV1AMgEfC3=w408-h306-k-no"
            ],
            [
                "placeName" => "Carrefour Peatonal",
                "placeAddress" => "España 198, P3600 Formosa",
                "placeCategory_id" => 6,
                "placeLatitude" => "-26.181160361528992",
                "placeLongitude" => "-58.16653203571675",
                "placeImage" => "https://neahoy.com/wp-content/uploads/2022/11/1-1-1.png"
            ],
            [
                "placeName" => "Cerveceria Tatane",
                "placeAddress" => "Salta 106 Este, P3600 Formosa",
                "placeCategory_id" => 3,
                "placeLatitude" => "-26.18663856467545",
                "placeLongitude" => "-58.16065028516711",
                "placeImage" => "https://lh5.googleusercontent.com/p/AF1QipPQWDz5vCOF9os1rnNZ1irsnzC-SLOJYUdS4Yx2=w408-h306-k-no"
            ],
            [
                "placeName" => "Hiper Caceres",
                "placeAddress" => "Av. Independencia, P3600 Formosa",
                "placeCategory_id" => 6,
                "placeLatitude" => "-26.168612985415148",
                "placeLongitude" => "-58.17962088409146",
                "placeImage" => "https://lh5.googleusercontent.com/p/AF1QipOtrSAcKsFLbF3YoL6KY2XHpCOLupokGUm79TrF=w408-h544-k-no"
            ],
            [
                "placeName" => "Casapan Italia",
                "placeAddress" => "Av. Italia 1716, P3600 Formosa",
                "placeCategory_id" => 7,
                "placeLatitude" => "-26.17114584043034",
                "placeLongitude" => "-58.19078811276434",
                "placeImage" => "https://lh5.googleusercontent.com/p/AF1QipMz5G2AIOi03X9wA_gM6EUVX_Mw3K4Yq58Dsu_Y=w408-h725-k-no"
            ]
        ]);
    }
}
