"use strict";
// TODO: use DocumentFragment to construct HTML elements prior to appending the to the doc
// https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment

// TODO: Refactor h1 creation

// TODO: refactor for prototypal inheritance. Good opportunity here for this
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance
// https://codeburst.io/various-ways-to-create-javascript-object-9563c6887a47

// TODO: Create click event listener on id="question-section"
//
// https://www.kirupa.com/html5/handling_events_for_many_elements.htm
// https://stackoverflow.com/questions/8321874/how-to-get-all-childnodes-in-js-including-all-the-grandchildren
// https://zellwk.com/blog/dom-traversals/ <----- Use this
// another spurious example of an effective use of bubbling
// https://www.permadi.com/tutorial/cssHighlightTableRow/index2.html

/////////////////////////////////////////////////////////////////
// create a header to hold the following:
// ........create a link to show the user the high scores.
// ................. TODO: User should not be able to see high scores while in game.
// this is defined in the HTML as it is persistent on the page.
var highscoresAnchor = document.getElementById("view-highscores-anchor");

/////////////////////////////////////////////////////////////////
// ........ Create a indicator to show time elapsed while in game.
// TODO: create 75 second timer that begins when quiz start button is clicked
// this is defined in the HTML as it is persistent on the page.
//
// https://www.w3schools.com/js/js_timing.asp
// https://www.w3schools.com/jsref/met_win_setinterval.asp
// https://www.w3schools.com/jsref/met_win_settimeout.asp
var timerSpan = document.getElementById("timer-span");

/////////////////////////////////////////////////////////////////
//  Create a JSON string containing questions, answers, and correct solution
//  FUTURE WORK: Allow Export of Questions JSON.
//  FUTURE WORK: allow user to import a properly formatted JSON string for custom questions
//  FUTURE WORK: add questionType (true-false, multiple-choice, all of the above, click #x that apply, etc...)
//  FUTURE WORK: add explainationText to answer objects
//
// https://www.w3schools.com/js/js_json.asp
var questionsJsonStr =
  '{ "questions": [' +
  '{"question":' +
  '{"questionText":"what is your favorite color?",' +
  '"answers": [' +
  '{"answerText":"red"},' +
  '{"answerText":"green"},' +
  '{"answerText":"blue","solution":true},' +
  '{"answerText":"yellow"},' +
  '{"answerText":"orange"},' +
  '{"answerText":"black"}' +
  "]" +
  "}" +
  "}," +
  '{"question":' +
  '{"questionText":"what is your favorite season?",' +
  '"answers": [' +
  '{"answerText":"fall","solution":true},' +
  '{"answerText":"winter"},' +
  '{"answerText":"spring"},' +
  '{"answerText":"summer"}' +
  "]" +
  "}" +
  "}," +
  '{"question":' +
  '{"questionText":"Commonly used Data Types DO NOT include _________?",' +
  '"answers": [' +
  '{"answerText":"strings"},' +
  '{"answerText":"booleans"},' +
  '{"answerText":"alerts","solution":true},' +
  '{"answerText":"numbers"}' +
  "]" +
  "}" +
  "}," +
  '{"question":' +
  '{"questionText":"The condition of an IF/ELSE statement is enclosed within ________?",' +
  '"answers": [' +
  '{"answerText":"quotes"},' +
  '{"answerText":"curly braces","solution":true},' +
  '{"answerText":"parentheses"},' +
  '{"answerText":"square brackets"}' +
  "]" +
  "}" +
  "}," +
  '{"question":' +
  '{"questionText":"Arrays in JavaScript can be used to store ________?",' +
  '"answers": [' +
  '{"answerText":"numbers and strings"},' +
  '{"answerText":"other arrays"},' +
  '{"answerText":"booleans"},' +
  '{"answerText":"All of these and more!","solution":true}' +
  "]" +
  "}" +
  "}," +
  '{"question":' +
  '{"questionText":"String values must be enclosed within ________ when being assigned to variables?",' +
  '"answers": [' +
  '{"answerText":"commas"},' +
  '{"answerText":"curly brackets"},' +
  '{"answerText":"single or double quotes","solution":true},' +
  '{"answerText":"parentheses"}' +
  "]" +
  "}" +
  "}," +
  '{"question":' +
  '{"questionText":"A very useful tool during development and debugging for printing content to the debugger is?",' +
  '"answers": [' +
  '{"answerText":"JavaScript"},' +
  '{"answerText":"Terminal/Bash"},' +
  '{"answerText":"for loop"},' +
  '{"answerText":"console.log","solution":true}' +
  "]" +
  "}" +
  "}" +
  "]}";

