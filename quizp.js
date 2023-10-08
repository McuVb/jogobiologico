const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const btnContinue = document.querySelector(".btn-continue"); // Botão Continuar
const feedbackElement = document.getElementById("feedback");

import questions from "./questoesquizp.js";

let currentIndex = 0;
let questionsCorrect = 0;

// Função para tocar áudio
function playAudio(audioId) {
    const audioElement = document.getElementById(audioId);
    if (audioElement) {
        audioElement.currentTime = 0; // Reiniciar o áudio, caso já esteja em andamento
        audioElement.play();
    }
}

btnRestart.onclick = () => {
    content.style.display = "flex";
    contentFinish.style.display = "none";

    currentIndex = 0;
    questionsCorrect = 0;
    loadQuestion();
};

btnContinue.onclick = () => { // Função para continuar
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        loadQuestion();
        feedbackElement.textContent = ""; // Limpar feedback anterior
    } else {
        finish();
    }
};

function nextQuestion(e) {
    const answerButton = e.target;
    const isCorrect = answerButton.getAttribute("data-correct") === "true";

    if (isCorrect) {
        questionsCorrect++;
        feedbackElement.innerHTML = '<span style="color: green;">Resposta correta!</span>';
        playAudio("audioErro"); // Tocar som de acerto
    } else {
        feedbackElement.innerHTML = '<span style="color: red;">Resposta incorreta. Tente novamente.</span>';
        playAudio("audioAcerto"); // Tocar som de erro
    }

    answerButton.disabled = true; // Desabilitar o botão de resposta
    btnContinue.style.display = "block"; // Exibir o botão Continuar
}

function finish() {
    textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
    content.style.display = "none";
    contentFinish.style.display = "flex";
}

function loadQuestion() {
    spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
    const item = questions[currentIndex];
    answers.innerHTML = "";
    question.innerHTML = item.question;

    item.answers.forEach((answer) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <button class="answer" data-correct="${answer.correct}">
            ${answer.option}
        </button>
        `;

        answers.appendChild(div);
    });

    document.querySelectorAll(".answer").forEach((item) => {
        item.addEventListener("click", nextQuestion);
    });
}

loadQuestion();
