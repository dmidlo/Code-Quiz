/////////////////////////////////////////////////////////////////
/// DOM Elements ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// create a header to hold the following:
// ........reate a link to show the user the high scores.
// ................. TODO: User should not be able to see high scores while in game.
var highscoresAnchor = document.getElementById("view-highscores-anchor");
console.log(highscoresAnchor);



/////////////////////////////////////////////////////////////////
// ........ Create a indicator to show time elapsed while in game.
// TODO: create 75 second timer that begins when quiz start button is clicked
var timerSpan = document.getElementById("timer-span");
console.log(timerSpan);



/////////////////////////////////////////////////////////////////
// create a article container to hold the question card.
var questionCard = document.getElementById("question-card");
console.log(questionCard);
/////////////////////////////////////////////////////////////////
// ........ Create a section for the question text header
// ........ Create a section container to hold the answers
// ........ Create a section container to report the result of choice of answer.
var questionHeader = questionCard.querySelector("#question-header");
console.log(questionHeader);
/////////////////////////////////////////////////////////////////
var questionAnswers = questionCard.querySelector("#question-answers");
console.log(questionAnswers);
/////////////////////////////////////////////////////////////////
var questionFooter = questionCard.querySelector("#question-footer");
console.log(questionFooter);



/////////////////////////////////////////////////////////////////
// Create a "Start Quiz!" button for inserting into the start screen
var startQuizBtn = document.createElement("button");
startQuizBtn.setAttribute("id", "start-quiz-btn");
startQuizBtn.textContent = "Start Quiz!";
console.log(startQuizBtn);


/////////////////////////////////////////////////////////////////
// Create an Ordered List to be updated for each question's answers
// list should have no more than 4 possible answers.  3 + 1 correct solution. (unless new question types are introduced.)
var possibleAnswersOL = document.createElement("ol");
possibleAnswersOL.setAttribute("id", "possible-answers-ol");
console.log(possibleAnswersOL);

/////////////////////////////////////////////////////////////////
// Create footer correct/incorrect with horizontal rule
var footerSection = document.createElement("section");
footerSection.setAttribute("id", "footer-section");
/////////////////////////////////////////////////////////////////
footerSection.appendChild(document.createElement("hr"));
/////////////////////////////////////////////////////////////////
var footerCorrect = document.createElement("blockquote");
footerCorrect.textContent = "Right!"
console.log(footerCorrect);
/////////////////////////////////////////////////////////////////
var footerInCorrect = document.createElement("blockquote");
footerInCorrect.textContent = "Wrong!!";
console.log(footerInCorrect);
console.log(footerSection);



/////////////////////////////////////////////////////////////////
/// JS Variables ////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// Create a greeting message JavaScript Object that confroms to the three row layout.
// "Coding Quiz Challenge"
// "To answer the following code-related questions within the time. Keep in mind, incorrect answers will penalize your score/time by 10 seconds."
var GreetingMessage = {
    headingText: "Coding Quiz Challenge",
    descriptionText: "To answer the following code-related questions within the time. Keep in mind, incorrect answers will penalize your score/time by 10 seconds."
};
console.log(GreetingMessage);
console.log(GreetingMessage.headingText);
console.log(GreetingMessage.descriptionText);



/////////////////////////////////////////////////////////////////
// TODO: Create a JavaScript Object to report their final score to the user and enter and submit their initials
//          (object should conform to existing card containers (3x: textHeader, (answer/finalscore & enter initials), leave the last container empty.))
var QuizReport = {
    headingText: "All Done!",
    scoreMessage: "Your Final Score is: "
};
console.log(QuizReport);
console.log(QuizReport.headingText);
console.log(QuizReport.scoreMessage);


/////////////////////////////////////////////////////////////////
// TODO: Report to the user a desc sorted list of high scores
//          (object header, (scores list & buttuns), empty container)
// ......... Create a JavaScript Object to hold the final scores list and interactive elements.
// ......... TODO: Allow User to start the quiz over again
// ......... TODO: Allow User to reset High Scores
var TopScores = {
  headingText: "High Scores",
  scoreMessage: "Your Final Score is: "
};
console.log(TopScores);
console.log(TopScores.headingText);
console.log(TopScores.scoreMessage);


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
