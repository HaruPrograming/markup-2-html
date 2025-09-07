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
        Schema::create('convert_markdown_html', function (Blueprint $table) {
            $table->id();
            $table->text('regex');    // Markdownテキストを保存
            $table->text('replace');        // HTMLテキストを保存
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('convert_markdown_html');
    }
};
