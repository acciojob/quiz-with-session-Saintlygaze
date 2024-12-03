// Select DOM elements
const questionsElement = document.getElementById("questions");
const submitButton = document.getElementById("submit");
const scoreElement = document.getElementById("score");

// Retrieve or initialize user answers
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];

// Questions data
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Render questions
function renderQuestions() {
  questionsElement.innerHTML = ""; // Clear previous content

  questions.forEach((question, index) => {
    const questionContainer = document.createElement("div");
    questionContainer.className = "question";

    // Display question
    const questionText = document.createElement("p");
    questionText.textContent = question.question;
    questionContainer.appendChild(questionText);

    // Display options
    question.choices.forEach((choice) => {
      const option = document.createElement("input");
      option.setAttribute("type", "radio");
      option.setAttribute("name", `question-${index}`);
      option.setAttribute("value", choice);

      // Check if this choice was previously selected
      if (userAnswers[index] === choice) {
        option.setAttribute("checked", true);
      }

      // Save choice on change
      option.addEventListener("change", () => {
        userAnswers[index] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      const label = document.createElement("label");
      label.textContent = choice;

      questionContainer.appendChild(option);
      questionContainer.appendChild(label);
      questionContainer.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionContainer);
  });
}

// Calculate score
function calculateScore() {
  return questions.reduce((score, question, index) => {
    return score + (userAnswers[index] === question.answer ? 1 : 0);
  }, 0);
}

// Handle submit
submitButton.addEventListener("click", () => {
  const score = calculateScore();
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;

  // Save score in local storage
  localStorage.setItem("score", score);
});

// Render questions on page load
renderQuestions();
