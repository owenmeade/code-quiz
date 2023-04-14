var startBtn = document.querySelector(".start-btn");
var mainEl = document.querySelector("main");
var timeEl = document.querySelector(".time");

//set time
var timeLeft = 100;
//set question number
var questionIndex = 0;
//set score
var score = 0;
var buttons = [];
//keep track of guess attempts for time loss penalty
var guesses = [];
stopTime = false

var highScores = [];

//init func 
init();

function init() {
    highScores = JSON.parse(localStorage.getItem("highScores"));
    if (!highScores) {
        highScores = [];
    }
    questionsStored();
    runPage();
    setTimeText();
}


//timer text func
function setTimeText() {
    timeEl.textContent = timeLeft;
}

//timer func
function startTimer() {
    var timeInterval = setInterval(function() {
        timeLeft--;
        setTimeText();
        if(stopTime) {
            clearInterval(timeInterval);
            timeEl.textContent = timeLeft + 1;
        }
        if (timeLeft === 0) {
            clearInterval(timeInterval);
            
        }
    }, 1000)
}

function runPage() {
    startBtn.addEventListener("click", function() {
        startTimer();
        loadQuestions(questionIndex);
    });
}

function loadQuestions(_questionIndex) {
    startBtn.setAttribute("style", "display:none");
    var question = document.createElement("h3");
    question.textContent = getQuestion[_questionIndex]().question;
    //console.log(document.getElementById("question"));
    document.getElementById("questions").appendChild(question);

    for (var i = 0; i < getQuestion[_questionIndex]().guess.length; i++){
        var newButtons = document.createElement("button");
        newButtons.textContent = i+1 + ": " + getQuestion[_questionIndex]().guess[i];
        //guesses[i] = getQuestion[_questionIndex]().guess[i];
        newButtons.addEventListener("click", checkAnswer(i));
        document.getElementById("buttons").appendChild(newButtons);
        buttons.push(newButtons);  
    }
}
     //checkAnswer(0);
    // checkAnswer(1);
    // checkAnswer(2);
    // checkAnswer(3);


function checkAnswer(_questionIndex) {
        // console.log(guesses[_questionIndex]);
        // buttons[_questionIndex].addEventListener("click", function() {
            console.log(getQuestion[_questionIndex]().guess[_questionIndex]);
            if (getQuestion[_questionIndex]().guess[_questionIndex] === getQuestion[_questionIndex]().answer) {
                var lineAlert = document.createElement("hr");
                var correct = document.createElement("p");
                correct.textContent = "CORRECT";
                document.body.appendChild(lineAlert);
                document.body.appendChild(correct);
                var count = 1;
                var timeInterval = setInterval(function(){
                    count--;

                    if (count === 0) {
                        clearInterval(timeInterval);
                        count = 1;
                        question.remove();
                        lineAlert.remove();
                        correct.remove();

                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].remove();
                        }
                        questionIndex++;

                        if (questionIndex < getQuestion.length) {
                            getQuestion(questionIndex);
                        }
                        else {
                            if (timeLeft === 0)
                            sumbitScore(highScores);
                        }
                    }
                }, 1000)
            } else {
                var lineAlert = document.createElement("hr");
                var wrong = document.createElement("p");
                wrong.textContent = "WRONG";
                document.body.appendChild(lineAlert);
                document.body.appendChild(wrong);
                var count = 1;
                var timeInterval = setInterval(function() {
                    count--;
                    if (count === 0) {
                        clearInterval(timeInterval);
                        count = 1;
                        lineAlert.remove();
                        wrong.remove();
                        buttons[_questionIndex].remove();
                        timeLeft = timeLeft - 10;
                    }
                }, 1000);
            }
        };
    //}


//submit score function
function sumbitScore(arr) {
    var header = document.createElement("h2");
    header.textContent = "DONE!";
    document.body.appendChild(header);

    var endScore = document.createElement("p");
    score = timeLeft;
    endScore.textContent = "FINAL SCORE IS " + score;
    document.body.appendChild(endScore);

    var enterInitials= document.createElement("p");
    enterInitials.textContent = "ENTER INITIALS";
    document.body.appendChild(enterInitials);

    var input = document.createElement("input");
    document.body.appendChild(input);

    var submitBtn = document.createElement("button");
    submitBtn.textContent = "SUBMIT";
    document.body.appendChild(submitBtn);

    submitBtn.addEventListener("click", function() {
        var userHighScore = {
            name: input.value,
            highscore: score
        };

        arr.push(userHighScore);

        localStorage.setItem("highScores", JSON.stringify(highScores));
        window.location.href= "Assets/highscores.html";
    })
}


//store questions function
function questionsStored() {
    var question1 = {
        question: "What is Harry Potter's middle name?",
        guess: ["John", "Jim", "James", "Joe"],
        answer: "3: James"
    }
    var question2 = {
        question: "How many books are in the series?",
        guess: ["5", "6", "7", "8"],
        answer: "4: 8"
    }
    var question3 = {
        question: "What house is Draco Malfoy in?",
        guess: ["Griffindor","Ravenclaw", "Hufflepuff", "Slytherin"],
        answer: "4: Slytherin"
    }
    var question4 = {
        question: "What is the name that everyone is scared to say?",
        guess: ["Volleyball", "Voldemort", "Moldywart", "Dumbledore"],
        answer: "2: Voldemort"
    }
    localStorage.setItem("question1", JSON.stringify(question1));
    localStorage.setItem("question2", JSON.stringify(question2));
    localStorage.setItem("question3", JSON.stringify(question3));
    localStorage.setItem("question4", JSON.stringify(question4));
};

//question functions 
var getQuestion = [
    function getQ1() {
        var myQuestion = JSON.parse(localStorage.getItem("question1"));
        return myQuestion;
    },
    function getQ2() {
        var myQuestion = JSON.parse(localStorage.getItem("question2"));
        return myQuestion;
    },
    function getQ3() {
        var myQuestion = JSON.parse(localStorage.getItem("question3"));
        return myQuestion;
    },
    function getQ4() {
        var myQuestion = JSON.parse(localStorage.getItem("question4"));
        return myQuestion;
    }
]