/////////////////////////////////////////////////////////////////
// ........ Create a section for the question text header
// ........ Create a section container to hold the answers
// ........ Create a section container to report the result of choice of answer.
var CardIds = {
  parentContainer: "question-card", //getbyID
  headingId: "#question-header", //QuerySelector
  sectionId: "#question-section", //QuerySelector
  footerId: "#question-footer" //QuerySelector
};

function AppendCard(Ids) {
  this.parent = document.getElementById(Ids.parentContainer);
  this.heading = this.parent.querySelector(Ids.headingId);
  this.section = this.parent.querySelector(Ids.sectionId);
  this.footer = this.parent.querySelector(Ids.footerId);
  this.appendElement = function(dstElement, value) {
    this[dstElement].appendChild(value);
  };
}

/////////////////////////////////////////////////////////////////
// Create a greeting message JavaScript Object that confroms to the three row layout.
// "Coding Quiz Challenge"
// "To answer the following code-related questions within the time. Keep in mind, incorrect answers will penalize your score/time by 10 seconds."
//
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Method_definitions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
function GreetingMessage(Card) {
  (this.headingText = "Coding Quiz Challenge"),
    (this.descriptionText =
      "To answer the following code-related questions within the time. Keep in mind, incorrect answers will penalize your score/time by 10 seconds."),
    (this.heading = function() {
      var headingNode = document.createElement("h1");
      headingNode.textContent = this.headingText;
      return headingNode;
    });
  this.appendHeading = function() {
    Card.appendElement("heading", this.heading());
  };
  this.description = function() {
    var descriptionNode = document.createElement("p");
    descriptionNode.textContent = this.descriptionText;
    return descriptionNode;
  };
  this.appendDescription = function() {
    Card.appendElement("section", this.description());
  };
  /////////////////////////////////////////////////////////////////
  // Create a "Start Quiz!" button for inserting into the start screen
  //var startQuizBtn = document.createElement("button");
  this.startQuizBtn = function() {
    var startQuizBtnNode = document.createElement("button");
    startQuizBtnNode.setAttribute("id", "start-quiz-btn");
    startQuizBtnNode.textContent = "Start Quiz!";
    return startQuizBtnNode;
  };
  this.bindStartQuizBtn = function() {
    Card.appendElement("section", this.startQuizBtn());
  };

  this.render = function() {
    Greeting.appendHeading();
    Greeting.appendDescription();
    Greeting.appendStartQuizBtn();
  };
}

