<!-- MemoryGame.vue -->
<script setup>
import { ref, computed } from 'vue'

const gameState = ref('config') // config, ready, showing, testing, complete
const userInput = ref('')
const feedback = ref('')
const score = ref(0)
const challengeHash = ref('')
const displayString = ref('')
const answer = ref('')//temp

// Game configuration
const config = ref({
    useNumbers: true,
    useLetters: true,
    length: 6,
    displayTime: 3,
    delayTime: 0
})

// Computed property for the character pool
const characterPool = computed(() => {
    let pool = ''
    if (config.value.useNumbers) pool += '0123456789'
    if (config.value.useLetters) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    return pool
})

// Validation for configuration
const isValidConfig = computed(() => {
    return (config.value.useNumbers || config.value.useLetters) &&
        config.value.length >= 1 &&
        config.value.length <= 20 &&
        config.value.displayTime >= 1 &&
        config.value.displayTime <= 30
    config.value.delayTime >= 0 &&
        config.value.delayTime <= 120
})

// Generate a random string based on configuration
const generateChallenge = () => {
    const pool = characterPool.value
    if (!pool.length) return ''

    return Array.from(
        { length: config.value.length },
        () => pool.charAt(Math.floor(Math.random() * pool.length))
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
    answer.value = newChallenge
    challengeHash.value = hashString(newChallenge)

    gameState.value = 'showing'
    feedback.value = ''
    userInput.value = ''

    // Hide the string after configured displayTime
    setTimeout(() => {
        displayString.value = ''
        // gameState.value = 'testing'

        if (config.value.delayTime > 0) {
            gameState.value = 'delaying'

            setTimeout(() => {
                gameState.value = 'testing'
                console.log('resume')

            }, config.value.delayTime * 1000)
        } else {
            gameState.value = 'testing'
        }

    }, config.value.displayTime * 1000)
}

const checkAnswer = () => {
    const isCorrect = hashString(userInput.value.toUpperCase()) === challengeHash.value
    feedback.value = isCorrect ? 'Correct!' : 'Wrong answer, try again!'
    if (isCorrect) {
        score.value++
        gameState.value = 'complete'
    } else {
        gameState.value = 'failed'
    }
}

const resetGame = () => {
    gameState.value = 'config'
    score.value = 0
    feedback.value = ''
}

const startGame = () => {
    if (isValidConfig.value) {
        gameState.value = 'ready'
    }
}
</script>

<template>
    <div class="memory-game">
        <div class="card">
            <div class="card-content">
                <div class="header">
                    <!-- <h2>Memory Challenge</h2> -->
                    <template v-if="gameState !== 'config'">
                        <p>Current Score: {{ score }}</p>
                    </template>
                </div>

                <!-- Configuration State -->
                <div v-if="gameState === 'config'" class="config-state">
                    <h3>Game Settings</h3>
                    <div class="config-form">
                        <div class="config-section">
                            <label>Character Types:</label>
                            <div class="checkbox-group">
                                <label>
                                    <input type="checkbox" v-model="config.useNumbers">
                                    Numbers (0-9)
                                </label>
                                <label>
                                    <input type="checkbox" v-model="config.useLetters">
                                    Letters (A-Z)
                                </label>
                            </div>
                        </div>

                        <div class="config-section">
                            <label>String Length:</label>
                            <input type="number" v-model="config.length" min="1" max="20">
                            <span class="hint">Between 1 and 20 characters</span>
                        </div>

                        <div class="config-section">
                            <label>Display Time:</label>
                            <input type="number" v-model="config.displayTime" min="1" max="30">
                            <span class="hint">Between 1 and 30 seconds</span>
                        </div>

                        <div class="config-section">
                            <label>Delay Time:</label>
                            <input type="number" v-model="config.delayTime" min="0" max="120">
                            <span class="hint">Between 0 and 120 seconds</span>
                        </div>

                        <div class="validation-message" v-if="!isValidConfig">
                            Please select at least one character type and ensure length and displayTime are within valid
                            ranges.
                        </div>

                        <button @click="startGame" :disabled="!isValidConfig">
                            Start Game
                        </button>
                        <!-- <button @click="resetGame">
                            Retry
                        </button> -->
                    </div>
                </div>

                <!-- Ready State -->
                <div v-if="gameState === 'ready'" class="ready-state">
                    <p>Ready to test your memory? You'll see a code for {{ config.displayTime }} seconds.
                        {{ config.delayTime > 0 ? `Then
                        you'll need to wait for ${config.delayTime} second${config.delayTime > 0 ? 's' : ''} before answering.` : '' }}</p>
                    <button @click="startChallenge">Start Challenge</button>
                </div>

                <!-- Showing State -->
                <div v-if="gameState === 'showing'" class="showing-state">
                    <div class="challenge-string">{{ displayString }}</div>
                    <p>Memorize this string!</p>
                </div>

                <!-- Delay State -->
                <div v-if="gameState === 'delaying'" class="delaying-state">
                    <p>Waiting...</p>
                </div>

                <!-- Testing State -->
                <div v-if="gameState === 'testing'" class="testing-state">
                    <p>What was the string?</p>
                    <input v-model="userInput" type="text" :maxlength="config.length" @keyup.enter="checkAnswer">
                    <button @click="checkAnswer">Check Answer</button>
                </div>

                <!-- Complete State -->
                <div v-if="gameState === 'complete'" class="complete-state">
                    <div class="alert">{{ feedback }}</div>
                    <div class="button-group">
                        <button @click="startChallenge">Next Challenge</button>
                        <button @click="resetGame" class="secondary">Change Settings</button>
                    </div>
                </div>

                <!-- Failed State -->
                <div v-if="gameState === 'failed'" class="failed-state">                    
                    <input v-model="answer" type="text" disabled class="wrong">
                    <input v-model="userInput" type="text" disabled>
                    
                    
                    <div class="alert">{{ feedback }}</div>
                    <div class="button-group">
                        <button @click="startChallenge">Next Challenge</button>
                        <button @click="resetGame" class="secondary">Change Settings</button>
                    </div>
                </div>

                <!-- Feedback (when not complete) -->
                <div v-if="feedback && gameState !== 'complete'">
                    <!-- <div  class="alert">
                        {{ feedback }}
                    </div> -->
                    <!-- <button @click="resetGame">
                        Retry
                    </button> -->
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
    background-color: #1a1a1a;
}

