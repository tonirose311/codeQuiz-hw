var questions = document.querySelector("questions")
var answer = document.querySelector("choice")



function Quiz(quizQuestion) {
    this.score = 0;
    this.quizQuestion = quizQuestion;
    this.quizQuestionIndex = 0;
}


var quizQuestion = [
    new question ("Who are you?"),
    new question ("What is the acronym for the colors of the rainbow?"),
    new question ("What is the answer to life, the universe, and everything?"),
    new question ("What is the powerhouse of the cell?"),
    new question ("What is the most important lesson you learned today?"),
]