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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('body');
            $table->integer('vote')->default(0);
            $table->enum('post_status', ['public' ,'private'])->default('public');

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')
                  ->cascadeOnUpdate()
                  ->restrictOnDelete();

            $table->unsignedBigInteger('board_id');
            $table->foreign('board_id')->references('id')->on('boards')
                  ->cascadeOnUpdate()
                  ->restrictOnDelete();

            // $table->unsignedBigInteger('status_id');
            // $table->foreign('status_id')->references('id')->on('statuses')
            //       ->nullOnDelete();
                //   ->cascadeOnUpdate()
                //   ->restrictOnDelete();
            $table->foreignId('status_id')->nullable()->constrained('statuses')->nullOnDelete();

            $table->unsignedBigInteger('created_by')->index();
            $table->foreign('created_by')->references('id')->on('users')
                  ->cascadeOnDelete();
                  
            $table->enum('post_approval', ['approved', 'pendding', 'reject'])->default('pendding');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
