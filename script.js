const nextBtn = document.getElementById("nextBtn");
const questionForm = document.getElementById("questionForm");
const saveTestBtn = document.getElementById("saveTestBtn");

nextBtn.addEventListener("click", () => {
  const numQuestions = parseInt(document.getElementById("numQuestions").value);
  const testTime = parseInt(document.getElementById("testTime").value);

  if (!numQuestions || !testTime) {
    alert("Please enter valid number of questions and time.");
    return;
  }

  localStorage.setItem("testTime", testTime); // in minutes
  questionForm.innerHTML = ""; // Clear if already generated

  for (let i = 1; i <= numQuestions; i++) {
    const card = document.createElement("div");
    card.className = "question-card";

    card.innerHTML = `
      <label>📝 Question ${i}</label>
      <textarea placeholder="Enter your question" required rows="2" style="width:100%;"></textarea>
      <div class="options">
        ${[1, 2, 3, 4]
          .map(
            (n) => `
          <div style="margin-top:10px;">
            <input type="text" placeholder="Option ${n}" required style="width:80%;">
            <label>
              <input type="checkbox" class="correct-check"> Correct
            </label>
          </div>
        `
          )
          .join("")}
      </div>
    `;
    questionForm.appendChild(card);
  }

  questionForm.style.display = "block";
  saveTestBtn.style.display = "block";
});

// Save test and go to student page
saveTestBtn.addEventListener("click", () => {
  const questionCards = document.querySelectorAll(".question-card");
  let questions = [];

  questionCards.forEach((card, index) => {
    const questionText = card.querySelector("textarea").value.trim();
    const options = [...card.querySelectorAll("input[type='text']")].map((inp) =>
      inp.value.trim()
    );
    const correctChecks = [...card.querySelectorAll(".correct-check")];
    const correctAnswers = correctChecks
      .map((check, i) => (check.checked ? i : -1))
      .filter((i) => i !== -1);

    if (!questionText || options.some((opt) => opt === "") || correctAnswers.length === 0) {
      alert(`Please complete Question ${index + 1} and select at least one correct answer.`);
      return;
    }

    questions.push({
      question: questionText,
      options,
      correct: correctAnswers, // indexes of correct options
    });
  });

  // Save to localStorage
  localStorage.setItem("testQuestions", JSON.stringify(questions));

  // Redirect to test page
  window.location.href = "test.html";
});
