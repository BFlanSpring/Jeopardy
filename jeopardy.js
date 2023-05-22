let categories = []; // Create empty clues and categories to log data into after pulling API
let clues = {};

document.addEventListener("DOMContentLoaded", function () {
  function randomNumbers() {
    let IDs = [];
    for (let i = 0; i < 6; i++) {
      let randomNumber;
      let isUnique = false;

      while (!isUnique) {
        randomNumber = Math.floor(Math.random() * 200); // Generate random number between 0 and 1000

        if (!IDs.includes(randomNumber)) {
          isUnique = true;
        }
      }
      IDs.push(randomNumber);
    }
    return IDs;
  }

  async function getCategoriesByID() {
    const IDs = randomNumbers(); // pulls categories from the api, and pushed them into categories array and clues object, so we canpull from
    for (let i = 0; i < IDs.length; i++) {
      let index = IDs[i];
      const res = await axios.get(
        `https://jservice.io/api/clues?category=${index}`
      );
      const category = {
        title: res.data[0].category.title,
        clues: [],
      };

      const existingCategory = categories.find(
        (cat) => cat.title === category.title
      );
      if (existingCategory) {
        continue; // Skip this category and move to the next iteration
      }

      res.data.slice(0, 5).forEach((clue, index) => {
        const clueId = `${i}-${index + 1}`;
        category.clues.push(clueId);

        clues[clueId] = {
          question: clue.question,
          answer: clue.answer,
          value: (index + 1) * 100,
        };
      });

      categories.push(category);
      renderCategory(category);
    }
  }

  function renderCategory(category) { //creates category and injects them into the page
    const column = document.createElement("div");
    column.classList.add("column");

    const header = document.createElement("header");
    header.textContent = category.title;
    column.appendChild(header);

    const ul = document.createElement("ul");

    const missingCluesCount = 5 - category.clues.length; //Finds how many clues are missing, if any (in order ro populate emtyy cue spaces)

    category.clues.forEach((clueId) => {
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.dataset.clueId = clueId;
      button.textContent = clues[clueId].value;
      button.classList.add("game-button");
      li.appendChild(button);
      ul.appendChild(li);
    });

    for (let i = 0; i < missingCluesCount; i++) {//adds bonus Qs if column isnt populated with 5 clues
      const li = document.createElement("li");
      const button = document.createElement("button");
      button.textContent = "BONUS QUESTION";
      button.classList.add("game-button", "bonus-question");
      li.appendChild(button);
      ul.appendChild(li);
    }

    column.appendChild(ul);

    const boardElement = document.getElementById("board");
    boardElement.appendChild(column);
  }

  const MAX_CLICKS = 2;

  document.addEventListener("click", function (event) {
    if (event.target.matches("button")) {
      const clueId = event.target.dataset.clueId;
      const button = event.target;
      const clickCount = parseInt(button.dataset.clickCount) || 0;

      if (clues[clueId]) {
        const question = clues[clueId].question;
        const answer = clues[clueId].answer;

        if (clickCount === 0) {
          button.textContent = question; // Change the button text to the question on the first click
        } else if (clickCount === MAX_CLICKS - 1) {
          button.textContent = answer; // Change the button text to the answer on the last click
          button.disabled = true;
          button.classList.add("correct-answer"); // Disable the button after displaying the answer
        }

        button.dataset.clickCount = clickCount + 1; // keeps track of click count
      }
    }
  });

  getCategoriesByID();

  const newGameButton = document.getElementById("start");
  newGameButton.addEventListener("click", function () {
    resetBoard();
    getCategoriesByID();
  });

  function resetBoard() {
    categories = [];
    clues = {};
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
  }
});