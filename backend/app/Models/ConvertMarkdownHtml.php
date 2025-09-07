<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConvertMarkdownHtml extends Model
{
  protected $table = 'convert_markdown_html';

  protected $fillable = [
    'regex',
    'replace',
  ];
}
