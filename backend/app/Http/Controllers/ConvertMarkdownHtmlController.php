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

    public function create(Request $request)
    {
        $item = ConvertMarkdownHtml::create($request->only(['regex', 'replace']));
        return response()->json($item, 201);
    }

    // データ更新
    public function update(Request $request, $id)
    {
        $item = ConvertMarkdownHtml::find($id);

        if (!$item) {
            return response()->json(['message' => 'Item not found'], 404);
        }

        // 更新対象のカラムを限定
        $item->update($request->only(['regex', 'replace']));

        return response()->json($item);
    }
}