.card {
    background: #2d2d2d;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    width: 100%;
    max-width: 400px;
    margin: 20px;
}

.card-content {
    padding: 24px;
    color: #e0e0e0;
}

.header {
    text-align: center;
    margin-bottom: 24px;
}

.header h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #ffffff;
}

.config-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.config-section {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.hint {
    font-size: 12px;
    color: #a0a0a0;
}

.validation-message {
    color: #ff4d4d;
    font-size: 14px;
    text-align: center;
}
.failed-state .wrong {
    border-color: #ff4d4d;
    background-color: rgba(255, 77, 77, 0.5);

}



.challenge-string {
    font-family: monospace;
    font-size: 32px;
    letter-spacing: 0.2em;
    text-align: center;
    margin: 32px 0;
    color: #ffffff;
}

button {
    background-color: #2e7d32;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
    margin: 8px 0;
}

button:disabled {
    background-color: #404040;
    cursor: not-allowed;
    color: #808080;
}

button.secondary {
    background-color: #495057;
}

button:hover:not(:disabled) {
    background-color: #1b5e20;
}

button.secondary:hover {
    background-color: #343a40;
}

.button-group {
    display: flex;
    gap: 8px;
}

input[type="text"] {
    width: 100%;
    padding: 12px;
    font-size: 24px;
    text-align: center;
    letter-spacing: 0.2em;
    margin: 16px 0;
    border: 2px solid #404040;
    border-radius: 4px;
    background-color: #333333;
    color: #ffffff;
}

input[type="number"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #404040;
    border-radius: 4px;
    background-color: #333333;
    color: #ffffff;
}

.alert {
    background-color: #2d2d2d;
    border: 1px solid #404040;
    border-radius: 4px;
    padding: 12px;
    margin-top: 16px;
    text-align: center;
    color: #e0e0e0;
}

.ready-state,
.showing-state,
.delaying-state,
.testing-state,
.failed-state,
.complete-state {
    text-align: center;
    color: #e0e0e0;
}

input[type="text"]:focus,
input[type="number"]:focus {
    outline: none;
    border-color: #2e7d32;
}




/* .memory-game {
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

.config-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.config-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hint {
  font-size: 12px;
  color: #666;
}

.validation-message {
  color: #dc3545;
  font-size: 14px;
  text-align: center;
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

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

button.secondary {
  background-color: #6c757d;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

button.secondary:hover {
  background-color: #5a6268;
}

.button-group {
  display: flex;
  gap: 8px;
}

input[type="text"] {
  width: 100%;
  padding: 12px;
  font-size: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  margin: 16px 0;
  border: 2px solid #ddd;
  border-radius: 4px;
}

input[type="number"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
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
} */
</style>