'use strict';
let movementCounter = 0;

// Render Function
function renderQuestion() {
  //Filled with the html elements of the quiz form.
  let question = STORE.questions[STORE.questionNumber];
  updateQuestionNumber();
  const questionHtml = $(`
  <form class="questionForm">
    <div class="questionDiv">
      <div>
        <legend> ${question.question}</legend>
      </div>

      <div class="answers"> </div>

      <div class="button">
        <button type="submit" class="finalAnswer" tabindex="5"> Final Answer </button>
      </div>
    </div>
  </form>`);
  $('.questionArea').html(questionHtml);
  renderAnswers();
}

function renderAnswers() {
  let question = STORE.questions[STORE.questionNumber - 1];
  for (let i = 0; i < question.answers.length; i++) {
    $('.answers').append(`
        <input type="radio" name="answers" id="answer ${i + 1}" value= "${question.answers[i]}" tabindex ="${i + 1}">
        <label for="answer${i + 1}"> ${question.answers[i]}</label> <br/>
        <span id="js-r${i + 1}"></span>
    `);
  }
}

//Function Start Quiz
function startQuiz() {
  // upon hitting the start quiz button, this will render the first
  // quiz question
  $('#startButton').on('click', function(event) {
    event.preventDefault();
    renderQuestion();
    $('.initializationPage').hide();
  });
}

function checkAnswer() {
  $(event.preventDefault());
  let currentQues = STORE.questions[STORE.questionNumber-1];
  let selectedOption = $('input[name=answers]:checked').val();
  if (!selectedOption) {
    alert('Choose an option');
    return;
  } 
  if(selectedOption === currentQues.correctAnswer) { 
    renderAnswerResult();
    movementCounter++;
    updateScore();
    $('#incorrect').hide();
  }
  else {
    renderAnswerResult();
    movementCounter++;
    $('#correct').hide();
  }
}

//Submit Function **has to work with keyboard
function submitAnswer() {
  $('body').on('submit', function(event) {
    event.preventDefault();
    if (STORE.questions.length === (movementCounter + 1) / 2) {
      resultsPage();
    } else if (movementCounter % 2 === 0) {
      checkAnswer();
    } else if (movementCounter % 2 === 1) {
      movementCounter++;
      renderQuestion();
    }
  });
}

//Check answer function
function renderAnswerResult() {
  //this function will display the answer to the previous question
  let answer = STORE.questions[STORE.questionNumber - 1];
  const resultsHtml = $(`
    <form class="questionResults">
      <div class="answersDiv">
          <fieldset>
            <div id="correct">
                <legend> You did it! ${answer.correctAnswer} is correct!</legend>
            </div>
            <div id="incorrect">
              <legend>${answer.correctAnswer} is the correct answer.  You chose unwisely!</legend>
            </div>
            <div>
              <button type="submit" id="nextQuestion" tabindex="5">Next Question</button>
            </div>
        </fieldset>
      </div>
    </form>`);
  $('.questionArea').html(resultsHtml);
}

//Function to Move Quiz to Results Page
function resultsPage() {
  
  let finalResultsHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div>
            <legend>Whew!<br/>You made it through.<br/>Your final tally is: ${STORE.score}/${STORE.questions.length}</legend>
          </div>

          <div>
            <button type="button" id="restartButton"> Restart Quiz </button>
          </div>
        </fieldset>
    </form>
    </div>`
  );
  $('.questionArea').html(finalResultsHtml);
}

//Function Restart Quiz
function restartQuiz() {
  //when you click the button, resets the question number and score
  //and re-renders the quiz.
  $('.questionArea').on('click', '#restartButton', function(event) {
    reInitialize();
    renderQuestion();
  });
}

function reInitialize() {
  $('.questionArea').on('click', '#restartButton', event => {
    renderQuestion();
  });
  STORE.questionNumber = 0;
  STORE.score = 0;
  movementCounter = 0;
}

//Function Update Score
function updateScore() {
  //this function will add to score 
  STORE.score++;
}

//Function Update Question Number
function updateQuestionNumber() {
  //this function will add to the question number
  STORE.questionNumber++;
}

//Displays Score
function displayScore(){
  let scoreDisplay = $(`
  <h2>Score:${STORE.score}/${STORE.questions.length}</h2>`);
  $('.scoring').html(scoreDisplay);
}
//Displays Question Number
function displayQuestionNumber(){
  let questionDisplay = $(`
  <h2>Question: ${STORE.questionNumber} of ${STORE.questions.length}</h2>`);
  $('.scoring').html(questionDisplay);
}

//master function -- runs the functions to make the quiz.
function itsQuizTime() {
  startQuiz();
  submitAnswer();
  restartQuiz();
  displayQuestionNumber();
  displayScore();
}

$(itsQuizTime);
