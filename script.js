// // There are four different states: 1) Landing/Intro page w/ instructions for quiz
// //      2) Question and answer page for each quiz question, 3) page asking for user 
// //       to input initials for the high scores, 4) view high scores page
// // We will need some mechanism to change between UI states
// // Define our questions and answers
// // Display the quesions and answers on the screen
// // Specify the correct answer for each question to create score and affect time
// // Need a way to move to the next question after answering one
// // We need to define a timer
// // Once timer is created, we will need a way to add or remove seconds from it
// // When there are no more questions, the quiz ends and moves to the next screen states
// // OR when the timer runs out the quiz will end and moves to the next screen state
// // The user should be able to see the high scores list, organized by score, through clicking 
// //      'view high score' link at top left of screen and after each game

// var questionElement = document.getElementById("prompted-question");
// var answersElement = [
//     document.getElementById("answer-one"),
//     document.getElementById("answer-two"),
//     document.getElementById("answer-three"),
//     document.getElementById("answer-four")
// ];

// // var pageOptions = ["landing", "questions", "initials", "scores"];
// var displayedQuestionIndex = 0;


// function eventAnswerIncorrect() {

// }

// function eventAnswerCorrect() {
//     window.alert("hi");
// }

// function populateQuestion(index) {
//     const currentQuestion = myQuestions[index];
//     console.log(currentQuestion.question);
//     questionElement.textContent = currentQuestion.question;

//     // Loop through the answer keys (a, b, c, d) and populate the answer elements
//     for (let key in currentQuestion.answers) {
//         const answerIndex = key.charCodeAt(0) - 'a'.charCodeAt(0); // Calculate the answer index
//         answersElement[answerIndex].textContent = currentQuestion.answers[key];
//         if currentQuestion.answers[key] === correctAnswer.correctAnswer
//         answersElement[answerIndex].addEventListener("click", eventAnswerCorrect);
//     }
// }


// // function addAnswerEventListeners(index) {
// //     const currentQuestion = myQuestions[index];
// //     for (let key in currentQuestion.answers) {
// //         const answerIndex = key.charCodeAt(0) - 'a'.charCodeAt(0); // Calculate the answer index
// //         answersElement[answerIndex].textContent = currentQuestion.answers[key];
// //     }
// // }

// // function populateQuestion(index) {
// //     const currentQuestion = myQuestions[index];
// //     questionElement.textContent = currentQuestion.question;

// //     currentQuestion.answers.forEach((answer, i) => {
// //         answersElement[i].textContent = answer;
// //     });
// // }

// function setPage(page) {
//     // Know what page we need to set to for change
//     // Update HTML to load that 

//     console.log(page, "page");
//     var pages = document.getElementsByTagName("section")
//     console.log(pages);
//     for (let i = 0; i < pages.length; i++) {
//         pages[i].classList.add("hide");
//       }
//     var pageELement = document.getElementById(page);
//     pageELement.classList.remove("hide");
// }

// setPage(pageOptions[1]); 
// populateQuestion(displayedQuestionIndex);

// function displayQuestions() {
// 	document.getElementById('options').innerHTML = ''
// 	// change the content of quetionTitle
// 	questionTitle.textContent = myQuestions[index].question
// 	for (var i = 0; i < myQuestions[index].answers.length; i++) {
// 		// create the element
// 		var btn = document.createElement('button')
// 		// add content to the element
// 		btn.textContent = myQuestions[index].answers[i]

// 		btn.addEventListener('click', check)
// 		// append the element
// 		document.getElementById('options').append(btn)
// 		correctAnswer = myQuestions[index].correct
// 		userResponse = parseInt(event.target.getAttribute("data-index"));
// 		renderResult();
// 	}

// }

// function renderResult() {
//     if (userResponse ===  correctAnswer) {
//         resultDisplay.textContent = "Selected right answer!";
//     } else {
//         resultDisplay.textContent = "You've selected the wrong answer";
//     }

// }

// function check() {
// 	console.log(this);
// 	index++;

// 	displayQuestions()
// }

// // const timerElement = document.getElementById("timer-count");


var myQuestions = [
	{
		question: "Inside which element do you put JavaScript?",
		answers: [
			'<var>',
			'<script>',
			'<section>',
			'<code>',
			'<tag>'
		],
		correct: 1
	},
	{
		question: "What is 30/3?",
		answers: [
			'3',
			'5',
			'10',
			'13',
			'0'
		],
		correct: 2
	},
	{
		question: "What is 56/7?",
		answers: [
			'8',
			'7',
			'9',
			'12',
			'3'
		],
		correct: 0
	},
	{
		question: "What is 44/11?",
		answers: [
			'14',
			'5',
			'4',
			'6',
			'9'
		],
		correct: 2
	},
	{
		question: "What is 10/2?",
		answers: [
			'2',
			'10',
			'20',
			'5',
			'8'
		],
		correct: 3
	}

];
var index = 0
var userResponse;
var correctAnswer;
var score;
var timer = 45;
var timerEnable = true;

