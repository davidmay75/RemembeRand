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
var charChoice = charChoiceElement.value
var timer
var strandAnswer
/*
Make waiting period more appearant - countdown timer
Scoreboard - Length, charChoice, Time 
Fix adding letters
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
    timerElement.innerText = "GET READY FOR NEXT ROUND"
}

function resetAll() {   
    
    setAttributes()//answerInputElement.setAttribute('maxlength', strandLength)//make other function for this stuff SetFieldAttributes()
    resetTimer()
    strandDisplayElement.innerText = ""
    answerInputElement.value = ""
    resultTextElement.innerText = ""
    timerElement.innerText = "GET READY"
}

function startQuestionMode() {
    //timerElement.innerText = 0
   // answerInputElement.innerText = null
    //strandDisplayElement.innerText = null
    //timerElement.innerText = "GET READY"

    //resetTimer()//also reset in check answer
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
function getStrand(length, charChoice) {//needs to fix passing in charChoice
    let strand = ''
    let strandArray = []

    switch(charChoice){
        case 1:
            //letters only
            for (i = 0; i<length; i++){
                strandArray.push("A")
            }      
            
        case  2:
            //letters and numbers
            for (i = 0; i<length; i++){
                strandArray.push("B")
            }     
            
        default://Numbers only
            for (i = 0; i<length; i++){
                strandArray.push(Math.floor(Math.random()*10))
                //strand += Math.floor(Math.random()*10)
            }         
    }  
    return strandArray.join("")
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
        resultTextElement.innerText = getTimerTime()
        resetTimer()//timer inner text set here also       
        //timerElement.innerText = getTimerTime()
        timerElement.innerText = "GOOD JOB"
        //setTimeout(startQuestionMode, msBetweenQuestions)    
        return true
    } else {
        return false
    }
}

/// DISPLAY FUNCTIONS ///
function setAttributes() {
    answerInputElement.setAttribute('maxlength', strandLength)
    charChoice = charChoiceElement.value
}
function hideStrand(){
    strandDisplayElement.style.display = "none"
    
    //strandDisplayElement.innerText = "   "
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