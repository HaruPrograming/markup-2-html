<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConvertMarkdownHtmlController;

// 全件取得
Route::get('/markdown', [ConvertMarkdownHtmlController::class, 'index']);
