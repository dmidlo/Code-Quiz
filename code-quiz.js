/////////////////////////////////////////////////////////////////
/// DOM Elements ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// TODO: create a header to hold the following:
// ........ TODO: Create a link to show the user the high scores.
// ................. User should not be able to see high scores while in game.
highscoresAnchor = document.getElementById("view-highscores-anchor");
console.log(highscoresAnchor);



/////////////////////////////////////////////////////////////////
// ........ TODO: Create a indicator to show time elapsed while in game.
// TODO: create 75 second timer that begins when quiz start button is clicked
timerSpan = document.getElementById("timer-span");
console.log(timerSpan);



/////////////////////////////////////////////////////////////////
// TODO: create a article container to hold the question card.
questionCard = document.getElementById("question-card");
console.log(questionCard);
/////////////////////////////////////////////////////////////////
// ........ TODO: Create a section for the question text header
// ........ TODO: Create a section container to hold the answers
// ........ TODO: Create a section container to report the result of choice of answer.
questionHeader = questionCard.querySelector("#question-header");
console.log(questionHeader);
/////////////////////////////////////////////////////////////////
questionAnswers = questionCard.querySelector("#question-answers");
console.log(questionAnswers);
/////////////////////////////////////////////////////////////////
questionFooter = questionCard.querySelector("#question-footer");
console.log(questionFooter);




/////////////////////////////////////////////////////////////////
/// JS Variables ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// TODO: Create a greeting message JavaScript Object that confroms to the three row layout.
// "Coding Quiz Challenge"
// "To answer the following code-related questions within the time. Keep in mind, incorrect answers will penalize your score/time by 10 seconds."
function GreetingMessage() {
  this.headingText = "Coding Quiz Challenge";
  this.descriptionText = "To answer the following code-related questions within the time. Keep in mind, incorrect answers will penalize your score/time by 10 seconds.";
};
greeting = new GreetingMessage();
console.log(greeting);



/////////////////////////////////////////////////////////////////
// TODO: Create a JavaScript Object to report their final score to the user and enter and submit their initials
//          (object should conform to existing card containers (3x: textHeader, (answer/finalscore & enter initials), leave the last container empty.))
function QuizReport() {
    this.headingText = "All Done!";
    this.scoreMessage = "Your Final Score is: "
}
greeting = new QuizReport();
console.log(greeting);


/////////////////////////////////////////////////////////////////
// TODO: Report to the user a desc sorted list of high scores
//          (object header, (scores list & buttuns), empty container)
// ......... TODO: Create a JavaScript Object to hold the final scores list and interactive elements.
// ......... TODO: Allow User to start the quiz over again
// ......... TODO: Allow User to reset High Scores
function TopScores() {
  this.headingText = "High Scores";
  this.scoreMessage = "Your Final Score is: ";
}
scores = new TopScores();
console.log(scores);


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

// Convert Questions JSON (str) into an javascript object
var questionsObj = JSON.parse(questionsJsonStr);
console.log(questionsObj);





/////////////////////////////////////////////////////////////////
/// Functions ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


/////////////////////////////////////////////////////////////////
/// Events //////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
