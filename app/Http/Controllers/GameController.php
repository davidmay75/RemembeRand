<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function index(Request $request) {
        $input = $request->validate([
            'time' => 'numeric|required|max:255',
            'characters' => 'string|required',
            'time' => 'numeric|required',
            'input_delay' => 'numeric|required',
        ]);

        $input['question'] = 'abc123';//generate

        return view('game', $input);
    }

    public function answer(Request $request) {
        try {
            $input = $request->validate([
                'question' => 'string|required',
                'answer' => 'string|required',
            ]);
    
            $response = [
                'result' => 'correct!'
                // 'result' => ($input['question'] == $input['answer'])
            ];
    
            return view('result', $response);

        } catch (\Exception $ex) {
            dd('answer', $ex);
        } 
    }
}
