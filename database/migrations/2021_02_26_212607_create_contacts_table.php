<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('object_id');
            $table->string('uuid');
            $table->string('status');
            $table->integer('name');
            $table->string('ground');
            $table->string('satellite');
            $table->string('equipment');
            $table->string('state');
            $table->string('step');
            $table->string('detail');
            $table->timestamp('begin_at');
            $table->timestamp('end_at');
            $table->decimal('lng', 10, 7);
            $table->decimal('lat', 10, 7);
            $table->decimal('azimuth', 10, 7);
            $table->decimal('elevation', 10, 7);
            $table->string('resolution');
            $table->string('resolution_status');
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
        Schema::dropIfExists('contacts');
    }
}
