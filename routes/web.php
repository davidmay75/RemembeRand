<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});

Route::post('/game', [GameController::class, 'index']);
Route::post('/game/answer', [GameController::class, 'answer']);


