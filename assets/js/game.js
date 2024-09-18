// Fetch questions from JSON
async function fetchQuestions() {
  try {
      const response = await fetch('assets/questions.json'); // Ensure this path is correct relative to your server root
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
  } catch (error) {
      console.error('Error fetching questions:', error);
      // Handle errors (e.g., show a message to the user)
  }
}

// Initialize game state
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
const maxQuestions = 4; // Number of questions to be asked

// Set up the game
async function setupGame() {
  questions = await fetchQuestions();
  if (questions && questions.length > 0) {
      // Shuffle questions and limit to maxQuestions
      questions = shuffleArray(questions).slice(0, maxQuestions);
      showQuestion(questions[currentQuestionIndex]);
      document.getElementById('game').classList.remove('hidden');
      document.getElementById('loader').classList.add('hidden');
      updateHud();
  } else {
      console.error('No questions available');
  }
}

// Shuffle the array to ensure random order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Show a question
function showQuestion(question) {
  if (!question) return;

  document.getElementById('question').innerText = question.question;

  const choices = document.querySelectorAll('.choice');
  choices.forEach((choice, index) => {
      choice.innerText = `${String.fromCharCode(65 + index)}. ${question[`choice${index + 1}`]}`;
      choice.onclick = () => handleAnswer(index + 1, choice);
  });
}

// Handle answer click
function handleAnswer(selectedAnswer, selectedChoice) {
  const question = questions[currentQuestionIndex];
  const choices = document.querySelectorAll('.choice');

  // Disable all buttons to prevent multiple clicks
  choices.forEach(choice => choice.disabled = true);

  if (selectedAnswer === question.answer) {
      selectedChoice.classList.add('correct');
      score += 100; // Increase score by 100 for correct answer
      updateScore(); // Update the score display
  } else {
      selectedChoice.classList.add('incorrect');
      // Highlight the correct answer
      choices[question.answer - 1].classList.add('correct');
  }

  // Move to the next question or end the game
  setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
          showQuestion(questions[currentQuestionIndex]);
          // Re-enable buttons for the next question
          choices.forEach(choice => choice.disabled = false);
          // Remove previous styles
          choices.forEach(choice => choice.classList.remove('correct', 'incorrect'));
          updateHud(); // Update the question number
      } else {
          endGame();
      }
  }, 1000); // Show feedback for 1 second before moving to the next question
}

// Update the HUD with the current question number and score
function updateHud() {
  const progressText = document.getElementById('progressText');
  progressText.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function updateScore() {
  const scoreText = document.getElementById('score');
  scoreText.innerText = `Score: ${score}`;
}

// End the game
function endGame() {
  // Assuming 'score' is your variable holding the final score
  window.location.href = `end.html?score=${score}`;
  // Optionally show the final score or redirect to another page
}

// Start the game
setupGame();
