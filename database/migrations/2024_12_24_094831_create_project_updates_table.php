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
        Schema::create('project_updates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project')->constrained('projects')->onDelete('cascade');
            $table->foreignId('engineer')->constrained('users')->onDelete('cascade');
            $table->string('name');//change to title
            $table->text('description');//change to remarks
            $table->integer('excavation_progress')->default(0);
            $table->integer('concrete_works_progress')->default(0);
            $table->integer('water_works_progress')->default(0);
            $table->integer('metal_works_progress')->default(0);
            $table->integer('cement_plaster_and_finishes_progress')->default(0);
            $table->string('update_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_updates');
    }
};
