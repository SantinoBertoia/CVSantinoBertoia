// Elementos del juego
const choices = ["rock", "paper", "scissors"];
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");
const recordText = document.getElementById("record");
let currentScore = 0;
let currentStreak = 0;
let recordStreak = 0;
let lastResult = "draw";  // Agregamos una variable para llevar el resultado anterior

// Event listeners para los botones
document.getElementById("rock").addEventListener("click", () => playGame("rock"));
document.getElementById("paper").addEventListener("click", () => playGame("paper"));
document.getElementById("scissors").addEventListener("click", () => playGame("scissors"));

// Función para jugar
function playGame(userChoice) {
    const computerChoice = getRandomChoice();
    const userWins = determineWinner(userChoice, computerChoice);

    // Mostrar elecciones
    resultText.textContent = `Tú elegiste ${userChoice}. La computadora eligió ${computerChoice}.`;

    // Determinar el resultado
    if (userWins === "win") {
        resultText.textContent += " ¡Ganaste!";
        currentScore++;
        currentStreak = lastResult === "win" ? currentStreak + 1 : 1; // Incrementa la racha si el resultado anterior fue una victoria
        lastResult = "win";  // Actualiza el resultado anterior
        if (currentStreak > recordStreak) {
            recordStreak = currentStreak;
        }
    } else if (userWins === "lose") {
        resultText.textContent += " ¡Perdiste!";
        currentStreak = 0;  // Reinicia la racha en caso de derrota
        lastResult = "lose";  // Actualiza el resultado anterior
    } else {
        resultText.textContent += " ¡Es un empate!";
        lastResult = "draw";  // Actualiza el resultado anterior
    }

    // Actualizar puntuación y récord
    scoreText.textContent = `Puntuación: ${currentScore}`;
    recordText.textContent = `Récord de victorias seguidas: ${recordStreak}`;
}

// Función para obtener una elección aleatoria de la computadora
function getRandomChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// Función para determinar el ganador
function determineWinner(user, computer) {
    if (user === computer) {
        return "draw";
    }
    if ((user === "rock" && computer === "scissors") ||
        (user === "paper" && computer === "rock") ||
        (user === "scissors" && computer === "paper")) {
        return "win";
    }
    return "lose";
}
