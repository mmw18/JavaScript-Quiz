// The questions that will be asked in the quiz, and what the correct answer for each question is
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

/* Setting valued varables for timer and index, as well as declaring variables to hold each of our object values
in the 'View High Scores' list */
var index = 0
var userResponse;
var correctAnswer;
var score;
var timer = 45;
var timerEnable = true;

/* Pulling the stored information in local storage out in Object form, and assigning it to 
a variable we will use in the captureInit() and highScoresList() functions */
var highscoresArray = JSON.parse(localStorage.getItem('highscores')) || []

// Creating variables that will connect to elements in HTML
var landingContainer = document.getElementById('landing');
var questionContainer = document.getElementById('questions');
var questionTitle = document.getElementById('prompted-question');
var resultDisplay = document.getElementById('score-message');
var initialPrompt = document.getElementById('initials')
var scores = document.getElementById('scores');
// Ensuring the timer-code will run the first time the user interacts with the page
var isInitialized = false;


/* Function being called when the user clicks on the 'Start Quiz' or 'Play Again' buttons, 
that makes the timer count down by 1 second, starting at 45 seconds, during time of  being asked */
function init() {
	// Re-setting the intial timer value for re-play of game
	timer = 45;
	// Ensuring the timer code does not get re-ran when function is called again. See comment/code at the end of this function as well
	if (isInitialized) {
		return;
	}
	// Function that will decrease timer by 1 point every second
    var intervalId = setInterval(function () {
		// Decreasing timer value when timerEnabled var is true
		if (timerEnable) {
        	timer--;
		}
		// Connecting our 'timer' variable to the HTML
        document.getElementById('timer-count').textContent = timer;
		// Stop the timer when it reaches or goes below 0
        if (timer <= 0) {
            clearInterval(intervalId); 
			// Ensure timer is set to 0
            timer = 0;  
			// Calling next function when the timer is done
            completedInitials(); 
        }
		// Update the timer every 1 second (1000 milliseconds)
    }, 1000);
	/* Here we are setting the function to not be able to run again, since we are returning given a true 
	value at the top of this function. This ensure's the timer will only ever be counting down one second at a time. */
	isInitialized = true; 
}

/* Function that will start prompting for user to answer given questions, 
and will also ensure the timer will restart to count down from 45 seconds when
player chooses to 'Play Again' */
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

/* Function that will display our initial prompt screen, stopping the timer,
and displaying the user's score for them above initial input box */
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

/* Function that moves to the next question when the user selects an answer choice, display the result
of their last choice (correct or incorrect), and prompts for initials prompt page to be loaded once all
questions have been asked */
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

/* Function that decides if the user's selected answer choice is correct, and the message to be displayed for them
depending on the accuracy of that choice. This function also makes 10 seconds subtract from timer each time the user's
answer choice is wrong */
function renderResult() {
    if (userResponse === correctAnswer) {
        resultDisplay.textContent = "Selected right answer!";
    } else {
		timer -= 10;
        resultDisplay.textContent = "You've selected the wrong answer";
    }
}

/* Ensures that highscore values will only stick around through interaction with the 'Play Again' button, but not 
continue to exist through page reloads */
localStorage.clear();

/* Function that created the objects that will be seen in our 'View High Scores' list - that is the user's score
and initials per game. In this we are saving the score&initial per game to the local storage as a string */
function captureInit() {
	var user = document.getElementById('user-initials').value;
	var scoreNumber = timer;
	var userObj = {
		initial: user,
		score: scoreNumber
	}
	highscoresArray.push(userObj)
	// Ensuring the scores list is ordered from largest to smallest, going down the list
	highscoresArray.sort((a, b) => b.score - a.score);
	localStorage.setItem('highscores', JSON.stringify(highscoresArray))
	initialPrompt.classList.add('hide')
	playConfirm.classList.remove('hide')
}

/* Function that will load the High Scores list when the prompted buttons are clicked, 
displaying the information we are sending and retrieving from local storage*/
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

// Adding Event listener for 'clicks' on all interactable elements of the HTML
document.getElementById('start-button').addEventListener('click', start);

document.getElementById('submit').addEventListener('click', captureInit);

document.getElementById('playAgain').addEventListener('click', start);

document.getElementById('scoresList').addEventListener('click', highscoresList);

document.getElementById('viewScores').addEventListener('click', highscoresList);