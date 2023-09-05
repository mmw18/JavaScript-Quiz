
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
		question: "How do you write a single line comment in JavaScript?",
		answers: [
			'///',
			'/*',
			'//',
			'#',
			'/#'
		],
		correct: 2
	},
	{
		question: "Which of the following is NOT a primitive datatype in JavaScript?",
		answers: [
			'Object',
			'String',
			'Boolean',
			'Symbol',
			'Number'
		],
		correct: 0
	},
	{
		question: "How can a datatype be declared to be a constant type?",
		answers: [
			'var',
			'let',
			'const',
			'let const',
			'constant'
		],
		correct: 2
	},
	{
		question: "Arrays in JavaScript are defined by which of the following statements?",
		answers: [
			'it is a ordered list of constant variables',
			'It is an ordered list of functions',
			'It is an ordered list of string',
			'It is an ordered list of values',
			'It is an ordered list of objects'
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
	document.getElementById('scoreDisplay').textContent = userScore
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

document.getElementById('start-button').addEventListener('click', start);

document.getElementById('submit').addEventListener('click', captureInit);

document.getElementById('playAgain').addEventListener('click', start);

document.getElementById('scoresList').addEventListener('click', highscoresList);

document.getElementById('viewScores').addEventListener('click', highscoresList);