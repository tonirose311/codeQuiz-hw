let questionHeading = document.querySelector('.quiz-question');
let nextBtn = document.querySelector('.next-question');
let quizStartBtn = document.querySelector('.quiz-start-btn');
let quizStartContainer = document.querySelector('.quiz-start');
let quiztContainer = document.querySelector('.quiz-container');
let feedBack = document.querySelector('.feedback');
let timerContainer = document.querySelector('.quiz-timer');
let timer = document.querySelector('.timer');
let progressBar = document.querySelector('.progress-bar');
let quizScoreContainer = document.querySelector('.quiz-score-container');
let quizScore = document.querySelector('.quiz-score');
let checkBoxes = document.querySelectorAll('input[type=checkbox]');
let restartQuizBtn = document.querySelector('.restart-btn');
let scoresContainer = document.querySelector('.scores-list')
let scoresLinkContainer = document.querySelector('.scores-link');

let answerElement1 = document.querySelector('#answer1');
let answerElement2 = document.querySelector('#answer2');
let answerElement3 = document.querySelector('#answer3');
let answerElement4 = document.querySelector('#answer4');

const quizQuestions = [
    {
        question: "Who are you?",
        choice1: "I am Gamora",
        choice2: "I am Star Lord",
        choice3: "I am Rocket",
        choice4: "I am Groot",
        correctAnswer: "4"
    },
    {
        question: "What is the acronym for the colors of the rainbow?",
        choice1: "PEMDAS",
        choice2: "I AM GROOT",
        choice3: "ROY G BIV",
        choice4: "UNICEF",
        correctAnswer: "2"
    },
    {
        question: "What is the answer to life, the universe, and everything?",
        choice1: "Unicorns",
        choice2: "42",
        choice3: "I am Groot",
        choice4: "Pizza",
        correctAnswer: "3"
    },
    {
        question: "What is the powerhouse of the cell?",
        choice1: "Golgi Apparatus",
        choice2: "Mitochondria",
        choice3: "Cell Wall",
        choice4: "I am Groot",
        correctAnswer: "4"
    },
    {
        question: "What is the most important lesson you learned today?",
        choice1: "I am Groot",
        choice2: "Mitochondria is the powerhouse of the cell",
        choice3: "We are Groot",
        choice4: "Yes",
        correctAnswer: "3"
    },
]

let questionIndex = 0;
let timeLeft = 60;
let width = 500;
let TIMER;
let score = 0;
let initials;

let records = [];
let user = {};

function startTimer() {
    TIMER = setInterval(() => {
        timeLeft--;
        timer.textContent = `You have ${timeLeft} seconds left.`;
        progressBar.style.maxWidth = (timeLeft * 1017 / 100) + 'px';
        if (timeLeft <= 0) {
            stopTimer();
        }
        for (checkbox of checkBoxes) {
            if (questionIndex >= quizQuestions.length - 1 && checkbox.checked === true) {
                stopTimer();
            }
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(TIMER);
    console.log('Times up!');
    setScore();
    quizScoreContainer.style.display = 'block';
    quizScore.textContent = `You had ${score} of 5 correct.`
}

function setScore() {
    initials = prompt('Quiz complete! Enter your initials to save your score.');
    user.name = initials;
    user.finalScore = score;
    records.push(user);
    console.log(records);
    if (records && initials) {
        localStorage.setItem('records', JSON.stringify(records));
    }
}

function getScores() {
    let recordCollection = JSON.parse(localStorage.getItem('records'));
    if (recordCollection) {
        for (let record of recordCollection) {
            records.push(record);
        }
    }
}

function shuffleQuestions() {
    quizQuestions.sort(function () {
        return 0.5 - Math.random();
    })
}

questionHeading.textContent = quizQuestions[questionIndex].question;
answerElement1.textContent = quizQuestions[questionIndex].choice1;
answerElement2.textContent = quizQuestions[questionIndex].choice2;
answerElement3.textContent = quizQuestions[questionIndex].choice3;
answerElement4.textContent = quizQuestions[questionIndex].choice4;


quizStartBtn.addEventListener('click', startQuiz);
restartQuizBtn.addEventListener('click', reStartQuiz);

function getNextQuestion() {
    for (checkbox of checkBoxes) {
        if (questionIndex < quizQuestions.length - 1 && checkbox.checked) {
            questionIndex++;
            resetQuestions();
        }
    }

    questionHeading.textContent = quizQuestions[questionIndex].question;
    answerElement1.textContent = quizQuestions[questionIndex].choice1;
    answerElement2.textContent = quizQuestions[questionIndex].choice2;
    answerElement3.textContent = quizQuestions[questionIndex].choice3;
    answerElement4.textContent = quizQuestions[questionIndex].choice4;
}

function startQuiz() {
    startTimer();
    disableCheckboxes();
    checkAnswers();
    getScores();
    scoresLinkContainer.style.display = 'none';
    quizStartContainer.style.display = 'none';
    quiztContainer.style.display = 'block';
    timerContainer.style.display = 'block';
}

function reStartQuiz() {
    document.location.reload();
}

function resetQuestions() {
    for (let checkbox of checkBoxes) {
        checkbox.checked = false;
        checkbox.disabled = false;
        checkbox.nextSibling.style.opacity = '1';
    }
    feedBack.textContent = '';
    feedBack.classList.remove('correct', 'wrong');
}

function disableCheckboxes() {
    for (let checkbox of checkBoxes) {
        checkbox.addEventListener('click', (e) => {
            if (e.target.checked) {
                for (let unchecked of checkBoxes) {
                    if (!unchecked.checked) {
                        unchecked.disabled = true;
                        unchecked.nextSibling.style.opacity = '0.5';
                    }
                    checkbox.disabled = true;
                }
            }
        })
    }
}

function checkAnswers() {
    for (i = 0; i < checkBoxes.length; i++) {
        checkBoxes[i].addEventListener('click', (e) => {
            if (e.target.nextSibling.dataset.value === quizQuestions[questionIndex].correctAnswer) {
                score++;
                feedBack.textContent = 'That is correct!';
                feedBack.classList.add('correct');
            } else {
                console.log('Answer is wrong');
                feedBack.classList.add('wrong');
                feedBack.textContent = 'Wrong!';
                timeLeft -= 10;
            }
            setTimeout(function () {
                getNextQuestion();
            }, 1000);
        })
    }
} 