let questions = [];
let currentQuestionIndex = 0;

// Charger les questions depuis le fichier JSON
async function loadQuestions() {
    try {
        const response = await fetch("questions.json");
        questions = await response.json();
        loadQuestion();
    } catch (error) {
        console.error("Erreur lors du chargement des questions :", error);
    }
}

// Fonction pour charger une question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    // Afficher la question
    document.getElementById("questionText").innerHTML = currentQuestion.question;

    // Afficher l'image correspondante
    const questionImage = document.getElementById("questionImage");
    questionImage.src = currentQuestion.image;
    questionImage.style.display = "block"; // Rendre l'image visible

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

    // Désactiver les boutons pour éviter de changer de réponse
    document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);

    // Attendre 2 secondes avant de passer à la question suivante
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            document.getElementById("quiz").innerHTML = "<h2>Quiz terminé ! 🎉</h2>";
        }
    }, 2000);
}

// Charger les questions au démarrage
loadQuestions();
