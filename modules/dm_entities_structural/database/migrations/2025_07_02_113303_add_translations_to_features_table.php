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
        DB::statement('ALTER TABLE features MODIFY header JSON NOT NULL');
        DB::statement('ALTER TABLE features MODIFY description JSON NOT NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE features MODIFY header VARCHAR(255) NOT NULL');
        DB::statement('ALTER TABLE features MODIFY description VARCHAR(255) NOT NULL');
    }
};
