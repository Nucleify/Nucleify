<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAcquaintancesFriendshipTable extends Migration
{

    public function up(): void
    {

        Schema::create(config('acquaintances.tables.friendships'), function (Blueprint $table) {
            $table->id();
            $table->morphs('sender');
            $table->morphs('recipient');
            $table->string('status')->default('pending')->comment('pending/accepted/denied/blocked/');
            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists(config('acquaintances.tables.friendships'));
    }

}
