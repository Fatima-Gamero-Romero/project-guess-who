// ALL SELECTORS:
const board = document.getElementById("board"); // This gets the main element and is used in the generateBoard function expresion to genereate the board game.
const questions = document.getElementById("questions"); // This gets the select element
const winOrLoseSection = document.getElementById("winOrLose") // This gets the section
const winOrLoseText = document.getElementById("winOrLoseText") // This gets the section h1
const winSound = document.getElementById('winnerSound')
const loseSound = document.getElementById('loserSound')

// BUTTONS SELECTORS:
const restartBtn = document.getElementById("restart"); // This gets the restart button
const findOutBtn = document.getElementById("filter"); // This gets the findOut button
const playAgainBtn = document.getElementById("playAgain"); //This gets the playAgain button

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: "Jabala",
    img: "images/jabala.svg",
    hair: "hidden",
    eyes: "hidden",
    accessories: ["glasses", "hat"],
    other: [],
  },
  {
    name: "Jack",
    img: "images/jack.svg",
    hair: "hidden",
    eyes: "blue",
    accessories: ["hat"],
    other: [],
  },
  {
    name: "Jacques",
    img: "images/jacques.svg",
    hair: "grey",
    eyes: "blue",
    accessories: ["hat"],
    other: ["smoker"],
  },
  {
    name: "Jai",
    img: "images/jai.svg",
    hair: "black",
    eyes: "brown",
    accessories: [],
    other: [],
  },
  {
    name: "Jake",
    img: "images/jake.svg",
    hair: "yellow",
    eyes: "green",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "James",
    img: "images/james.svg",
    hair: "brown",
    eyes: "green",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "Jana",
    img: "images/jana.svg",
    hair: "black",
    eyes: "hidden",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "Jane",
    img: "images/jane.svg",
    hair: "yellow",
    eyes: "hidden",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "Jaqueline",
    img: "images/jaqueline.svg",
    hair: "orange",
    eyes: "green",
    accessories: ["glasses"],
    other: [],
  },

  {
    name: "Jazebelle",
    img: "images/jazebelle.svg",
    hair: "purple",
    eyes: "hidden",
    accessories: ["glasses"],
    other: ["smoker"],
  },
  {
    name: "Jean",
    img: "images/jean.svg",
    hair: "brown",
    eyes: "blue",
    accessories: ["glasses", "hat"],
    other: ["smoker"],
  },
  {
    name: "Jeane",
    img: "images/jeane.svg",
    hair: "brown",
    eyes: "green",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "Jed",
    img: "images/jed.svg",
    hair: "orange",
    eyes: "green",
    accessories: ["glasses", "hat"],
    other: ["smoker"],
  },
  {
    name: "Jenni",
    img: "images/jenni.svg",
    hair: "white",
    eyes: "hidden",
    accessories: ["hat"],
    other: [],
  },
  {
    name: "Jeri",
    img: "images/jeri.svg",
    hair: "orange",
    eyes: "green",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "Jerry",
    img: "images/jerry.svg",
    hair: "hidden",
    eyes: "blue",
    accessories: ["hat"],
    other: [],
  },
  {
    name: "Jess",
    img: "images/jess.svg",
    hair: "black",
    eyes: "blue",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "Jocelyn",
    img: "images/jocelyn.svg",
    hair: "black",
    eyes: "brown",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "Jon",
    img: "images/jon.svg",
    hair: "brown",
    eyes: "green",
    accessories: ["glasses"],
    other: [],
  },
  {
    name: "Jordan",
    img: "images/jordan.svg",
    hair: "yellow",
    eyes: "hidden",
    accessories: ["glasses", "hat"],
    other: [],
  },
  {
    name: "Josephine",
    img: "images/josephine.svg",
    hair: "grey",
    eyes: "brown",
    accessories: [],
    other: [],
  },
  {
    name: "Josh",
    img: "images/josh.svg",
    hair: "yellow",
    eyes: "green",
    accessories: [],
    other: [],
  },
  {
    name: "Jude",
    img: "images/jude.svg",
    hair: "black",
    eyes: "green",
    accessories: [],
    other: [],
  },
  {
    name: "Julie",
    img: "images/julie.svg",
    hair: "black",
    eyes: "brown",
    accessories: ["glasses", "hat"],
    other: [],
  },
];
// Global variables: These are undefined in order to be later filled in with a value when a function runs.
let secret; // It will store a random person (an object from the CHARACTERS array)
let currentQuestion; // It will store an object with the category and its value that the user has selected by asking.
let charactersInPlay;

