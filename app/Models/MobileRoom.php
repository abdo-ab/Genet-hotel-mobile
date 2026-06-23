<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;


#[Fillable([
    'uuid',
    'title',
    'description',
    'price',
    'image',
])]
class MobileRoom extends Model
{
    use HasUuids;
}
