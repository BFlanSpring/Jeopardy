// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

// function randomNumbers() {
//   let IDs = [];
//   for (let i = 0; i < 6; i++) {
//     let randomNumber;
//     let isUnique = false;

//     while (!isUnique) {
//       randomNumber = Math.floor(Math.random() * 1001); // Generate random number between 0 and 100

//       if (!IDs.includes(randomNumber)) {
//         isUnique = true;
//       }
//     }
//     IDs.push(randomNumber);
//   }
//   return IDs;
// }

// const IDs = randomNumbers(); // Array of ID numbers

// async function getCategoriesByID() {
//   let selectedCategories = [];
//   for (let i = 0; i < IDs.length; i++) {
//     let index = IDs[i];
//     const res = await axios.get(`https://jservice.io/api/clues?category=${index}`);
//     selectedCategories.push(res.data);
//   }
  
//   return selectedCategories;
// }
let categories = [];  //Create empty clues and cats to log data into after pulling api
let clues = {};

function randomNumbers() {
  let IDs = [];
  for (let i = 0; i < 6; i++) {
    let randomNumber;
    let isUnique = false;

    while (!isUnique) {
      randomNumber = Math.floor(Math.random() * 1001); // Generate random number between 0 and 100

      if (!IDs.includes(randomNumber)) {
        isUnique = true;
      }
    }
    IDs.push(randomNumber);
  }
  return IDs;
}

const IDs = randomNumbers(); // Array of ID numbers

async function getCategoriesByID() {
  for (let i = 0; i < IDs.length; i++) {
    let index = IDs[i];
    const res = await axios.get(`https://jservice.io/api/clues?category=${index}`);
    const category = {
      title: res.data[0].category.title,
      clues: []
    };

    const existingCategory = categories.find(cat => cat.title === category.title);
    if (existingCategory) {
      continue; // Skip this category and move to the next iteration
    }

    res.data.slice(0, 5).forEach(clue => {
      const clueId = `${i}-${clue.id}`;
      category.clues.push(clueId);

      clues[clueId] = {
        question: clue.question,
        answer: clue.answer,
        value: clue.value
      };
    });

    categories.push(category);
  }
}

getCategoriesByID();











  
   


async function getCategoryClues(categoryId) {}

// const categoryResults = randomCategories();
// console.log(categoryResults);


function getCategoryIds() {

}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO