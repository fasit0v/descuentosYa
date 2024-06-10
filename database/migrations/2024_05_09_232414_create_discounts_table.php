<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

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
            $table->string("discountName");
            $table->string("discountDescription")->nullable();
            $table->string("discountImage")->nullable();
            $table->timestamp("discountCreatedAt")->useCurrent();
            $table->timestamp("discountUpdatedAt")->useCurrentOnUpdate()->nullable();
            $table->timestamp("discountEndsAt")->nullable();
            $table->unsignedBigInteger("user_id");
            $table->unsignedBigInteger("place_id");

            $table->foreign("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreign("place_id")->references("id")->on("places")->onDelete("cascade");
        });

        // Add the trigger to set default value for discountEndsAt
        DB::unprepared('
            CREATE TRIGGER set_default_discount_ends_at
            BEFORE INSERT ON discounts
            FOR EACH ROW
            BEGIN
                IF NEW.discountEndsAt IS NULL THEN
                    SET NEW.discountEndsAt = NOW() + INTERVAL 1 DAY;
                END IF;
            END
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop the trigger first
        DB::unprepared('DROP TRIGGER IF EXISTS set_default_discount_ends_at');

        // Drop the table
        Schema::dropIfExists('discounts');
    }
};
