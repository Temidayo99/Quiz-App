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
const correctAnswers = document.querySelector(".correct-answers")
const maxScore = document.querySelector(".max-score")
const endQuiz = document.querySelector(".end-quiz-container")

let point = 0,
	countQuestion = 0,
	answer1,
	answer2,
	answer3,
	answer4;

let sortQuestions, currentQuestionIndex, currentQuestion;

body.classList.add("body-flex");

function startQuiz() {
	startButton.classList.add("hide")
	nextButton.classList.remove("hide")
	quizPage.classList.add("hide")
	sortQuestions = questions.sort(() => Math.random() - .5)
	setTimeout(() => {
		body.classList.remove("body-flex");
		quizContainer.classList.remove("hide");
	}, 100);
	currentQuestionIndex = 0;
	point = 0
	nextQuestion();
}

const resetState = () => {
	nextButton.classList.add("hide");
	if (answerButtonsElement.firstChild) {
		answerButtonsElement.innerHTML = "";
	}
};

const nextQuestion = () => {
	resetState();
	currentQuestion = sortQuestions[currentQuestionIndex];
	showQuestion(currentQuestion);
}

function showQuestion(question) {
	questionElement.textContent = question.question

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
		
	questionCounterElement.innerText = `${currentQuestionIndex + 1} of ${sortQuestions.length}`
}

const selectAnswer = (e) => {
	const selectedButton = e.target
	const correct = selectedButton.dataset.correct
	
	if (correct) {
		point +=20
		scorePoint.textContent = `${point}`
		selectedButton.classList.add("correct")
		selectedButton.classList.add("white")
		answerButtonsElement.classList.add("pointer-fix")
	} else {
		selectedButton.classList.add("wrong")
		selectedButton.classList.add("white")
		answerButtonsElement.classList.add("pointer-fix")
	

	if (answerButtonsElement.answer === 1) {
			answer1.classList.add("correct");
		} else if (answerButtonsElement.answer === 2) {
			answer2.classList.add("correct");
		} else if (answerButtonsElement.answer === 3) {
			answer3.classList.add("correct");
		} else if (answerButtonsElement.answer === 4) {
			answer4.classList.add("correct");
		}
	}

	if(sortQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove("hide")
	} else {
		setTimeout(() => {
			showResults();
		}, 1500);
	}
};

const showResults = () => {
	container.innerHTML = "";
	document.body.classList.add("body-flex");
	const markup = `
    <div class="end-quiz-container">
        <h1 class="end-quiz">Nice Try!</h1>
        <h2 class="end-sscore">
        Your score is: 
        </h2>
        <p class="sscore">${point}</p>
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
		"Hypertext Markup Language",
		"Concurrent Style Sheet",
		"Cascading Style Sheet",
		"Concurrent Standard Sheet",
		],
		answer: 1,
	},

	{
		question: "What is the full meaning of CSS?",
		answers: [
			"Cascading Standard Sheet",
			"Concurrent Style Sheet",
			"Cascading Style Sheet",
			"Concurrent Standard Sheet",
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
		question: "Which property applies a color to text?",
		answers: [
			"color",
			"background-color",
			"text-color",
			"margin-color",
		],
		answer: 1,
	},
]

startButton.addEventListener("click", startQuiz)

nextButton.addEventListener("click", () => {
	currentQuestionIndex++
	nextQuestion()
})