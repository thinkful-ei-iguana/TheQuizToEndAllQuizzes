"use strict";
let movementCounter = 0;

// Render Function
function renderQuestion() {
  //Filled with the html elements of the quiz form.
  // console.log('`renderQuestion` ran');
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
  $(".questionArea").html(questionHtml);
  renderAnswers();
  // $("#next-question").hide();
}

function renderAnswers() {
  let question = STORE.questions[STORE.questionNumber - 1];
  for (let i = 0; i < question.answers.length; i++) {
    $(".answers").append(`
        <input type="radio" name="answers" id="answer ${i + 1}" value= "${
      question.answers[i]
    }" tabindex ="${i + 1}">
        <label for="answer${i + 1}"> ${question.answers[i]}</label> <br/>
        <span id="js-r${i + 1}"></span>
    `);
  }
}

//Function Start Quiz
function startQuiz() {
  // upon hitting the start quiz button, this will render the first
  // quiz question
  $("#startButton").on("click", function(event) {
    event.preventDefault();
    renderQuestion();
    $(".initializationPage").hide();
    console.log("startQuiz is running");
  });
}

function checkAnswer() {
  $(event.preventDefault());
  let currentQues = STORE.questions[STORE.questionNumber-1];
  console.log(currentQues);
  let selectedOption = $("input[name=answers]:checked").val();
  console.log(selectedOption);
  console.log(`checkAnswer did something`);
  if (!selectedOption) {
    alert("Choose an option");
    return;
  } 
  console.log(currentQues.correctAnswer);
  // let id_num = currentQues.answers.findIndex(i => i === selectedOption);
  // console.log(id_num);
  // let id = '#js-r' + ++id_num;
  // $('span').removeClass("right-answer wrong-answer");
  if(selectedOption === currentQues.correctAnswer) {
    STORE.score++; 
    renderAnswerResult();
    movementCounter++;
    updateScore();
   $('#incorrect').hide();
    console.log('This should have hidden the incorrect message because you got it right');
  }
  else {
    renderAnswerResult();
    movementCounter++;
    $('#correct').hide();
  }
}

//Submit Function **has to work with keyboard
function submitAnswer() {
  $("body").on("submit", function(event) {
    event.preventDefault();
    console.log(movementCounter);
    if (STORE.questions.length === (movementCounter + 1) / 2) {
      resultsPage();
      console.log('resultsPage ran');
    } else if (movementCounter % 2 === 0) {
      checkAnswer();
      console.log('answer page ran');
    } else if (movementCounter % 2 === 1) {
      movementCounter++;
      renderQuestion();
      console.log('nextQuestion ran')
    }
  });
}

//Check answer function
function renderAnswerResult() {
  //this function will check the answer input against the
  //correct answer from the STORE array.
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
  $(".questionArea").html(resultsHtml);
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
  $(".questionArea").html(finalResultsHtml);
}

//Function Restart Quiz
function restartQuiz() {
  //when you click the button, resets the question number and score
  //and re-renders the quiz.
  $(".questionArea").on("click", "#restartButton", function(event) {
    reInitialize();
    movementCounter = 0;
    renderQuestion();
  });
}

function reInitialize() {
  $(".questionArea").on("click", "#restartButton", event => {
    renderQuestion();
  });
  STORE.questionNumber = 0;
  STORE.score = 0;
}

//Function Update Score
function updateScore() {
  //this function will add to score if the
  //person got the previous question correct.
  //will need to call a comparison function which compares
  //answer to the correctAnswer in STORE.
  STORE.score++;
}

//Function Update Question Number
function updateQuestionNumber() {
  //this function will add to the question number
  //every time that the next question button is invoked.
  STORE.questionNumber++;
}

//master function -- runs the functions to make the quiz.
function itsQuizTime() {
  startQuiz();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(itsQuizTime);
