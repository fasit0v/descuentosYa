<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('places', function (Blueprint $table) {
            $table->id();
            $table->string("placeName", 256);
            $table->string("placeDescription", 256)->nullable();
            $table->string("placeAddress", 256);
            $table->binary("placeImage")->nullable();
            $table->string("placeLongitude", 20); // Cambio a cadena de texto
            $table->string("placeLatitude", 20);  // Cambio a cadena de texto
            $table->string("placeCategory", 20);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('places');
    }
};
