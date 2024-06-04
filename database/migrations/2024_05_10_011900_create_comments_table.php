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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("discount_id");
            $table->string("commentDescription");
            $table->binary("commentImage")->nullable();
            $table->timestamp("commentCreateAt");

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
        Schema::dropIfExists('comments');
    }
};
