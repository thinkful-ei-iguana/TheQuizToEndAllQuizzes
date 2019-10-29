'use strict';
let movementCounter = 0;

// Render Function
function renderQuestion(){
  //Filled with the html elements of the quiz form.
  // console.log('`renderQuestion` ran');
  let question = STORE.questions[STORE.questionNumber];
  updateQuestionNumber();
  updateScore();
  const questionHtml = $(`
  <form class="questionForm">
    <div class="questionDiv">  
      <div>
        <legend> ${question.question}</legend>
      </div>

      <div class="answers"> </div>

      <div class="button">
        <button type = "submit" class="finalAnswer" tabindex="5">Final Answer</button>      
      </div>  
    </div>
  </form>`);
  $('.questionArea').html(questionHtml);
  renderAnswers();
// $("#next-question").hide();
}

function renderAnswers(){
  let question = STORE.questions[STORE.questionNumber-1];
  for(let i=0; i<question.answers.length; i++){
    $('.answers').append(`
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
  $('#startButton').on('click', function(event){
    event.preventDefault();
    renderQuestion();
    $('.initializationPage').hide();
    console.log('startQuiz is running');
  });
}

function checkingAnswer(){
  
}

//Submit Function **has to work with keyboard
function submitAnswer(){
  $('body').on('submit', function(event){
    event.preventDefault();
    console.log(movementCounter);
    if(movementCounter % 2 === 0){
      movementCounter++;
      renderAnswerResult();}
    else {
      movementCounter++;
      renderQuestion();
    }
    console.log(`submitAnswer ran`);
  });
}

//Check answer function
function renderAnswerResult(){
  //this function will check the answer input against the 
  //correct answer from the STORE array.
  let answer = STORE.questions[STORE.questionNumber-1];
  const resultsHtml = $(`
    <form class="questionResults">
      <div class="answersDiv">
          <fieldset>
            <div class="row question">
              <div class="col-12">
                <legend> ${answer.correctAnswer}</legend>
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
      </div>
    </form>`);
  $('.questionArea').html(resultsHtml);
}

//Next Function
function nextQuestion(){  
  //this function will take a button press and move us
  //to the next question in the STORE.  Will need to 
  
  
}

function progressionHandler(){
  // let submitSwitch = true;
  // $('.questionArea').submit(function(event){
  //   if (STORE.questionNumber <= STORE.answers.length && submitSwitch === true){
  //     event.preventDefault();
  //     renderAnswerResult();
  //     console.log(`submitAnswer ran`);
  //     submitSwitch = false;
  //   }
  //   else if (STORE.questionNumber <= STORE.answers.length && submitSwitch === false){
  //     event.preventDefault();
  //     renderQuestion();
  //     console.log('nextQuestion ran');
  //     submitSwitch = true;
  //   }
  //   else if (STORE.questionNumber > STORE.answers.length){
  //     resultsPage();
  //   }
  // });
  // if(STORE.questionNumber <= STORE.answers.length && submitSwitch === true){
  //   submitSwitch = false;
  //   $('.questionArea').submit(function(event){
  //     event.preventDefault();
  //     console.log(`submitAnswer ran`);
  //     renderAnswerResult();    
  //   });
  //   renderAnswerResult();
  // }
  // else if(STORE.questionNumber <= STORE.answers.length && submitSwitch === true){
  //   submitSwitch = true;
  //   $('.questionArea').submit(function(event){
  //     event.preventDefault();
  //     renderQuestion();
  //     console.log('nextQuestion ran');
  //   });
  //   renderQuestion();
  // }
  // else if(STORE.questionNumber > STORE.answers.length){
  //   resultsPage();

  // }
}

//Function to Move Quiz to Results Page
function resultsPage(){
  //If question number advances past 5, move to this page
  //instead of trying to render another question.
  //This page will contain the restart quiz button.
  let resultsHtml = $(
  `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div>
            <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
          </div>
        
          <div>
            <button type="button" id="restartButton"> Restart Quiz </button>
          </div>
        </fieldset>
    </form>
    </div>`
  );
  $('main').html(resultHtml);
}

//Function Restart Quiz
function restartQuiz(){
  //when you click the button, resets the question number and score
  //and re-renders the quiz.
  reInitialize();
}

function reInitialize(){
  $('.questionArea').on('click','#restartButton', event => {
    renderQuestion();
  });
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