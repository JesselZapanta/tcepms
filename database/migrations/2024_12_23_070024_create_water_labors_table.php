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
        Schema::create('water_labors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project')->constrained('projects')->onDelete('cascade');
            $table->string('position');
            $table->integer('quantity');
            $table->integer('no_of_days');
            $table->decimal('rate', 15, 2);
            $table->decimal('cost', 15, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('water_labors');
    }
};