function CodeQuiz(Card, JSONstr) {
  // Create counter to keep track of current question
  this.currentQuestion = 0;
  // Convert Questions JSON (str) into an javascript object
  this.questionsObj = JSON.parse(JSONstr);
  // Build the header for the current question
  this.currentQuestionHeader = function() {
    var headingNode = document.createElement("h1");
    headingNode.textContent = this.questionsObj["questions"][
      this.currentQuestion
    ]["question"].questionText;
    return headingNode;
  };
  this.appendHeading = function() {
    Card.appendElement("heading", this.currentQuestionHeader());
  };
  this.shuffle = function(array) {
    var counter = array.length;

    //while there are elements in the array
    while (counter > 0) {
      //pick a random index each time the counter is decremented
      var i = Math.floor(Math.random() * counter);
      counter--;

      //create a new temporary var and grab the random index from above
      var temp = array[counter];
      array[counter] = array[i];
      array[i] = temp;
    }
    return array;
  };
  this.cut = function(array, length) {
    return array.slice(0, length);
  };
  this.possibleAnswers = function() {
    var correctAnswerLI = null;
    var incorrectAnswerLIs = [];
    var possibleAnswers = [];
    this.questionsObj["questions"][this.currentQuestion]["question"][
      "answers"
    ].forEach(function(element, i) {
      var AnswerLI = document.createElement("li");
      AnswerLI.setAttribute("data-index", i);
      AnswerLI.classList.add("answer-li");
      if (element.hasOwnProperty("solution") && element["solution"] === true) {
        AnswerLI.textContent = element["answerText"];
        AnswerLI.setAttribute("data-correct", "true");
        correctAnswerLI = AnswerLI;
      } else {
        AnswerLI.setAttribute("data-correct", "false");
        AnswerLI.textContent = element["answerText"];
        incorrectAnswerLIs.push(AnswerLI);
      }
    });
    // Shuffle the incorrect array, cut it down to three elements,
    // add the correct answer to possible answers, and shuffle again
    // repopulate this.this(possibleAnswers)
    possibleAnswers = this.shuffle(incorrectAnswerLIs);
    possibleAnswers = this.cut(possibleAnswers, 3);
    possibleAnswers.push(correctAnswerLI);
    return this.shuffle(possibleAnswers);
  };
  /////////////////////////////////////////////////////////////////
  // Create an Ordered List to be updated for each question's answers
  // list should have no more than 4 possible answers.  3 + 1 correct solution. (unless new question types are introduced.)
  this.possibleAnswersFragment = function() {
    var possibleAnswersOLNode = document.createElement("ol");
    possibleAnswersOLNode.setAttribute("id", "possible-answers-ol");

    this.possibleAnswers().forEach(function(element) {
      possibleAnswersOLNode.appendChild(element);
    });

    return possibleAnswersOLNode;
  };
  this.appendPossibleAnswersFragment = function() {
    Card.appendElement("section", this.possibleAnswersFragment());
  };
  this.footerSection = function() {
    /////////////////////////////////////////////////////////////////
    // Create footer correct/incorrect with horizontal rule
    var footerSection = document.createElement("section");
    footerSection.setAttribute("id", "footer-section");
    footerSection.appendChild(document.createElement("hr"));

    return footerSection;
  };
  this.footerCorrect = function() {
    var footerCorrect = this.footerSection();
    var correct = document.createElement("blockquote");
    correct.setAttribute("id", "footer-correct");
    correct.textContent = "Right!";

    footerCorrect.appendChild(correct);

    return footerCorrect;
  };
  this.appendFooterCorrect = function() {
    Card.appendElement("footer", this.footerCorrect());
  };
  this.footerInCorrect = function() {
    var footerInCorrect = this.footerSection();
    var incorrect = document.createElement("blockquote");
    incorrect.setAttribute("id", "footer-incorrect");
    incorrect.textContent = "Wrong!!";

    footerInCorrect.appendChild(incorrect);

    return footerInCorrect;
  };
  this.appendFooterInCorrect = function() {
    Card.appendElement("footer", this.footerInCorrect());
  };
  this.render = function() {
    this.appendHeading();
    this.appendPossibleAnswersFragment();
    this.appendFooterCorrect();
    this.appendFooterInCorrect();
  };
}

