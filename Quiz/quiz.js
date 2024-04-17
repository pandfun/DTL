const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

let shuffledQuestions, currentQuestionIndex, score;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        setNextQuestion();
    } else {
        endGame();
    }
});

function startGame() {
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0; // Initialize score
    scoreContainer.classList.add("hide"); // Hide score container initially
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    if (correct) {
        score++; // Increment score if answer is correct
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        endGame();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function endGame() {
    questionContainerElement.classList.add("hide");
    setTimeout(() => {
        scoreElement.textContent = score + "/" + questions.length;
        scoreContainer.classList.remove("hide");
    }, 1000);
}

const questions = [
    {
        question:
            'What does the notation "O(n)" represent in asymptotic analysis?',
        answers: [
            { text: "Constant growth rate", correct: false },
            { text: "Linear growth rate", correct: true },
            { text: "Quadratic growth rate", correct: false },
            { text: "Exponential growth rate", correct: false },
        ],
    },
    {
        question: 'Which of the following is true about the notation "Ω(n)"?',
        answers: [
            {
                text: "It represents an upper bound on the growth rate.",
                correct: false,
            },
            {
                text: "It represents a lower bound on the growth rate.",
                correct: true,
            },
            { text: "It represents an exact growth rate.", correct: false },
            { text: "It represents no growth rate.", correct: false },
        ],
    },
    {
        question:
            "Which notation represents the worst-case time complexity of an algorithm?",
        answers: [
            { text: "O(n)", correct: true },
            { text: "Ω(n)", correct: false },
            { text: "Θ(n)", correct: false },
            { text: "O(1)", correct: false },
        ],
    },
    {
        question:
            "Which of the following efficiency classes represents the fastest growth rate?",
        answers: [
            { text: "O(1)", correct: false },
            { text: "O(logN)", correct: true },
            { text: "O(N^2)", correct: false },
            { text: "O(N)", correct: false },
        ],
    },

    {
        question:
            "Which of the following statements is true about asymptotic notations?",
        answers: [
            {
                text: "They represent exact running times of algorithms.",
                correct: false,
            },
            {
                text: "They describe the best-case scenario of an algorithm.",
                correct: false,
            },
            {
                text: "They provide a way to compare the efficiency of algorithms as input size approaches infinity.",
                correct: true,
            },
            {
                text: "They are only applicable to algorithms with constant time complexity.",
                correct: false,
            },
        ],
    },
];
