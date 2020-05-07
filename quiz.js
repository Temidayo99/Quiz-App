const body = document.querySelector(".body");
const startButton = document.getElementById("start-btn");
const firstPage = document.querySelector(".first-page");
const container = document.querySelector(".container");
const questionContainer = document.getElementById("question-container");
const quizContainer = document.getElementById("quiz-container");
const quizPage = document.querySelector(".first");
const nextButton = document.getElementById("next-btn");
const questionElement = document.querySelector(".question-head");
const answerButtonsElement = document.getElementById("answer-buttons");
const scorePoint = document.querySelector(".score-point");
let questionCounterElement = document.querySelector(".countQuestion");

let point = 0,
	countQuestion = 0,
	maxScore = 100,
	answer1,
	answer2,
	answer3,
	answer4;

let sortQuestions, currentQuestionIndex, currentQuestion;

body.classList.add("body-flex");

// declare a function to start the quiz
function startQuiz() {
	startButton.classList.add("hide");
	nextButton.classList.remove("hide");
	quizPage.classList.add("hide");
	//show the questions randomly
	sortQuestions = questions.sort(() => Math.random() - .5);
	//time delay
	setTimeout(() => {
		body.classList.remove("body-flex");
		quizContainer.classList.remove("hide");
	}, 100);
	currentQuestionIndex = 0;
	point = 0;
	nextQuestion();
};

function resetState() {
	nextButton.classList.add("hide");
	if (answerButtonsElement.firstChild) {
		answerButtonsElement.innerHTML = "";
	};
};

// function to go to the next question
function nextQuestion() {
	resetState();
	currentQuestion = sortQuestions[currentQuestionIndex];
	showQuestion(currentQuestion);
};

// function to display the questions
function showQuestion(question) {
	questionElement.textContent = question.question;

	question.answers.forEach((option, index) => {
		index++;
		const button = document.createElement("button");
		button.innerHTML = option;
		button.classList.add("ans-btn");
		button.classList.add(`ans-btn-${index}`);
		answerButtonsElement.classList.remove("pointer-fix");

		answerButtonsElement.appendChild(button);

		if (question.answer === index) {
			button.dataset.correct = question.answer;
		}
		answer1 = document.getElementById("1");
		answer2 = document.getElementById("2");
		answer3 = document.getElementById("3");
		answer4 = document.getElementById("4");
		button.addEventListener("click", selectAnswer);
	});

	// increase the question counter
	questionCounterElement.innerText = `${currentQuestionIndex + 1} of ${sortQuestions.length}`;
};

// function to select answer
function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	
	// check if the selected answer is correct and add green background
	if (correct) {
		point +=20;
		scorePoint.textContent = `${point}`;
		selectedButton.classList.add("correct");
		selectedButton.classList.add("white");
		answerButtonsElement.classList.add("pointer-fix");
	} else {
		// add red background to the wrong option
		selectedButton.classList.add("wrong");
		selectedButton.classList.add("white");
		answerButtonsElement.classList.add("pointer-fix");
	
//add green background to the correct answer
	if (answerButtonsElement.answer === 1) {
			answer1.classList.add("correct");
		} else if (answerButtonsElement.answer === 2) {
			answer2.classList.add("correct");
		} else if (answerButtonsElement.answer === 3) {
			answer3.classList.add("correct");
		} else if (answerButtonsElement.answer === 4) {
			answer4.classList.add("correct");
		};
	};

	if(sortQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide");
	} else {
		setTimeout(() => {
			showResults();
		}, 1500);
	};
};

//function to show results
function showResults() {
	container.innerHTML = "";
	document.body.classList.add("body-flex");
	const markup = `
    <div class="end-quiz-container">
        <h1 class="end-quiz">Nice Try!</h1>
        <h2 class="end-sscore">
        You scored 
        </h2>
        <p class="sscore">${point}<span> out of ${maxScore}</span></p>
        <button id="btn-again" class="btn-reload btn">
            Play Again
        </button>
    </div>
    `;

	container.insertAdjacentHTML("afterbegin", markup);

	document.getElementById("btn-again").addEventListener("click", () => {
		window.location.reload();
	});
};

//my questions and the correct answers
const questions = [
	{
		question: "Which is the correct CSS syntax?",
		answers: [
			"body: color=black",
			"{body; color:black",
			"{body: color = black(body)}",
			"body {color: black}",
		],
		answer: 4,
	},

	{
		question: "What does HTML stand for?",
		answers: [
		"Hyper Text Markup Language",
		"Hyper Tool Markup Language",
		"Home Tool Markup Language",
		"Home Text Markup Language",
		],
		answer: 1,
	},

	{
		question: "What is the full meaning of CSS?",
		answers: [
			"Cascading Standard Sheet",
			"Creative Style Sheet",
			"Cascading Style Sheet",
			"Creative Standard Sheet",
		],
		answer: 3,
	},

	{
		question: "The page title is inside the __ tag",
		answers: [
			"Body",
			"Head",
			"Html",
			"Header",
		],
		answer: 2,
	},

	{
		question: "Which property applies color to text?",
		answers: [
			"color",
			"background-color",
			"text-color",
			"margin-color",
		],
		answer: 1,
	},
];

//EVENT LISTENER//
//start quiz 
startButton.addEventListener("click", startQuiz);


nextButton.addEventListener("click", () => {
	currentQuestionIndex++;
	nextQuestion();
});