// Funtion Expression: Draw the game board
const generateBoard = () => {
  board.innerHTML = "";
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
        <div class="card">
          <p>${person.name}</p>
          <img src=${person.img} alt=${person.name}>
          <div class="guess">
            <span>Guess on ${person.name}?</span>
            <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
          </div>
        </div>
      `;
  });
};

//Function that randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)];
};

// Function to start (and restart) the game.
const start = () => {
  charactersInPlay = CHARACTERS;
  generateBoard();
  setSecret();
};

// Function to play again.
const playAgain = () => {
  charactersInPlay = CHARACTERS;
  generateBoard();
  setSecret();
  winOrLoseSection.style.display = 'none'; // Hiddes the section that shows the win or lose messages.
  board.style.display = "flex"; // Shows again the board game
  //OR board.style.display = "" // Shows again the board game
}

//Function that runs when selecting values from the dropdown and it sets the currentQuestion object.
const selectQuestion = () => {
  const category = questions.options[questions.selectedIndex].parentNode.label; //This variable shows the label of the options selected.
  const value = questions.value;

  currentQuestion = {
    category: category, //hair, eyes, accessories, others
    value: value,       // value from the categories
  };
};

// This function is invoked when you click on 'Find Out' button.
const checkQuestion = () => {
  const { category, value } = currentQuestion; // This is call destructuring assigments
  let keep; //This variable will store a boolean depenending on the comparison between value and secret person's value.
  console.log(secret);

  if (category === "hair" || category === "eyes") {
    keep = value === secret[category]; // returns a true or false
  } else if (category === "accessories" || category === "other") {
    keep = secret[category].includes(value); //returns a true or false 
  }
  filterCharacters(keep);
};

// This function will filter the characters array and redraw the game board.
const filterCharacters = (keep) => {
  const { category, value } = currentQuestion; // This is call destructuring assigments.

// First block of statements conditions:
  if (category === "accessories") {
    if (keep) {
      alert(
        `Yes, the person wears ${value}! Keep all people that wears ${value}!`
      );
    } else {
      alert(
        `No, the person doesn't wear ${value}! Remove all people that wears ${value}!`
      );
    }
  } else if (category === "eyes") {
    if (keep) {
      alert(
        `Yes, the person has ${value} eyes! Keep all people that have ${value} eyes!`
      );
    } else {
      alert(
        `No, the person has not ${value} eyes! Remove all people that have ${value} eyes!`
      );
    }
  } else if (category === "hair") {
    if (keep) {
      alert(
        `Yes, the person has ${value} hair! Remove all people that have ${value} hair!`
      );
    } else {
      alert(
        `No, the person doesn't have ${value} hair! Remove all people that have ${value} hair!`
      );
    }
  } else {
    if (keep) {
      alert(
        `Yes, the person is a ${value}! Keep all people that are ${value}!`
      );
    } else {
      alert(
        `No, the person is not a ${value}! Remove all people that are ${value}!`
      );
    }
  }
// Second block of if statement conditions:
  if ((keep && category === "hair") || (keep && category === "eyes")) {
    charactersInPlay = charactersInPlay.filter(
      (person) => person[category] === value
    );
  } else if ((!keep && category === "hair") || (!keep && category === "eyes")) {
    charactersInPlay = charactersInPlay.filter(
      (person) => person[category] !== value
    );
  } else if (
    (keep && category === "other") ||
    (keep && category === "accessories")
  ) {
    charactersInPlay = charactersInPlay.filter((person) =>
      person[category].includes(value)
    );
  } else if (
    (!keep && category === "other") ||
    (!keep && category === "accessories")
  ) {
    charactersInPlay = charactersInPlay.filter(
      (person) => !person[category].includes(value)
    );
  }
  generateBoard();
};

// Function guess: When clicking guess, the player first have to confirm that they want to make a guess.
const guess = (personToConfirm) => {
  let confirmation = confirm('Are you really sure you want to guess on this person?'); // This variable returns a boolean value
  //If the player wants to guess(if confirmation === true), the checkMyGuess function will be invoked.
  if(confirmation) {
    checkMyGuess(personToConfirm)
  }  
};

// If the payer confirms, this function is invoked
const checkMyGuess = (personToCheck) => {
 let guessPerson =  personToCheck === secret.name;

 if(guessPerson) {
   winSound.play()
   winOrLoseText.innerHTML = 'Bravo! &#128079 &#128079 <br><br>You guessed correctly! &#128515;';
   
 }else {
   loseSound.play()
   winOrLoseText.innerHTML = 'Oh nooo!<br><br>You lost the game! &#128557;';
 }

 winOrLoseSection.style.display = 'block'; // Shows the hidden section
 board.style.display = "none"; // Hide the game board
};

start(); // Invokes the start function when website is loaded

// ALL EVENT LISTENERS:
restartBtn.addEventListener("click", start);
playAgainBtn.addEventListener("click", playAgain);
findOutBtn.addEventListener("click", checkQuestion);
questions.addEventListener("change", selectQuestion); 
