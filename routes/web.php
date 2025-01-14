<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('index');
});
Route::get('/play', function () {
    return view('play');
});
Route::get('/vue', function () {
    // dd(123);
    return view('vue');
});

Route::post('/game', [GameController::class, 'index']);
Route::post('/game/answer', [GameController::class, 'answer']);


