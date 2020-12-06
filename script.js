// set questions as object variables.
const questions = [
    {
        question: "A variable that cannot be re-declared or assigned is defined as ...",
        choices: ["const", "var", "let", "none of the above"],
        answer: "const",
        userAnswer: "const",
        outcome: false,
        time: 0
    },
    {
        question: "Which are true of NaN?",
        choices: ["It is a number", "It stand for Not a Number", "NaN != NaN", "All of the Above"],
        answer: "All of the Above",
        userAnswer: "All of the Above",
        outcome: false,
        time: 0
    },
   {
        question: "Which is not a simple datatype and can not be mutated?",
        choices: ["Numbers", "Strings", "Objects", "Boolean"],
        answer: "Objects",
        userAnswer: "Objects",
        outcome: false,
        time: 0
    },
   {
        question: "Given y=10 in the following use of the % operater x = y % 3 then which is true for x",
        choices: ["x = 0", "x = 1", "x = 2", "x = 3"],
        answer: "x = 1",
        userAnswer: "x = 1",
        outcome: false,
        time: 0
    },
  {
        question: "How do you call a function named - myFunction?",
        choices: ["call function myFunction()", "function myFunction()", "myFunction{}", "myFunction()"],
        answer: "myFunction()",
        userAnswer: "myFunction()",
        outcome: false,
        time: 0
    }

  ];

