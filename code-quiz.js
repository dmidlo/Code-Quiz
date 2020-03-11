/////////////////////////////////////////////////////////////////
/// DOM Element Content /////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
// create a header to hold the following:
// ........reate a link to show the user the high scores.
// ................. TODO: User should not be able to see high scores while in game.
// this is defined in the HTML as it is persistent on the page.
var highscoresAnchor = document.getElementById("view-highscores-anchor");

/////////////////////////////////////////////////////////////////
// ........ Create a indicator to show time elapsed while in game.
// TODO: create 75 second timer that begins when quiz start button is clicked
// this is defined in the HTML as it is persistent on the page.
var timerSpan = document.getElementById("timer-span");

/////////////////////////////////////////////////////////////////
//  Create a JSON string containing questions, answers, and correct solution
//  FUTURE WORK: Allow Export of Questions JSON.
//  FUTURE WORK: allow user to import a properly formatted JSON string for custom questions
//  FUTURE WORK: add questionType (true-false, multiple-choice, all of the above, click #x that apply, etc...)
//  FUTURE WORK: add explainationText to answer objects
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
                ']' +
            '}' +
        '},' +
        '{"question":' +
            '{"questionText":"what is your favorite season?",' +
                '"answers": [' +
                    '{"answerText":"fall","solution":true},' +
                    '{"answerText":"winter"},' +
                    '{"answerText":"spring"},' +
                    '{"answerText":"summer"}' +
                ']' +
            '}' +
        '},' +
        '{"question":' +
            '{"questionText":"Commonly used Data Types DO NOT include _________?",' +
                '"answers": [' +
                    '{"answerText":"strings"},' +
                    '{"answerText":"booleans"},' +
                    '{"answerText":"alerts","solution":true},' +
                    '{"answerText":"numbers"}' +
                ']' +
            '}' +
        '},' +
        '{"question":' +
            '{"questionText":"The condition of an IF/ELSE statement is enclosed within ________?",' +
                '"answers": [' +
                    '{"answerText":"quotes"},' +
                    '{"answerText":"curly braces","solution":true},' +
                    '{"answerText":"parentheses"},' +
                    '{"answerText":"square brackets"}' +
                ']' +
            '}' +
        '},' +
        '{"question":' +
            '{"questionText":"Arrays in JavaScript can be used to store ________?",' +
                '"answers": [' +
                    '{"answerText":"numbers and strings"},' +
                    '{"answerText":"other arrays"},' +
                    '{"answerText":"booleans"},' +
                    '{"answerText":"All of these and more!","solution":true}' +
                ']' +
            '}' +
        '},' +
        '{"question":' +
            '{"questionText":"String values must be enclosed within ________ when being assigned to variables?",' +
                '"answers": [' +
                    '{"answerText":"commas"},' +
                    '{"answerText":"curly brackets"},' +
                    '{"answerText":"single or double quotes","solution":true},' +
                    '{"answerText":"parentheses"}' +
                ']' +
            '}' +
        '},' +
        '{"question":' +
            '{"questionText":"A very useful tool during development and debugging for printing content to the debugger is?",' +
                '"answers": [' +
                    '{"answerText":"JavaScript"},' +
                    '{"answerText":"Terminal/Bash"},' +
                    '{"answerText":"for loop"},' +
                    '{"answerText":"console.log","solution":true}' +
                ']' +
            '}' +
        '}' +
    ']}';

/////////////////////////////////////////////////////////////////
// ........ Create a section for the question text header
// ........ Create a section container to hold the answers
// ........ Create a section container to report the result of choice of answer.
function BindCard(Ids) {
    this.parent = document.getElementById(Ids.parentContainer);
    this.heading = this.parent.querySelector(Ids.headingId);
    this.section = this.parent.querySelector(Ids.sectionId);
    this.footer = this.parent.querySelector(Ids.footerId);
    this.bindElement = function (dstElement, value) { this[dstElement].appendChild(value); }
};


/////////////////////////////////////////////////////////////////
// Create a greeting message JavaScript Object that confroms to the three row layout.
// "Coding Quiz Challenge"
// "To answer the following code-related questions within the time. Keep in mind, incorrect answers will penalize your score/time by 10 seconds."
function GreetingMessage (Card) {
    this.headingText = "Coding Quiz Challenge",
    this.descriptionText = "To answer the following code-related questions within the time. Keep in mind, incorrect answers will penalize your score/time by 10 seconds.",
    this.heading = function () { 
        var headingNode = document.createElement("h1");
        headingNode.textContent = this.headingText;
        return headingNode;
     }
     this.bindHeading = function () {Card.bindElement("heading", this.heading());}
     this.description = function () {
         var descriptionNode = document.createElement("p")
         descriptionNode.textContent = this.descriptionText;
         return descriptionNode;
     }
     this.bindDescription = function () {Card.bindElement("section", this.description());}
    /////////////////////////////////////////////////////////////////
    // Create a "Start Quiz!" button for inserting into the start screen
    //var startQuizBtn = document.createElement("button");
    this.startQuizBtn = function () {
        var startQuizBtnNode = document.createElement("button");
        startQuizBtnNode.setAttribute("id", "start-quiz-btn");
        startQuizBtnNode.textContent = "Start Quiz!";
        return startQuizBtnNode;};
    this.bindStartQuizBtn = function () {Card.bindElement("section", this.startQuizBtn());}

    this.render = function () {
        Greeting.bindHeading();
        Greeting.bindDescription();
        Greeting.bindStartQuizBtn();
    }
};

