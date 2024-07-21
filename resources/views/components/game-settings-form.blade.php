<form action="/game" method="POST" class="game-settings">
  @csrf
    <label for="length">Length</label>
    <input class="length" name="length" type="number" min="1" max="15" required value=4>

    <label for="characters">Characters</label>
    <select name="characters" id="characters">
        <option value="numeric">numeric</option>
        <option value="alpha">alpha</option>
        <option value="alphanumeric">alphanumeric</option>
      </select>

    <label for="time">time</label>
    <input type="number" class="time" name="time" min="0.1" max="10" step="any" required value=2>

    <label for="time">time</label>
    <input type="number" class="input-delay" name="input_delay" min="0.1" max="10" step="any" required value=1>

    <button class="start"> Start Game </button>
</form>