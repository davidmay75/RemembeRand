const strandDisplayElement = document.getElementById('strand')
const answerInputElement = document.getElementById('answer-input')
const timerElement = document.getElementById('timer')
const nextButtonElement = document.getElementById('next-button')
const abortButtonElement = document.getElementById('abort-button')
const strandLengthElement = document.getElementById('strand-length')
const waitTimeElement = document.getElementById('wait-time')
const accuracyElement = document.getElementById('accuracy')
const resultTextElement = document.getElementById('result-text')
const charChoiceElement = document.getElementById('char-choice')
const interval = 1000
const msBetweenQuestions = 5000

var waitTime = waitTimeElement.value
var strandLength = strandLengthElement.value
var charChoice = charChoiceElement.value//find this
var timer
var strandAnswer
/*
Hide timer
Make waiting period more appearant - countdown timer
Scoreboard - Length, charChoice, Time 
*/

///   TIME FUNCTIONS   ///
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
    timerElement.innerText = "PREPARE FOR NEXT ROUND"
}

function resetAll() {   
    
    setAttributes()//answerInputElement.setAttribute('maxlength', strandLength)//make other function for this stuff SetFieldAttributes()
    resetTimer()
    strandDisplayElement.innerText = ""
    answerInputElement.value = ""
    resultTextElement.innerText = ""
    timerElement.innerText = "0:00"
}

function startQuestionMode() {
    resetAll()
    disableInput()
    unhideStrand()
    renderNewStrand()
    setTimeout(startAnswerMode, waitTime*interval)//make this happen with a button so that the delay isnt glitchy
}

function startAnswerMode() {
    startTimer()
    enableInput()
    hideStrand()
    resultTextElement.innerText = ""
}

/// STRAND FUNCTIONS ///
function getStrand(length, charChoice) {
    let strand = ''
    let strandArray = []

    if (charChoice == 0) {
        for (i = 0; i<length; i++){
            strandArray.push(Math.floor(Math.random()*10))
        }      
    }
    else if (charChoice == 1){        
        for (i = 0; i<length; i++){
            strandArray.push(randomChar())
        } 
    }
    else if (charChoice == 2){
        for (i = 0; i<length; i++){
            if (i % 2 == 0) {
                strandArray.push(randomChar())
            }
            else {
                strandArray.push(randomNumber(9))
            }      
        } 
    }
    return strandArray.join("")
}

function randomNumber(max){
    return Math.floor(Math.random()*10) % max
}
function randomChar(){
    let lower = "abcdefghijklmnopqrstuvwxyz"
    return lower[randomNumber(25)]
}

async function renderNewStrand() {
    const strand = await getStrand(strandLength, charChoice)
    strandDisplayElement.innerText = ''

    strand.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        strandDisplayElement.appendChild(characterSpan)
    })
    strandAnswer = strandDisplayElement.innerText
    answerInputElement.value = ""
}



 function checkAnswer() {
     //let arrayInput = answerInputElement.value.split('')
     let input = answerInputElement.value
     console.log(typeof input)
     console.log(input)
     
     
     //let arrayAnswer = strandDisplayElement.querySelectorAll('span')
     let answer = strandAnswer
     console.log(typeof answer)
     console.log(answer)

     if (input == answer){
        resultTextElement.innerText = getTimerTime()
        resetTimer()//timer inner text set here also    
        timerElement.innerText = "CORRECT"   
        timerElement.innerText = resultTextElement.innerText      
           console.log("correct")   
          return true
     }else{
         return false
     }
    // const arrayStrand = strandDisplayElement.querySelectorAll('span')
    // const arrayInputValue = answerInputElement.value.split('')
    // let correct = true

    // arrayStrand.forEach((characterSpan, index) => {
    //     const character = arrayInputValue[index]

    //     if (character == null){
    //         characterSpan.classList.remove('incorrect')
    //         characterSpan.classList.remove('correct')
    //         correct = false
    //     }else if (character === characterSpan.innerText) {
    //         characterSpan.classList.add('correct')
    //         characterSpan.classList.remove('incorrect')
    //     } else {
    //         characterSpan.classList.remove('correct')
    //         characterSpan.classList.add('incorrect')
    //         correct = false
    //     }
    // })
    // if (correct) {
    //     resultTextElement.innerText = getTimerTime()
    //     resetTimer()//timer inner text set here also       
    //     timerElement.innerText = "CORRECT"
    //     //setTimeout(startQuestionMode, msBetweenQuestions)    
    //     return true
    // } else {
    //     return false
    // }
}

/// DISPLAY FUNCTIONS ///
function setAttributes() {
    answerInputElement.setAttribute('maxlength', strandLength)
    charChoice = charChoiceElement.value
    console.log(charChoice)
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

/// Event Listeners ///
nextButtonElement.addEventListener('keypress', function(event) {
    event.preventDefault();
    if(event.key === "Enter") {
        nextButtonElement.click()
        checkAnswer()
    }
})
nextButtonElement.addEventListener('click', () => {
    if (checkAnswer()) {
        resetAll()
        startQuestionMode()
    }
    else{
        console.log("Cheater")
        resetAll()
        startQuestionMode()
    }
})
abortButtonElement.addEventListener('click', () => {
        resetAll()
        startQuestionMode()
})
answerInputElement.addEventListener('input', () => {
    checkAnswer()
} )
strandLengthElement.addEventListener('change', () => {
    resetAll()
    strandLength = strandLengthElement.value
    answerInputElement.setAttribute('maxlength', strandLength)
})
waitTimeElement.addEventListener('change', () => {
    resetAll()
    waitTime = waitTimeElement.value    
})
charChoiceElement.addEventListener('change', () => {
    resetAll()
    charChoice = charChoiceElement.value
})

setAttributes()
startQuestionMode()