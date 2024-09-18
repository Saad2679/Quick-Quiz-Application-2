// highscore.js

// Function to get highscores from local storage
function getHighscores() {
    return JSON.parse(localStorage.getItem('highscores')) || [];
}

// Function to display highscores
function displayHighscores() {
    const highscoreList = document.getElementById('highscore-list');
    const highscores = getHighscores();

    highscoreList.innerHTML = highscores
        .map((score) => `<li>${score.name}: ${score.score}</li>`)
        .join('');
}

// Function to clear highscores
function clearHighscores() {
    localStorage.removeItem('highscores');
    displayHighscores(); // Update the list after clearing
}

// Event listener for the clear highscores button
document.getElementById('clear-highscores-btn').addEventListener('click', clearHighscores);

// Call the function to display highscores when the page loads
document.addEventListener('DOMContentLoaded', displayHighscores);
