<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts_spa_l', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("claps")->default(0);
            $table->string('contents', 1000)->default("");
            $table->bigInteger("user_id")->unsigned();
            $table->string("tags", 255)->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts_spa_l');
    }
}
