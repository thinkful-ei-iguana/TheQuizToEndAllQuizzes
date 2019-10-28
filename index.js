'use strict';


// Render Function
function renderQuestion(){
  //Filled with the html elements of the quiz form.
  // console.log('`renderQuestion` ran');
  let question = STORE.questions[STORE.questionNumber];
  updateQuestionNumber();
  updateScore();
  const questionHtml = $(`
  <div class="questionDiv">  
      <fieldset>
        <div class="row question">
          <div class="col-12">
            <legend> ${question.question}</legend>
          </div>
        </div>

        <div class="row answers">
          <div class="col-12">
            <div class="js-answers"> </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <button type = "submit" id="finalAnswer" tabindex="5">Final Answer</button>
        </div>
      </div>
    </fieldset>  
  </div>`);
$('.questionArea').html(questionHtml);
renderAnswers();
// $("#next-question").hide();
}

function renderAnswers(){
  let question = STORE.questions[STORE.questionNumber-1];
  for(let i=0; i<question.answers.length; i++){
    $('.js-answers').append(`
        <input type = "radio" name="answers" id="answer${i+1}" value= "${question.answers[i]}" tabindex ="${i+1}"> 
        <label for="answer${i+1}"> ${question.answers[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);
  }
}

//Function Start Quiz
function startQuiz(){
  // upon hitting the start quiz button, this will render the first
  // quiz question
  $('.initializationPage').submit(function(event){
    event.preventDefault();
    renderQuestion();
    $('.initializationPage').delete();
    console.log('startQuiz is running');
  });
}

function checkingAnswer(){
  
}

//Submit Function **has to work with keyboard
function submitAnswer(){
  $('.questionDiv').submit(function(event){
    event.preventDefault();
    console.log(`submitAnswer ran`);
    renderAnswerResult();    
  });
}

//Check answer function
function renderAnswerResult(){
  //this function will check the answer input against the 
  //correct answer from the STORE array.
  let answer = STORE.questions[STORE.questionNumber];

  const resultsHtml = $(`
  <div>
    <form id="js-questions" class="question-form">
      
      <fieldset>
        <div class="row question">
          <div class="col-12">
            <legend> ${answer.question}</legend>
          </div>
        </div>

        <div class="row answers">
          <div class="col-12">
            <div class="js-answers"> </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <button type = "submit" id="nextQuestion" tabindex="5">Next Question</button>
        </div>
      </div>
    </fieldset>
    </form>
  </div>`);
  $('.questionArea').html(resultsHtml);

}

//Next Function
function nextQuestion(){  
  //this function will take a button press and move us
  //to the next question in the STORE.  Will need to 
  //
  // $('.quizArea').submit('nextQuestion', function(event){
  //   event.preventDefault();
  //   renderQuestion();
  // })
}

//Function to Move Quiz to Results Page
function resultsPage(){
  //If question number advances past 5, move to this page
  //instead of trying to render another question.
  //This page will contain the restart quiz button.


}

//Function Restart Quiz
function restartQuiz(){
  //when you click the button, resets the question number and score
  //and re-renders the quiz.
  reInitialize();
}

function reInitialize(){
  STORE.questionNumber = 0;
  STORE.score = 0;
}

//Function Update Score
function updateScore(){
  //this function will add to score if the
  //person got the previous question correct.
  //will need to call a comparison function which compares
  //answer to the correctAnswer in STORE.
  STORE.score++;
}


//Function Update Question Number
function updateQuestionNumber(){
  //this function will add to the question number
  //every time that the next question button is invoked.
  STORE.questionNumber++;
}

//master function -- runs the functions to make the quiz.
function itsQuizTime(){
  startQuiz();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(itsQuizTime);