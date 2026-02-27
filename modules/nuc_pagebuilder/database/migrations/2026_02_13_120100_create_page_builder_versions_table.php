<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('page_builder_versions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('page_id')
                ->constrained('page_builder_pages')
                ->cascadeOnDelete();
            $table->unsignedInteger('version');
            $table->json('layout_json');
            $table->string('checksum', 64);
            $table->boolean('is_published')->default(false);
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['page_id', 'version']);
        });

        Schema::table('page_builder_pages', function (Blueprint $table): void {
            $table->foreign('published_version_id')
                ->references('id')
                ->on('page_builder_versions')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('page_builder_pages', function (Blueprint $table): void {
            $table->dropForeign(['published_version_id']);
        });

        Schema::dropIfExists('page_builder_versions');
    }
};
