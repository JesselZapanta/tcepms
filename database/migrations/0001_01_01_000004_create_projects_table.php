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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');

            $table->string('start_date')->nullable();
            $table->string('end_date')->nullable();
            $table->string('actual_start_date')->nullable();
            $table->string('actual_end_date')->nullable();

            $table->decimal('budget', 15, 2);
            $table->decimal('cost', 15, 2)->nullable();
            $table->string('source')->nullable();

            $table->string('location');
            $table->string('latitude')->nullable();
            $table->string('longitude')->nullable();

            $table->foreignId('engineer')->constrained('users')->onDelete('cascade');
            $table->foreignId('contructor')->constrained('contructors')->onDelete('cascade');
            $table->tinyText('status')->default('Pending');
            $table->tinyText('priority');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
