<layouts.app>
    <div class="game-container">
        <form action="/game/answer" method="POST">
            @csrf
            {{-- <p name="question">{{$question}}</p> --}}
            <input type="text" name="question" value={{$question}}>
            <input type="text" name="answer" class="answer">

            <button>Submit</button>
        </form>
    </div>
</layouts.app>