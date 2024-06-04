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
        Schema::create('discounts', function (Blueprint $table) {
            $table->id();
            $table->timestamp("discountCreateAt");
            $table->string("discountName");
            $table->string("discountDescription")->nullable();
            $table->binary("discountImage")->nullable();
            $table->dateTime("discountEndsAt");
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("place_id");

            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("place_id")->references("id")->on("places")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('discounts');
    }
};
