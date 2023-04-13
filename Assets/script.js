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
//if out of time game ends (if true)
var stopTime = false; 

var highScores = [];

//init func 
init();

function init() {
    highScores = JSON.parse(localStorage.getItem("highScores"));
    if (!highScores) {
        highScores = [];
    }
    saveQuestions();
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
    startBtn.addEventListener("click", funtion(){
        startTimer();
        loadQuestions(questionIndex);
    }) ;
}

function loadQuestions(questionIndex) {
    startBtn.setAttribute("style", "display:none");
    var question = document.createElement("h3");
    question.textContent = questionFuncs[questionIndex]().question;
    document.getElementById("question").appendChild(question);

    for (var i = 0; i < questionFuncs[questionIndex]().guess.length; i++){
        buttons[i] = document.createElement("button");
        buttons[i].textContent = i+1 + ": " + questionFuncs[questionIndex]().guess[i];
        document.getElementById("buttons").appendChild(buttons[i]);
    }
    buttonInfo(0);
    buttonInfo(1);
    buttonInfo(2);
    buttonInfo(3);


    function buttonInfo(buttonIndex) {
        buttons[buttonIndex].addEventListener("click", function() {
            if (guesses[buttonIndex]=== questionFuncs[questionIndex]().answer) {
                var line = document.createElement("hr");
                var correct = document.createElement("p");
                correct.textContent = "CORRECT";
                document.body.appendChild(line);
                document.body.appendChild(correct);
                var count = 1;
                var timeInterval = setInterval(function(){
                    count--;

                    if (count === 0) {
                        clearInterval(timeInterval);
                        count = 1;
                        question.remove();
                        line.remove();
                        correct.remove();

                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].remove();
                        }
                        questionIndex++;

                        if (questionIndex < questionFuncs.length) {
                            setQuestions(questionIndex);
                        }
                        else {
                            stopTime = true
                            sumbitScore(highScores);
                        }
                    }
                }, 1000)
            } else {
                var line = document.createElement("hr");
                var wrong = document.createElement("p");
                wrong.textContent = "WRONG";
                document.body.appendChild(line);
                document.body.appendChild(wrong);
                var count = 1
                var timeInterval = setInterval(funtion() {
                    count--;

                    if (count === 0) {
                        clearInterval(timeInterval);
                        count = 1;
                        line.remove();
                        wrong.remove();
                        buttons[buttonIndex].remove();
                        timeLeft = timeLeft - 15;
                    }
                }, 1000);
            }
        });
    }
}

//submit score func
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


//questions stored locally
function questionsStored() {
    var question1 = {
        question: "What is Harry Potter's middle name?",
        guess: ["John, Jim, James, Joe"],
        answer: "James"
    }
    var question2 = {
        question: "How many books are in the series?",
        guess: ["5, 6, 7, 8"],
        answer: "8"
    }
    var question3 = {
        question: "What house is Draco Malfoy in?",
        guess: ["Griffindor, Ravenclaw, Hufflepuff, Slytherin"],
        answer: "Slytherin"
    }
    var question4 = {
        question: "What is the name that everyone is scared to say?",
        guess: ["Volleyball, Voldemort, Moldywart, Dumbledore"],
        answer: "Voldemort"
    }
    localStorage.setItem("question1", JSON.stringify(question1));
    localStorage.setItem("question2", JSON.stringify(question2));
    localStorage.setItem("question3", JSON.stringify(question3));
    localStorage.setItem("question4", JSON.stringify(question4));
};

//question functions 
var questionFuncs = [
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