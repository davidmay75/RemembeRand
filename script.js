const strandDisplayElement = document.getElementById('strand-display')
const answerInputElement = document.getElementById('answer-input')
const timerElement = document.getElementById('timer')
const nextButtonElement = document.getElementById('next-button')
const strandLengthElement = document.getElementById('strand-length')
const waitTimeElement = document.getElementById('wait-time')
const accuracyElement = document.getElementById('accuracy')
const resultTextElement = document.getElementById('result-text')
const interval = 1000
const msBetweenQuestions = 5000

var waitTime = waitTimeElement.value
var strandLength = strandLengthElement.value
answerInputElement.setAttribute('maxlength', strandLength)
var timer

///   FUNCTIONS
let startTime 
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    timer = setInterval(updateTimer, 1)
}

function updateTimer() {
    timerElement.innerText = getTimerTime()
}

function getTimerTime(){
    return ((new Date() - startTime)/interval).toFixed(3)
}

function resetTimer() {
    clearInterval(timer)
    timerElement.innerText = 0
}

function resetAll() {   
    strandDisplayElement.innerText = null
    answerInputElement.innerText = null
    resultTextElement.innerText = null
    resetTimer()
    timerElement.innerText = "GET READY"
}

function startQuestionMode() {
    timerElement.innerText = 0
    answerInputElement.innerText = null
    strandDisplayElement.innerText = null
    timerElement.innerText = "GET READY"

    resetTimer()
    disableInput()
    unhideStrand()
    renderNewStrand()
    setTimeout(startAnswerMode, waitTime*interval)
}

function startAnswerMode() {
    startTimer()
    enableInput()
    hideStrand()
    resultTextElement.innerText = ""
}

function getStrand(length) {
    let strand = ''
    for (i = 0; i<length; i++){
        strand += Math.floor(Math.random()*10)
    }
    return strand
}

async function renderNewStrand() {
    const strand = await getStrand(strandLength)
    strandDisplayElement.innerText = ''

    strand.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        strandDisplayElement.appendChild(characterSpan)
    })
    answerInputElement.value = null
}

 function hideStrand(){
    strandDisplayElement.style.display = "none"
 }

 function unhideStrand() {
    strandDisplayElement.style.display = "block"
 }

 function enableInput() {
    answerInputElement.disabled = false
    answerInputElement.focus()
 }

 function disableInput() {
    answerInputElement.disabled = true    
 }

 function checkAnswer() {
    const arrayStrand = strandDisplayElement.querySelectorAll('span')
    const arrayInputValue = answerInputElement.value.split('')
    let correct = true

    arrayStrand.forEach((characterSpan, index) => {
        const character = arrayInputValue[index]
        if (character == null){
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })
    if (correct) {
        resetTimer()
        resultTextElement.innerText = getTimerTime()
        timerElement.innerText = getTimerTime()

        setTimeout(startQuestionMode, msBetweenQuestions)    
    }
}

//Event Listeners
nextButtonElement.addEventListener('keypress', function(event) {
    event.preventDefault();
    if(event.key === "Enter") {
        nextButtonElement.click()
        checkAnswer()
    }
})
nextButtonElement.addEventListener('click', () => {
    checkAnswer()
})
answerInputElement.addEventListener('input', () => {
    checkAnswer()
} )
strandLengthElement.addEventListener('change', () => {
    resetAll()
    strandLength = strandLengthElement.value
    answerInputElement.setAttribute('maxlength', strandLength)
    setTimeout(startQuestionMode, interval)
})
waitTimeElement.addEventListener('change', () => {
    resetAll()
    waitTime = waitTimeElement.value    
    setTimeout(startQuestionMode, interval)
})


startQuestionMode()