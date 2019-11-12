'use strict';


//////// RENDERING HTML /////////

function renderQuestion() {
  let question = STORE.questions[STORE.questionNumber - 1];
  displayScore();
  const questionHtml = $(`
  <form class="questionForm">
    <div class="questionDiv">
      <div>
        <legend> ${question.question}</legend>
      </div>

      <div class="answers"> </div>

      <div class="button">
        <button type="submit" class="finalAnswer" id="finalAnswer" tabindex="5"> Final Answer </button>
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
        <input type="radio" name="answers" id="answer${i + 1}" value="${question.answers[i]}" tabindex="${i + 1}">
        <label for="answer${i + 1}">${question.answers[i]}</label> <br/>
        <span id="js-r${i + 1}"></span>
    `);
  }
}

function renderAnswerResult() {
  let answer = STORE.questions[STORE.questionNumber - 1];
  const resultsHtml = $(`
    <div class="questionResults">
      <div class="answersDiv">
          <fieldset>
            <div id="correct">
                <legend> You did it! ${answer.correctAnswer} is correct!</legend>
            </div>
            <div id="incorrect">
              <legend>${answer.correctAnswer} is the correct answer.  You chose unwisely!</legend>
            </div>
            <div class="nextQuestion">
              <button type="button" id="nextQuestion">Next Question</button>
            </div>
            <div class="results">
              <div>
                <legend>Whew!<br/>You made it through.<br/>Your final tally is: ${STORE.score}/${STORE.questions.length}</legend>
              </div>
              <div>
                <button type="button" id="restartButton"> Restart Quiz </button>
              </div>
            </div>
        </fieldset>
      </div>
    </div>`);
  $('.questionArea').html(resultsHtml);
  if (STORE.questionNumber < 5 ){
    $('.results').hide();
  } else {
    $('.nextQuestion').hide();
  }
}

///////// SUPPORT FUNCTIONS /////////

function reInitialize() {
  STORE.questionNumber = 1;
  STORE.score = 0;
}

function updateScore() {
  STORE.score++;
}

function updateQuestionNumber() {
  STORE.questionNumber++;
}

function displayScore(){
  let scoreDisplay = $(`
  <h2>Score: ${STORE.score}/${STORE.questions.length} - Question:  ${STORE.questionNumber} of ${STORE.questions.length}</h2>`);
  $('.scoring').html(scoreDisplay);
}

function checkAnswer() {
  event.preventDefault();
  let currentQues = STORE.questions[STORE.questionNumber - 1];
  let selectedOption = $('input[name=answers]:checked').val();
  if (!selectedOption) {
    alert('Choose an option');
    return;
  } 
  if(selectedOption === currentQues.correctAnswer) { 
    renderAnswerResult();
    updateScore();
    $('#incorrect').hide();
  }
  else {
    renderAnswerResult();
    $('#correct').hide();
  }
}

//////// EVENT HANDLERS /////////

function handleEvents(){
  restartQuiz();
  startQuiz();
  nextQuestion();
  submitAnswer();
}

function startQuiz() {
  $('#startButton').on('click', function(event) {
    event.preventDefault();
    updateQuestionNumber();
    renderQuestion();
    $('.initializationPage').hide();
  });
}

function submitAnswer() {
  $('body').on('click', '#finalAnswer', function(event) {
    event.preventDefault();
    if (STORE.questionNumber >= 5) {
      checkAnswer();
      displayScore();
    } else if (STORE.questionNumber < 5) {
      checkAnswer();
      displayScore();
     } 
  });
}

function nextQuestion() {
  $('body').on('click', '#nextQuestion', function(event){
    event.preventDefault();
    updateQuestionNumber();
    renderQuestion();
  })
}

function restartQuiz() {
  $('.questionArea').on('click', '#restartButton', function(event) {
    event.preventDefault();
    reInitialize();
    renderQuestion();
  });
}

function itsQuizTime() {
  handleEvents();
  displayScore();
}


$(itsQuizTime);
