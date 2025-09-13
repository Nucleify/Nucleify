<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('ALTER TABLE questions MODIFY content JSON NOT NULL');
        DB::statement('ALTER TABLE questions MODIFY answer JSON NOT NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE questions MODIFY content VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE questions MODIFY answer VARCHAR(255) NOT NULL');
    }
};
