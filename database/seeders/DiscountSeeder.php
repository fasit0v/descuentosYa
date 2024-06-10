<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiscountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("discounts")->insert([
            [
                "id"=>1,
                'user_id' => 1,
                'place_id' => 2,
                'discountName' => 'Descuentos en edulcorante',
                'discountDescription' => '2x1 en edulcorante hilerel',
                'discountImage' => "/storage/images/discounts/1_discountImage.webp", // Puedes establecer la imagen aquí si es necesario
                'discountEndsAt' => now()->endOfMonth(), // Indica que no hay una fecha de finalización específica
            ],
            [
                "id"=>2,
                'user_id' => 3,
                'place_id' => 2,
                'discountName' => 'Promoción 2x1',
                'discountDescription' => 'Hay promoción del 2x1 en 4 marcas distintas. Dura hasta el 9 de Junio. Lamentablemente, ya no hay papel higiénico, pero el resto de productos sí.',
                'discountImage' => null, // Puedes establecer la imagen aquí si es necesario
                'discountEndsAt' => null,
            ],
            [
                "id"=>3,
                'user_id' => 2,
                'place_id' => 2,
                'discountName' => 'Descuento en pack de Corona',
                'discountDescription' => 'Puedes llevar packs de Corona con un 35% de descuento.',
                'discountImage' => null, // Puedes establecer la imagen aquí si es necesario
                'discountEndsAt' => null, // Indica que no hay una fecha de finalización específica
            ],
            [
                "id"=>4,
                'user_id' => 2,
                'place_id' => 2,
                'discountName' => 'Descuentos en cafeteras y electrodomésticos',
                'discountDescription' => 'En todas las cafeteras, pavas eléctricas y electrodomésticos del estilo, los encuentras entre un 20 y 30% menos del precio original.',
                'discountImage' => null, // Puedes establecer la imagen aquí si es necesario
                'discountEndsAt' => null, // Indica que no hay una fecha de finalización específica
            ],
            
            [
                "id"=>5,
                'user_id' => 1,
                'place_id' => 1,
                'discountName' => 'Descuentos en edulcorante',
                'discountDescription' => '2x1 en edulcorante hilerel',
                'discountImage' => null, // Puedes establecer la imagen aquí si es necesario
                'discountEndsAt' => now()->endOfMonth(), // Indica que no hay una fecha de finalización específica
            ]
            

            
        ]);
    }
}
