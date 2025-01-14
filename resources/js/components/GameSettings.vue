<template>
<form action="/game" method="POST" class="game-settings">
  <fieldset class='settings-form'>
    <label for="length">Length</label>
    <input class="length" name="length" type="number" min="1" max="15" required value=4>

    <label for="characters">Characters</label>
    <select name="characters" id="characters">
        <option value="numeric">numeric</option>
        <option value="alpha">alpha</option>
        <option value="alphanumeric">alphanumeric</option>
      </select>

    <label for="time">time</label>
    <input class="time" name="time" type="number" min="0.1" max="10" step="any" required value=2>

    <label for="time">time</label>
    <input type="number" class="input-delay" name="input_delay" min="0.1" max="10" step="any" required value=1>

    <button class="start"> Start Game </button>
  </fieldset>
</form>






    <!-- <form action="">
        <fieldset>
    
        </fieldset>
    </form> -->
    <!-- <div>
        <h1>{{ message }}</h1>
    </div> -->
</template>



<script>
export default {
    data() {
        return {
            message: 'Hello Vue 3 + Laravel!'
        }
    }
}
</script>


<style scoped>
.memory-game {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
}

.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 20px;
}

.card-content {
    padding: 24px;
}

.header {
    text-align: center;
    margin-bottom: 24px;
}

.header h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
}

.challenge-string {
    font-family: monospace;
    font-size: 32px;
    letter-spacing: 0.2em;
    text-align: center;
    margin: 32px 0;
}

button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    margin: 8px 0;
}

button:hover {
    background-color: #45a049;
}

input {
    width: 100%;
    padding: 12px;
    font-size: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    margin: 16px 0;
    border: 2px solid #ddd;
    border-radius: 4px;
}

.alert {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 12px;
    margin-top: 16px;
    text-align: center;
}

.ready-state,
.showing-state,
.testing-state,
.complete-state {
    text-align: center;
}
</style>