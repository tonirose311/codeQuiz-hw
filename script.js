// // var questions = document.querySelector("questions")
// // var answer = document.querySelector("choice")

//referencing webdevtrick's javascript code 

function play(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

play.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}

play.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

play.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}


function question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

function populate() {
    //"quiz" is not being defined as a function. same goes for the rest of the following occurrences
    if(quiz.isEnded()) {
        showScores();
    }
    else {
//code is broken here for innerHTML
        // question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;

        // choices
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

// create questions here
var questions = [
    new question("Who are you?", ["I am Groot", "I am Gamora","I am Star Lord", "I am Rocket"], "I am Groot"),
    new question("What is the acronym for the colors of the rainbow?", ["PEMDAS", "I AM GROOT", "ROY G BIV", "UNICEF"], "I AM GROOT"),
    new question("What is the answer to life, the universe, and everything?", ["Unicorns", "42","I am Groot", "Pizza"], "I am Groot"),
    new question("What is the powerhouse of the cell?", ["Golgi Apparatus", "Mitochondria", "Cell Wall", "I am Groot"], "I am Groot"),
    new question("What is the most important lesson you learned today?", ["I am Groot", "Mitochondria is the powerhouse of the cell", "We are Groot", "Yes"], "We are Groot")
];

// broken here 
populate();
