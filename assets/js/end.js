// end.js

// Get the score from the query parameters in the URL
function getScoreFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('score')) || 0; // Default to 0 if no score is found
}

// Display the final score
function displayFinalScore() {
  const finalScore = getScoreFromURL();
  document.getElementById('final-score').textContent = finalScore;
}

// Save the highscore to localStorage
function saveHighscore() {
  const username = document.getElementById('username').value;
  const score = getScoreFromURL();

  if (username.trim() !== '') {
      const highscore = { name: username, score: score };
      const highscores = JSON.parse(localStorage.getItem('highscores')) || [];
      highscores.push(highscore);
      highscores.sort((a, b) => b.score - a.score); // Sort by score, descending
      localStorage.setItem('highscores', JSON.stringify(highscores));

      // Redirect to the highscores page after saving
      window.location.href = 'highscore.html';
  } else {
      alert('Please enter your name to save your score!');
  }
}

// Set up event listener for the save score button
document.getElementById('save-score-btn').addEventListener('click', saveHighscore);

// Display the score when the page loads
document.addEventListener('DOMContentLoaded', displayFinalScore);