//   set initial variables
function beginKwiz(){
let time = 76;
const penaltyTime = 10;
let currentQuestion = 0;
timeDisplayElement = document.getElementById("time-display")

function firstButtons() {
    document.getElementById("start-btn").addEventListener("click", function(){
        document.getElementById("main-container").innerHTML = "";
        currentQuestion = 0;
        showQuestion();
        timer();
    });
    document.getElementById("view-highscore-btn").addEventListener("click", function(){
        handleHighscore();
    });
    
}
firstButtons();



// Declare timer function that counts down in seconds and create element in which to display the timer
function timer() {
    mainInterval = setInterval(function(){
        time--;
        timeDisplayElement.innerHTML = "TIME LEFT " + time + "s";
        if (time < 0){
            clearInterval(mainInterval);
            timeDisplayElement.innerHTML = "TIME IS UP";
            renderEndGame();
        }
    }, 1000);
}

//create container to be populated with rows and columns with new content.
let containerElement = document.getElementById("main-container");

function createRow(rowTotal, content) {
    
    for (let i = 0; i < rowTotal; i++){
        const rowElement = document.createElement("div");
        rowElement.setAttribute("class", "row")
        const colElement = document.createElement("div");
        colElement.setAttribute("class", "col");
        colElement.append(content);
        rowElement.append(colElement);
        containerElement.append(rowElement);
        
    }
}

// Create Questions section and question elements
function showQuestion() {
    containerElement.innerHTML = "";
    const questionElement = document.createElement("h2");
    questionElement.innerHTML = questions[currentQuestion].question;
    
    createRow(1, questionElement);

    let answerElement = "";
    
    for(let i=0; i < questions[currentQuestion].choices.length; i++){

        answerElement = document.createElement("button");
        answerElement.setAttribute("class", "btn btn-info m-1");
        answerElement.innerHTML = questions[currentQuestion].choices[i];
        createRow(1, answerElement)

        answerElement.addEventListener("click", function(){
            questions[currentQuestion].userAnswer = questions[currentQuestion].choices[i];
            checkAnswer();
            switchQuestion();
        })
    }
}
// Verify user Answers; if Answer is wrong deduct 10s
function checkAnswer () {

    if (questions[currentQuestion].answer === questions[currentQuestion].userAnswer)
    {
        questions[currentQuestion].outcome = true;
        questions[currentQuestion].time = time;
        document.getElementById("outcomeDisplay").innerHTML = "Correct!";
        setTimeout(function(){
            document.getElementById("outcomeDisplay").innerHTML = "";
        }, 1500);
        
    } else {
        subtractTime()
        questions[currentQuestion].outcome = false;
        document.getElementById("outcomeDisplay").innerHTML = "Incorrect!";
        setTimeout(function(){
            document.getElementById("outcomeDisplay").innerHTML = "";
        }, 1500);
        
    }
}
        function subtractTime() {
        time = time - penaltyTime;
}

// Carry on to next question if length of array has not been reached
function switchQuestion() {
    if(currentQuestion < (questions.length-1)){
        currentQuestion = currentQuestion + 1;
        showQuestion();
    } else {
        time=0;
    }   
}

// Calculate final score as being equal to time left after question 5
function calcFinalScore() {
    let finalScore = questions[4].time;
    for(let i = 0; i < questions.length; i++){
        if(questions[i].outcome){
            finalScore = questions[4].time;
        }
    }
    return finalScore; 
}

// Display Score, let user name game is over and Request User name for HighScore Board
function renderEndGame() {
    containerElement.innerHTML = "";
    // Game is Over Notification
    const endGameMessageElement = document.createElement('div');
    endGameMessageElement.setAttribute('class', 'display-3');
    endGameMessageElement.innerText = "Game is Over!";
    // Let user know what their score is
    const userScoreMessageElement = document.createElement('h4');
    userScoreMessageElement.innerHTML = "Your final score is: "+ calcFinalScore();
    endGameMessageElement.append(userScoreMessageElement);
    // Request user input 
    const initialMessageElement = document.createElement('div');
    initialMessageElement.setAttribute('class', 'user-input');
    initialMessageElement.innerHTML = "Enter your name here: <input type='text' id='initial-input'></input>"
    endGameMessageElement.append(initialMessageElement);
    // Submit score button that will also be used to creat event Listener to generate highscores record
    const addHighScoreBtnElement = document.createElement('button');
    addHighScoreBtnElement.setAttribute('class','btn btn-dark');
    addHighScoreBtnElement.setAttribute('id', 'submit-btn');
    addHighScoreBtnElement.innerText = "Submit Score";
    endGameMessageElement.append(addHighScoreBtnElement);
    createRow(1, endGameMessageElement);
    
    // creating empty array for highscores record
    addHighScoreBtnElement.addEventListener("click", function(){
        let highscores = [];
        if(localStorage.getItem('localHighscores')){
            highscores = localStorage.getItem('localHighscores');
            highscores = JSON.parse(highscores);
        }   else{
            let highscores = [];
        }
        const userInitial = document.getElementById('initial-input').value;
        const userScore = calcFinalScore();
        highscores[(highscores.length)] = {
            initial: userInitial,
            score: userScore
        }
        window.localStorage.setItem('localHighscores', JSON.stringify(highscores));
        handleHighscore(highscores);
    });
}
function handleHighscore(highscores) {
    if(localStorage.getItem('localHighscores')){
        highscores = localStorage.getItem('localHighscores');
        highscores = JSON.parse(highscores);
    }   else{
        highscores = [];
    }
    document.body.innerHTML = "";
    const highscoreContainerElement = document.createElement('div');
    highscoreContainerElement.setAttribute('class','container');
    // Title and elements for highscore page
    const highscoreTitleElement = document.createElement('div');
    highscoreTitleElement.setAttribute('class', 'display-2 text-center mb-3')
    highscoreTitleElement.innerHTML = "Record of Highscores";
    highscoreContainerElement.append(highscoreTitleElement);
    for (let i=0; i < highscores.length; i++){
        let highscoreDisplayElement = document.createElement('div');
        highscoreDisplayElement.setAttribute('class','m-1 bg-info text-white p-1')
        highscoreDisplayElement.innerText = (i+1)+". "+highscores[i].initial+" - "+highscores[i].score;
        highscoreContainerElement.append(highscoreDisplayElement);
    }
    // Buttons to Restart Quiz or Clear Record of Highscores and appending the Highscore elements to make them visible
    restartBtnElement = document.createElement('button');
    restartBtnElement.setAttribute('class', 'btn btn-light m-1');
    restartBtnElement.innerText = 'Restart The Kwiz';
    highscoreContainerElement.append(restartBtnElement);
    restartBtnElement.addEventListener('click', function(){
        document.location.reload()
    });
    clearScoresBtnElement = document.createElement('button');
    clearScoresBtnElement.setAttribute('class', 'btn btn-dark m-1');
    clearScoresBtnElement.innerText = 'Clear Highscores';
    highscoreContainerElement.append(clearScoresBtnElement);
    clearScoresBtnElement.addEventListener('click', function(){
        window.localStorage.removeItem('localHighscores');
        handleHighscore();
    });
    document.body.append(highscoreContainerElement);

}
}
beginKwiz()