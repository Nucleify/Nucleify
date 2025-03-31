<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->string('download')->nullable();
            $table->string('href');
            $table->string('src')->nullable();
            $table->string('icon')->nullable();
            $table->string('category');
            $table->string('hreflang')->nullable();
            $table->string('media')->nullable();
            $table->text('ping')->nullable();
            $table->string('referrerpolicy')->nullable();
            $table->string('rel')->nullable();
            $table->string('target')->nullable();
            $table->string('type')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
