// Harrison Noblett's Code Quiz 
// QUESTIONS ---------------------------------------------
var questionsAsked = [
    {
        title: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<javascript>", "<scripting>", "<js>"],
        answer: "<script>"
    },
    {
        title: "Where is the correct place to insert a JavaScript?",
        choices: ["Both the <head> section and the <body> section are correct", "the <body> section", "The <head> section"],
        answer: "Both the <head> section and the <body> section are correct"
    },
    {
        title: "The external JavaScript file must contain the <script> tag.",
        choices: ["True", "False"],
        answer: "False"
    },
    {
        title: "How do you creat a function in JavaScript?",
        choices: ["function myFunction()", "function = myFunction()", "function:myFunction()"],
        answer: "function myFunction()"
    },
    {
        title: "How to write an IF statement in JavaScript?",
        choices: ["if i = 5", "if i = 5 then", "if (i ==5)", "if i == 5 then"],
        answer: "if (i ==5)"
    },
];

// VARIABLES ----------------------------------
var score = 0;
var questionIndex = 0;

var timeEl = document.querySelector("#timeEl");
var quizEl = document.querySelector("#startQuiz")
var questions = document.querySelector("#questions");
var wrapper = document.querySelector("#wrapper");

var seconds = 76;
var secondsTaken = 5;
var holdEl = 0;
var ulEl = document.createElement("ul");

// FUNCTIONS -----------------------------------
quizEl.addEventListener("click", function () {
    if (holdEl === 0) {
        holdEl = setInterval(function (){
            seconds--;
            timeEl.textContent = "Time: " + seconds;

            if(seconds <= 0) {
                clearInterval(holdEl);
                allDone();
                timeEl.textContent = "Time's up!"
            }
        }, 1000);
    }
    search(questionIndex);
});

function search(questionIndex) {
    questions.innerHTML = "";
    ulEl.innerHTML = "";
    for (var i = 0; i < questionsAsked.length; i++) {

    var userQuestions = questionsAsked[questionIndex].title;
    var userChoices = questionsAsked[questionIndex].choices;
    questions.textContent = userQuestions;
    }
    userChoices.forEach(function (newItem) {
        var listEl = document.createElement("li");
        listEl.textContent = newItem;
        questions.appendChild(ulEl);
        ulEl.appendChild(listEl);
        listEl.addEventListener("click", (inspect));
    })
}

function inspect(element) {
    var element = element.target;
    console.log (element);

    if (element.matches("li")) {
        var divEl = document.createElement("div");
        divEl.setAttribute("id", "divEl");
        if (element.textContent == questionsAsked[questionIndex].answer) {
            score++;
            divEl.textContent = "Right! The right answer is: " + questionsAsked[questionIndex].answer;
        } else {
            seconds = seconds - secondsTaken;
            divEl.textContent = "Wrong! The right answer was: " + questionsAsked[questionIndex].answer;
        }
    }

    questionIndex++;

    if (questionIndex >= questionsAsked.length) {
        finished();
        divEl.textContent = "That is all!" + " " + "You got a" + score + "/" + questionsAsked.length + "Right!";
    } else {
        search(questionIndex);
    }
    questions.appendChild(divEl);
}
// FINISHED QUIZ CODE -----------------------------------
function finished() {
    questions.innerHTML = "";
    timeEl.innerHTML = "";

    var h1El = document.createElement("h1");
    h1El.setAttribute("id", "h1El");
    h1El.textContent = "Finished!";
    questions.appendChild(h1El);

    var pEl = document.createElement("p");
    pEl.setAttribute("id", "pEl");
    questions.appendChild(pEl);

    if (seconds >= 0) {
        var remainTime = seconds;
        var pEl2 = document.createElement("p");
        clearInterval(holdEl);
        pEl.textContent = "Your final score is: " + remainTime;

        questions.appendChild(pEl2);
    }

    var labelEl = document.createElement("label");
    labelEl.setAttribute("id", "labelEl");
    labelEl.textContent = "Type in your initials: ";
    questions.appendChild(labelEl);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("id", "initials");
    input.textContent = "";
    questions.appendChild(input);

    var submitEl = document.createElement("button");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "submit");
    submitEl.textContent = "Submit";
    questions.appendChild(submitEl);

    submit.addEventListener("click", function () {
        var initials = input.value;

        if(initials === null) {
            console.log("No value entered.");
        } else {
            var final = {
                initials: initials,
                score: remainTime
            }
            console.log(final);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(final);
            var newest = JSON.stringify("allScores");
            localStorage.setItem("allScores", newest);
            window.location.replace("./highscores.html")
        }
    })
}