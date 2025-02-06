let currentQuestion = 0;

const questions = [
    {
        question: "Quel est le but d'un antivirus ?",
        image: "https://via.placeholder.com/500x300?text=Antivirus",
        answers: [
            "Protéger contre les virus",
            "Essais",
            "Améliorer la connexion Internet",
            "Faire des sauvegardes de fichiers"
        ],
        correctAnswer: 0
    },
    {
        question: "Qu'est-ce que le phishing ?",
        image: "https://via.placeholder.com/500x300?text=Phishing",
        answers: [
            "Un type de malware",
            "Une méthode de fraude par e-mail",
            "Une technique de piratage par mot de passe",
            "Un pare-feu"
        ],
        correctAnswer: 1
    },
    {
        question: "Qu'est-ce qu'un mot de passe fort ?",
        image: "https://via.placeholder.com/500x300?text=Mot+de+passe+fort",
        answers: [
            "Un mot de passe court avec des chiffres",
            "Un mot de passe avec des majuscules et des caractères spéciaux",
            "Un mot de passe sans chiffres",
            "Un mot de passe facile à retenir"
        ],
        correctAnswer: 1
    },
    {
        question: "Que doit-on faire pour se protéger d'un ransomware ?",
        image: "https://via.placeholder.com/500x300?text=Ransomware",
        answers: [
            "Ouvrir tous les e-mails sans crainte",
            "Faire des sauvegardes régulières de ses fichiers",
            "Ne jamais utiliser de logiciel antivirus",
            "Partager ses informations personnelles en ligne"
        ],
        correctAnswer: 1
    }
];

function displayQuestion() {
    const question = questions[currentQuestion];
    const questionContainer = document.getElementById('question-container');
    const answersContainer = document.getElementById('answers-container');

    questionContainer.innerHTML = `<h2>${question.question}</h2><img src="${question.image}" alt="Image de la question" style="width: 100%; height: auto;">`;

    answersContainer.innerHTML = "";
    question.answers.forEach((answer, index) => {
        const answerButton = document.createElement('button');
        answerButton.innerHTML = answer;
        answerButton.onclick = () => validateAnswer(index);
        answersContainer.appendChild(answerButton);
    });
}

function validateAnswer(selectedAnswer) {
    const question = questions[currentQuestion];
    const buttons = document.querySelectorAll('#answers-container button');

    if (selectedAnswer === question.correctAnswer) {
        buttons[selectedAnswer].style.backgroundColor = "green";
    } else {
        buttons[selectedAnswer].style.backgroundColor = "red";
    }

    buttons.forEach(button => button.disabled = true);
    document.getElementById('next-button').style.display = "inline-block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
        document.getElementById('next-button').style.display = "none";
    } else {
        document.getElementById('quiz-container').innerHTML = "<h1>Félicitations, vous avez terminé le quiz!</h1>";
    }
}

displayQuestion();
