let questions = [];
let currentQuestionIndex = 0;

// Attendre que la page soit chargée avant de démarrer le quiz
document.addEventListener("DOMContentLoaded", () => {
    loadQuestions();
});

// Charger les questions depuis le fichier JSON
async function loadQuestions() {
    try {
        const response = await fetch("questions.json");
        if (!response.ok) {
            throw new Error("Problème de chargement du fichier JSON.");
        }
        questions = await response.json();
        console.log("Questions chargées :", questions); // Debug
        loadQuestion();
    } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
    }
}

// Fonction pour charger une question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Vérification que la question existe
    if (!currentQuestion) {
        console.error("Erreur : Question introuvable !");
        return;
    }

    // Afficher la question
    document.getElementById("questionText").innerHTML = currentQuestion.question;

    // Afficher l'image correspondante
    const questionImage = document.getElementById("questionImage");
    questionImage.src = currentQuestion.image;
    questionImage.style.display = "block"; // Afficher l'image

    // Afficher les réponses sous forme de boutons
    const answersContainer = document.getElementById("answersContainer");
    answersContainer.innerHTML = ""; // Effacer les anciennes réponses
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.innerText = answer;
        button.onclick = () => handleAnswerClick(index);
        answersContainer.appendChild(button);
    });

    // Réinitialiser le message de feedback
    document.getElementById("feedback").innerHTML = "";
}

// Fonction pour gérer le clic sur une réponse
function handleAnswerClick(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const feedback = document.getElementById("feedback");

    // Vérifier si la réponse est correcte
    if (selectedIndex === currentQuestion.correct) {
        feedback.innerHTML = "<p style='color: green;'>Bonne réponse ! ✅</p>";
    } else {
        feedback.innerHTML = `<p style='color: red;'>Mauvaise réponse ❌ <br> La bonne réponse était : <strong>${currentQuestion.answers[currentQuestion.correct]}</strong></p>`;
    }

    // Désactiver les boutons après réponse
    document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);

    // Passer à la question suivante après 2 secondes
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            document.getElementById("quiz").innerHTML = "<h2>Quiz terminé ! 🎉</h2>";
        }
    }, 2000);
}
