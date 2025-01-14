<?php

// use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('game');
});

Route::get('/coming-soon', function () {
    return view('coming-soon');
});

// Route::get('/play', function () {
//     return view('play');
// });


// Route::post('/game', [GameController::class, 'index']);
// Route::post('/game/answer', [GameController::class, 'answer']);


