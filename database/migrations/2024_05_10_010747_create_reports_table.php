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
        Schema::create('reports', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("discount_id");
            $table->string("reportDescription");
            $table->string("reportImage")->nullable();
            $table->timestamp("reportCreateAt");
            $table->enum("reportState",["pendiente","analizada"]);
            $table->enum("reportCause",["fraude", "ofensivo", "incorrecto"]);

            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("discount_id")->references("id")->on("discounts")->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reports');
    }
};
