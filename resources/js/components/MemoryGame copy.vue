<!-- MemoryGame.vue -->
<script setup>
import { ref, computed } from 'vue'

const gameState = ref('ready') // ready, showing, testing, complete
const userInput = ref('')
const feedback = ref('')
const score = ref(0)
const challengeHash = ref('')
const displayString = ref('')

// Generate a random string of specified length
const generateChallenge = (length = 6) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    return Array.from(
        { length },
        () => chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('')
}

// Simple hash function (for demo purposes - could use more secure hashing in production)
const hashString = (str) => {
    return str.split('').reduce((hash, char) => {
        return ((hash << 5) - hash) + char.charCodeAt(0) | 0
    }, 0).toString()
}

const startChallenge = () => {
    const newChallenge = generateChallenge()
    displayString.value = newChallenge
    challengeHash.value = hashString(newChallenge)
    gameState.value = 'showing'
    feedback.value = ''
    userInput.value = ''

    // Hide the string after 3 seconds
    setTimeout(() => {
        displayString.value = ''
        gameState.value = 'testing'
    }, 3000)
}

const checkAnswer = () => {
    const isCorrect = hashString(userInput.value.toUpperCase()) === challengeHash.value
    feedback.value = isCorrect ? 'Correct!' : 'Wrong answer, try again!'
    if (isCorrect) {
        score.value++
        gameState.value = 'complete'
    }
}
</script>

<template>
    <div class="memory-game">
        <div class="card">
            <div class="card-content">
                <div class="header">
                    <h2>Memory Challenge</h2>
                    <p>Current Score: {{ score }}</p>
                </div>

                <!-- Ready State -->
                <div v-if="gameState === 'ready'" class="ready-state">
                    <p>Ready to test your memory? You'll see a string for 3 seconds.</p>
                    <button @click="startChallenge">Start Challenge</button>
                </div>

                <!-- Showing State -->
                <div v-if="gameState === 'showing'" class="showing-state">
                    <div class="challenge-string">{{ displayString }}</div>
                    <p>Memorize this string!</p>
                </div>

                <!-- Testing State -->
                <div v-if="gameState === 'testing'" class="testing-state">
                    <p>What was the string?</p>
                    <input v-model="userInput" type="text" maxlength="6" @keyup.enter="checkAnswer">
                    <button @click="checkAnswer">Check Answer</button>
                </div>

                <!-- Complete State -->
                <div v-if="gameState === 'complete'" class="complete-state">
                    <div class="alert">{{ feedback }}</div>
                    <button @click="startChallenge">Next Challenge</button>
                </div>

                <!-- Feedback (when not complete) -->
                <div v-if="feedback && gameState !== 'complete'" class="alert">
                    {{ feedback }}
                </div>
            </div>
        </div>
    </div>
</template>

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