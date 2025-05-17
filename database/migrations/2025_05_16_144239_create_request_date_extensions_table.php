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
        Schema::create('request_date_extensions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project')->constrained('projects')->onDelete('cascade');
            $table->string('requested_by');
            
            $table->string('current_end_date')->nullable();
            $table->string('requested_end_date')->nullable();

            $table->text('reason');
            $table->string('requested_at')->nullable();
            
            $table->text('remarks')->nullable();
            $table->tinyInteger('status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('request_date_extensions');
    }
};
