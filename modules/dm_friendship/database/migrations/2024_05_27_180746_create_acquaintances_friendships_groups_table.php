<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Class CreateFriendshipsGroupsTable
 */
class CreateAcquaintancesFriendshipsGroupsTable extends Migration
{

    public function up(): void
    {

        Schema::create(config('acquaintances.tables.friendship_groups'), function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('friendship_id')->unsigned();
            $table->morphs('friend');
            $table->integer('group_id')->unsigned();

            $table->foreign('friendship_id')
                  ->references('id')
                  ->on(config('acquaintances.tables.friendships'))
                  ->onDelete('cascade');

            $table->unique(['friendship_id', 'friend_id', 'friend_type', 'group_id'], 'unique');

        });

    }

    public function down(): void
    {
        Schema::dropIfExists(config('acquaintances.tables.friendship_groups'));
    }

}
