<x-layout>
    <div class="game-container">
        <form action="/game/answer" method="POST" class="answer">
            @csrf
            {{-- <p name="question">{{$question}}</p> --}}
            <input type="text" name="question" value={{$question}}>
            <input type="text" name="answer">

            <button>Submit</button>
        </form>
    </div>
</x-layout>