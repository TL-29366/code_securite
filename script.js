// Déclaration des variables globales
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

// Charger les questions depuis le fichier JSON
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Affiche la question
    questionText.innerHTML = currentQuestion.question;

    // Affiche l'image correspondante
    const questionImage = document.getElementById("questionImage");
    questionImage.src = currentQuestion.image;
    questionImage.style.display = "block"; // Rendre l'image visible

    // Afficher les réponses sous forme de boutons
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.innerText = answer;
        button.onclick = () => handleAnswerClick(index);
        answersContainer.appendChild(button);
    });

    // Réinitialiser le message de feedback
    feedback.innerHTML = "";
}


// Affiche une question et ses réponses
function showQuestion() {
    const questionElement = document.getElementById("question");
    const answerButtons = document.getElementById("answer-buttons");
    const nextButton = document.getElementById("next-button");

    // Effacer les anciennes réponses
    answerButtons.innerHTML = "";

    // Récupérer la question actuelle
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;

    // Ajouter les boutons de réponse
    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.classList.add("btn");
        button.onclick = () => checkAnswer(index);
        answerButtons.appendChild(button);
    });

    nextButton.classList.add("hidden"); // Cacher le bouton "Suivant" au départ
}

// Vérifie si la réponse sélectionnée est correcte
function checkAnswer(selectedIndex) {
    const question = questions[currentQuestionIndex];

    if (selectedIndex === question.correct) {
        score++; // Incrémenter le score si bonne réponse
    }

    document.getElementById("next-button").classList.remove("hidden"); // Montrer le bouton "Suivant"
}

// Passe à la question suivante ou affiche le score final
document.getElementById("next-button").addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

// Affiche le score final à la fin du quiz
function showScore() {
    document.getElementById("question-container").classList.add("hidden"); // Cacher les questions
    document.getElementById("score").textContent = `Score final : ${score} / ${questions.length}`;
    document.getElementById("score").classList.remove("hidden");
}

// Démarrer le quiz
loadQuestions();
