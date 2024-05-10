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
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("role_id");
            $table->unsignedBigInteger("module_id");
            $table->boolean("canCreate");
            $table->boolean("canRead");
            $table->boolean("canUpdate");
            $table->boolean("canDelete");

            $table->foreign("role_id")->references("id")->on("roles")->onDelete("cascade");
            $table->foreign("module_id")->references("id")->on("modules")->onDelete("cascade");
        });


    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permissions');
    }
};
