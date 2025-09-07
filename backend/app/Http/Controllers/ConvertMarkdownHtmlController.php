<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ConvertMarkdownHtml;
use Illuminate\Http\Request;

class ConvertMarkdownHtmlController extends Controller
{
  // 全データ取得
  public function index()
  {
      $items = ConvertMarkdownHtml::all();
      return response()->json($items);
  }
}