var highscoresArray = JSON.parse(localStorage.getItem('highscores')) || []


var startBtn = document.getElementById('start-button');
var landingContainer = document.getElementById('landing');
var questionContainer = document.getElementById('questions');
var questionTitle = document.getElementById('prompted-question');
var resultDisplay = document.getElementById('score-message');
var initialPrompt = document.getElementById('initials')
var scores = document.getElementById('scores');
var isInitialized = false;


function init() {
	timer = 45;
	if (isInitialized) {
		return;
	}
    document.getElementById('timer-count').textContent = timer;
    var intervalId = setInterval(function () {
		if (timerEnable) {
        	timer--;
		}
        document.getElementById('timer-count').textContent = timer;
        if (timer <= 0) {
            clearInterval(intervalId); // Stop the timer when it reaches or goes below 0
            timer = 0; // Ensure timer is set to 0
            completedInitials(); // Call your function when the timer is done
        }
    }, 1000); // Update the timer every 1 second (1000 milliseconds)
	isInitialized = true; 
}

function start() {
	index = 0;
	landingContainer.classList.add('hide');
	playConfirm.classList.add('hide');
	questionContainer.classList.remove('hide');
	timerEnable = true;
	resultDisplay.textContent = "";
	displayQuestions();
	init();
}

function completedInitials() {
	questionContainer.classList.add('hide');
	initialPrompt.classList.remove('hide');
	timerEnable = false;
	var userScore = timer;
	console.log("User Score: ", userScore);
}
// Function that will display the questions and answer options
function displayQuestions() {
	// Guard against out of bounds index - jumping to initials page
	if(index >= myQuestions.length) {
		return;
	}
	// Making the answer choices for each question disapear when the new question and it's answers are loaded
    document.getElementById('options').innerHTML = '';
    // Change the content of questionTitle
    questionTitle.textContent = myQuestions[index].question;
    for (var i = 0; i < myQuestions[index].answers.length; i++) {
        // Creating the buttons
        var btn = document.createElement('button');
        // Add content of 'answers' of each question to the buttons 
        btn.textContent = myQuestions[index].answers[i];
        // Changing answer choices to be displayed on buttons, in accordance with the index value we are on
        btn.setAttribute('data-index', i);
		// When an answer choice is clicked, the 'check' function is ran
        btn.addEventListener('click', check);
        // Adding our buttons and their previously decided values to the 'options' Id in our HTML
        document.getElementById('options').append(btn);
		// Creating variable for the correct answer, that we can/will use to decide score message displayed and time-count alerations
		correctAnswer = myQuestions[index].correct;
    }
}


function check(event) {
    // Get the user's response from the clicked button's data-index attribute
    userResponse = parseInt(event.target.getAttribute("data-index"));
    renderResult();
	index++;
	displayQuestions();
	if (index === myQuestions.length) {
        completedInitials();
    }
}

function renderResult() {
    if (userResponse === correctAnswer) {
        resultDisplay.textContent = "Selected right answer!";
    } else {
		timer -= 10;
        resultDisplay.textContent = "You've selected the wrong answer";
    }
}

localStorage.clear();

function captureInit() {
	var user = document.getElementById('user-initials').value;
	var scoreNumber = timer;
	var userObj = {
		initial: user,
		score: scoreNumber
	}
	console.log(userObj);
	highscoresArray.push(userObj)
	localStorage.setItem('highscores', JSON.stringify(highscoresArray))
	initialPrompt.classList.add('hide')
	playConfirm.classList.remove('hide')
}

function highscoresList() {
	landingContainer.classList.add('hide');
	questionContainer.classList.add('hide');
	initialPrompt.classList.add('hide');
	playConfirm.classList.add('hide');
	scores.classList.remove('hide')

	for (var i = 0; i < highscoresArray.length; i++) {
		// create the li
		var li = document.createElement('li')
		// add the text content to each li
		li.textContent = highscoresArray[i].initial + ' ' + highscoresArray[i].score
		// append the li tp the ol element
		document.getElementById('list').append(li)
	}
}
// highscoresList()

startBtn.addEventListener('click', start);

document.getElementById('submit').addEventListener('click', captureInit);

document.getElementById('playAgain').addEventListener('click', start);

document.getElementById('scoresList').addEventListener('click', highscoresList);

document.getElementById('viewScores').addEventListener('click', highscoresList);