/////////////////////////////////////////////////////////////////
// TODO: Create a JavaScript Object to report their final score to the user and enter and submit their initials
//          (object should conform to existing card containers (3x: textHeader, (answer/finalscore & enter initials), leave the last container empty.))
function QuizReport(Card) {
  this.headingText = "All Done!";
  this.heading = function() {
    var headingNode = document.createElement("h1");
    headingNode.textContent = this.headingText;
    return headingNode;
  };
  this.appendHeading = function() {
    Card.appendElement("heading", this.heading());
  };
  this.scoreText = "Your Final Score is: ";
  this.score = function() {
    var parentSpan = document.createElement("span");
    var scoreNode = document.createElement("p");
    var scoreSpan = document.createElement("span");
    scoreSpan.setAttribute("id", "score-span");
    scoreNode.textContent = this.scoreText;

    parentSpan.appendChild(scoreNode);
    parentSpan.appendChild(scoreSpan);
    return parentSpan;
  };
  this.appendScore = function() {
    Card.appendElement("section", this.score());
  };
  this.scoreEntryForm = function() {
    /////////////////////////////////////////////////////////////////
    // Create Score entry form
    var fragment = new DocumentFragment();
    var scoreEntryForm = document.createElement("form");
    scoreEntryForm.setAttribute("id", "score-entry-form");
    scoreEntryForm.setAttribute("action", "post");
    fragment.appendChild(scoreEntryForm);
    /////////////////////////////////////////////////////////////////
    var scoreEntryLabel = document.createElement("label");
    scoreEntryLabel.setAttribute("id", "score-entry-label");
    scoreEntryLabel.setAttribute("for", "score-entry-input");
    scoreEntryLabel.textContent = "Enter Intitials: ";
    scoreEntryForm.appendChild(scoreEntryLabel);
    /////////////////////////////////////////////////////////////////
    var scoreEntryInput = document.createElement("input");
    scoreEntryInput.setAttribute("id", "score-entry-input");
    scoreEntryInput.setAttribute("name", "score-entry-input");
    scoreEntryInput.setAttribute("type", "text");
    scoreEntryInput.required = true;
    scoreEntryForm.appendChild(scoreEntryInput);
    /////////////////////////////////////////////////////////////////
    var scoreEntrySubmit = document.createElement("input");
    scoreEntrySubmit.setAttribute("id", "score-entry-submit");
    scoreEntrySubmit.setAttribute("type", "submit");
    scoreEntrySubmit.setAttribute("value", "Submit");
    scoreEntryForm.appendChild(scoreEntrySubmit);

    return fragment;
  };
  this.appendScoreEntryForm = function() {
    Card.appendElement("section", this.scoreEntryForm());
  };
  this.render = function() {
    this.appendHeading();
    this.appendScore();
    this.appendScoreEntryForm();
    console.log(this.scoreEntryForm());
  };
}

/////////////////////////////////////////////////////////////////
// TODO: Report to the user a desc sorted list of high scores
//          (object header, (scores list & buttuns), empty container)
// ......... Create a JavaScript Object to hold the final scores list and interactive elements.
// ......... TODO: Allow User to start the quiz over again
// ......... TODO: Allow User to reset High Scores
var TopScores = function(Card) {
  this.headingText = "High Scores";
  this.heading = function() {
    var headingNode = document.createElement("h1");
    headingNode.textContent = this.headingText;
    return headingNode;
  };
  this.appendHeading = function() {
    Card.appendElement("heading", this.heading());
  };
  this.scores = [];
  this.highscoresSection = function() {
    /////////////////////////////////////////////////////////////////
    // Create a container to hold high scores and assoc actions (start again & clear highscores)
    var fragment = new DocumentFragment();
    var highscoresSection = document.createElement("section");
    highscoresSection.setAttribute("id", "highscores-section");
    // Create child container to hold desc sorted high scores (ordered list)
    var highscoresOL = document.createElement("ol");
    highscoresOL.setAttribute("id", "highscores-ol");
    highscoresSection.appendChild(highscoresOL);
    // Create Play Again Button /////////////////////////////////////
    var playAgainBtn = document.createElement("button");
    playAgainBtn.setAttribute("id", "start-quiz-btn");
    playAgainBtn.textContent = "Play Again!";
    highscoresSection.appendChild(playAgainBtn);
    // Create Clear High Scores Button //////////////////////////////
    var clearHighscoresBtn = document.createElement("button");
    clearHighscoresBtn.setAttribute("id", "clear-highscores-btn");
    clearHighscoresBtn.textContent = "Clear Highscores";
    highscoresSection.appendChild(clearHighscoresBtn);

    return fragment.appendChild(highscoresSection);
  };
  this.appendHighscoresSection = function() {
    Card.appendElement("section", this.highscoresSection());
  };
  this.render = function() {
    this.appendHeading();
    this.appendHighscoresSection(); 
  };
};

/////////////////////////////////////////////////////////////////
/// Events //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
///// singletons
var QuestionCard = new AppendCard(CardIds);
console.log(QuestionCard);

var Greeting = new GreetingMessage(QuestionCard);
console.log(Greeting);
//Greeting.render();

var Quiz = new CodeQuiz(QuestionCard, questionsJsonStr);
console.log(Quiz);
//Quiz.render();

var Report = new QuizReport(QuestionCard);
console.log(Report);
//Report.render();

var Scores = new TopScores(QuestionCard);
console.log(Scores);
Scores.render();
