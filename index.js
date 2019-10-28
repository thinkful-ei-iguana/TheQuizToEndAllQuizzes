'use strict';

function generateQuizString()

//Render Function
function renderQuiz(){
  //Filled with the html elements of the quiz form.
  console.log('`renderQuiz` ran');
  
}

function checkingAnswer(answerId){
  console.log('Checking submitted answer against logged answer.')
  const answer = STORE.find(answer => answer.id === answerId);
  answer.checked = !answer.checked;
}

//Submit Function **has to work with keyboard
function submitAnswer(){
  //this function will submit the user input
  $('###placeholder').on('submit', '.js-submitAnswer', event =>{
    const currentAnswer = '###Placeholder for radial answer target'
    checkingAnswer(answer);
  })
  console.log('Submitting Answer');
   
}
//Check answer function
function checkAnswer(){
  //this function will check the answer input against the 
  //correct answer from the STORE array.
}

//Next Function
function nextQuestion(){
  //this function will take a button press and move us
  //to the next question in the STORE.  Will need to 
  //
}

//Function to Move Quiz to Results Page
function resultsPage(){
  //If question number advances past 5, move to this page
  //instead of trying to render another question.
  //This page will contain the restart quiz button.

}

//Function Start Quiz
function startQuiz(){
// upon hitting the start quiz button, this will render the first
// quiz question
}

//Function Restart Quiz
function restartQuiz(){
  //when you click the button, resets the question number and score
  //and re-renders the quiz.
}

//Function Update Score
function updateScore(Score){
  //this function will add to score if the
  //person got the previous question correct.
  //will need to call a comparison function which compares
  //answer to the correctAnswer in STORE.
}


//Function Update Question Number
function updateQuestionNumber(){
  //this function will add to the question number
  //every time that the next question button is invoked.
}