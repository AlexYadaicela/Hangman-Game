const data = {
  "categories": [
    {
      "name": "Colors",
      "words": ["red", "blue", "green", "yellow", "orange", "purple", "pink", "black", "white", "gray", "brown", "teal", "maroon", "olive", "navy"]
    },
    {
      "name": "Animals",
      "words": ["dog", "cat", "bird", "fish", "horse", "cow", "pig", "chicken", "lion", "tiger", "bear", "elephant", "monkey", "zebra", "giraffe"]
    },
    {
      "name": "Foods",
      "words": ["apple", "banana", "orange", "grape", "strawberry", "carrot", "potato", "broccoli", "chicken", "beef", "pork", "rice", "pasta", "bread"]
    },
    {
      "name": "Countries",
      "words": ["USA", "Canada", "Mexico", "France", "Germany", "Japan", "China", "India", "Brazil", "Australia", "Egypt", "Nigeria", "Russia", "Italy", "Spain"]
    },
    {
      "name": "Occupations",
      "words": ["doctor", "teacher", "engineer", "nurse", "police officer", "firefighter", "lawyer", "accountant", "programmer", "artist", "musician", "writer", "chef", "athlete", "businessperson"]
    },
    {
      "name": "Sports",
      "words": ["basketball", "football", "baseball", "soccer", "tennis", "golf", "swimming", "running", "cycling", "volleyball", "hockey", "badminton", "cricket", "rugby", "boxing"]
    },
    {
      "name": "Household Items",
      "words": ["table", "chair", "bed", "sofa", "lamp", "television", "refrigerator", "oven", "microwave", "dishwasher", "washing machine", "dryer", "computer", "phone", "book"]
    },
     {
      "name": "Clothing",
      "words": ["shirt", "pants", "shoes", "dress", "skirt", "jacket", "coat", "hat", "socks", "underwear", "sweater", "jeans", "t-shirt", "blouse", "shorts"]
    },
    {
      "name": "Weather",
      "words": ["sun", "rain", "snow", "wind", "cloud", "storm", "thunder", "lightning", "hail", "fog", "rainbow", "sunny", "rainy", "cloudy", "windy"]
    },
    {
      "name": "Emotions",
      "words": ["happy", "sad", "angry", "surprised", "scared", "excited", "tired", "bored", "frustrated", "lonely", "grateful", "proud", "nervous", "confident", "silly"]
    }
  ]
}

const gameDisplay = document.getElementById('game_display'); 

function generateWord(){
    const index = Math.floor(Math.random() * 9); 
    const category = data.categories[index];      


    const categoryName = category.name; 
    const categoryLength = category.words.length; 
    const word = category.words[Math.floor(Math.random() * (categoryLength - 1))];

    const fragment = document.createDocumentFragment(); 

    const title = document.getElementById('category'); 
    title.textContent = `Category: ${categoryName}`; 

    for(let i = 0; i < word.length; i++){
        const spanElement = document.createElement('span'); 
        spanElement.textContent = ''; 
        fragment.appendChild(spanElement);
    }

    gameDisplay.appendChild(fragment); 

    return word; 
}

const word = generateWord().toLowerCase(); 
const letters = [...word];

const wordPlacement = document.querySelectorAll('#game_display > *'); 
const lives = document.querySelectorAll(".lives > *"); 

let numOfTries = 0; 
let correctAttempts = 0; 

const topRow = document.querySelector('.top_row'); 
const middleRow = document.querySelector('.middle_row'); 
const bottomRow = document.querySelector('.bottom_row'); 


topRow.addEventListener('click', pressedKey);

bottomRow.addEventListener('click', pressedKey); 

middleRow.addEventListener('click', pressedKey); 

const heartSpinning = [
    { transform: "rotate(360deg) scale(1)" }, 
    { transform: "rotate(0deg) scale(0)" },
    { fill: 'transparent'},
];

const heartTiming = {
    duration: 400,
    iterations: 1,
    fill: "forwards"
};

function pressedKey(e){ 
    if(e.target.getAttribute('data-pressed') === 'false'){
        const found = (word.indexOf(e.target.getAttribute('data-value')) !== -1) ? true : false;
        switch(found){
            case true:
                
                e.target.setAttribute('data-correct', 'true');  
                e.target.style.color = "green"; 
                const guess = e.target.getAttribute('data-value'); 
                correctLetterPosition(guess);                 

                if(correctAttempts === word.length){
                    stopGame(); 
                }
                break; 
            case false: 
                if(numOfTries === 6){
                    revealWord(); 
                    stopGame(); 
                } 
                lives[numOfTries++].animate(heartSpinning, heartTiming); 
                e.target.style.color = "red";
                break; 
            }
            e.target.setAttribute('data-pressed', 'true'); 
        }
    }

function revealWord(){
    letters.forEach((letter, index) =>{
        wordPlacement[index].textContent = `${letter}`; 
    })
}
    
function correctLetterPosition(guess){
    letters.forEach((letter, index) => {
        if(guess === letter){
            correctAttempts++; 
            wordPlacement[index].textContent = `${guess}`; 
        }
    });
}
    
function stopGame(){       
    topRow.removeEventListener('click', pressedKey);
    middleRow.removeEventListener('click', pressedKey);
    bottomRow.removeEventListener('click', pressedKey);
}