function CodeQuiz (Card, JSONstr) {
    // Create counter to keep track of current question
    this.currentQuestion = 0;
    // Convert Questions JSON (str) into an javascript object
    this.questionsObj = JSON.parse(JSONstr);
    // Build the header for the current question
    this.currentQuestionHeader = function () { 
        var headingNode = document.createElement("h1");
        headingNode.textContent = this.questionsObj["questions"][this.currentQuestion]["question"].questionText;
        return headingNode;
    }
    this.bindHeading = function () {Card.bindElement("heading", this.currentQuestionHeader());}
    this.correctAnswerLI = null;
    this.incorrectAnswerLIs = null;
    this.possibleAnswers = function () {
        var incorrectAnswerLIs = [];
        (this.questionsObj["questions"][this.currentQuestion]["question"]["answers"]).forEach(function (element, i) {
            var AnswerLI = document.createElement("li");
            AnswerLI.setAttribute("data-item", i);
            if(element.hasOwnProperty("solution") && element["solution"] === true){
                AnswerLI.textContent = element["answerText"];
                AnswerLI.setAttribute("data-correct","true");
                this.correctAnswerLI = AnswerLI;
                
                console.log(this.correctAnswerLI);
            } else {
                AnswerLI.setAttribute("data-correct", "false");
                AnswerLI.textContent = element["answerText"];
                incorrectAnswerLIs.push(AnswerLI);
            }
        });
        this.incorrectAnswerLIs = incorrectAnswerLIs;
        console.log(this.incorrectAnswerLIs);
    }
    /////////////////////////////////////////////////////////////////
    // Create an Ordered List to be updated for each question's answers
    // list should have no more than 4 possible answers.  3 + 1 correct solution. (unless new question types are introduced.)
    this.possibleAnswersOL = function () {
        var possibleAnswersOLNode = document.createElement("ol");
        possibleAnswersOLNode.setAttribute("id", "possible-answers-ol");
        return possibleAnswersOLNode;
    };
    this.render = function () {
        this.bindHeading();
        this.possibleAnswers();
    }
};


/////////////////////////////////////////////////////////////////
// TODO: Create a JavaScript Object to report their final score to the user and enter and submit their initials
//          (object should conform to existing card containers (3x: textHeader, (answer/finalscore & enter initials), leave the last container empty.))
var QuizReport = {
    headingText: "All Done!",
    scoreMessage: "Your Final Score is: "
};


/////////////////////////////////////////////////////////////////
// TODO: Report to the user a desc sorted list of high scores
//          (object header, (scores list & buttuns), empty container)
// ......... Create a JavaScript Object to hold the final scores list and interactive elements.
// ......... TODO: Allow User to start the quiz over again
// ......... TODO: Allow User to reset High Scores
var TopScores = {
  headingText: "High Scores",
  scores: []
};









/////////////////////////////////////////////////////////////////
/// DOM Elements ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////











/////////////////////////////////////////////////////////////////
// Create footer correct/incorrect with horizontal rule
var footerSection = document.createElement("section");
footerSection.setAttribute("id", "footer-section");
footerSection.appendChild(document.createElement("hr"));
/////////////////////////////////////////////////////////////////
var footerCorrect = document.createElement("blockquote");
footerCorrect.setAttribute("id", "footer-correct");
footerCorrect.textContent = "Right!"
/////////////////////////////////////////////////////////////////
var footerInCorrect = document.createElement("blockquote");
footerInCorrect.setAttribute("id", "footer-incorrect");
footerInCorrect.textContent = "Wrong!!";


/////////////////////////////////////////////////////////////////
// Create Score entry form
var scoreEntryForm = document.createElement("form");
scoreEntryForm.setAttribute("id", "score-entry-form");
scoreEntryForm.setAttribute("action", "post");
/////////////////////////////////////////////////////////////////
var scoreEntryLabel = document.createElement("label");
scoreEntryLabel.setAttribute("id","score-entry-label");
scoreEntryLabel.setAttribute("for", "score-entry-input");
scoreEntryLabel.textContent = "Enter Intitials: "
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
scoreEntrySubmit.setAttribute("id","score-entry-submit");
scoreEntrySubmit.setAttribute("type", "submit");
scoreEntrySubmit.setAttribute("value", "Submit");
scoreEntryForm.appendChild(scoreEntrySubmit);


/////////////////////////////////////////////////////////////////
// Create a container to hold high scores and assoc actions (start again & clear highscores)
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






/////////////////////////////////////////////////////////////////
/// Functions ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
/// Events //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

var CardIds = {
  parentContainer: "question-card", //getbyID
  headingId: "#question-header", //QuerySelector
  section: "#question-answers", //QuerySelector
  footerId: "#question-footer" //QuerySelector
};

var QuestionCard = new BindCard(CardIds);
Greeting = new GreetingMessage(QuestionCard);
console.log(Greeting);
//Greeting.render();
Quiz = new CodeQuiz(QuestionCard, questionsJsonStr);
console.log(Quiz);
Quiz.render();

