const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');
const keyrowButton = document.getElementsByClassName('.keyrow button');
const ulList = document.querySelector('#phrase ul');
const listPhrase = document.getElementById('list');
const letterClass = document.getElementsByClassName('letter');
const showClass = document.getElementsByClassName('show');
const title = document.querySelector('.title');

var missed = 0;

const phrases = ['i love you',
                  'life is short',
                  'thank you',
                  'my sunshine',
                  'every moment matters'];

// let phraseArray = getRandomPhraseAsArray(phrases);

startButton.addEventListener('click', () => {
  overlay.style.display = 'none';
  let phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
});

function randomArr(arr) {
    return Math.floor(Math.random() * arr.length);
}

function getRandomPhraseAsArray(arr){
    //do stuff to any arr that is passed in
    const ranPhrase = phrases[randomArr(arr)];
    const char = ranPhrase.split('');
    return char;
}

function addPhraseToDisplay(arr){
    // do stuff any arr that is passed in, and add to `#phrase ul`
    for (let i = 0; i < arr.length; i++) {
      const char = arr[i];
      const list = document.createElement('li');
      list.textContent = char;
      ulList.appendChild(list);
      if (list.textContent !== " ") {
        list.classList.add("letter");
      } else {
        list.classList.add("space");
      }
    }
}

function checkLetter(button) {
  let found = null;
  for (let i = 0; i < letterClass.length; i++) {
    if (button.textContent === letterClass[i].textContent) {
      found = true;
      letterClass[i].classList.add("show");
    }
  }
  return found;
}

function checkWin() {
  if (showClass.length === letterClass.length) {
    overlay.style.display = 'flex';
    overlay.classList.add("win");
    // overlay.setAttribute('class', 'win', 'start');
    title.textContent = 'Congratulations on winning!';
    startButton.textContent = 'Play again';
  } else if (missed >= 5) {
    overlay.style.display = 'flex';
    overlay.classList.add("lose");
    // overlay.setAttribute('class', 'lose', 'start');
    title.textContent = 'Better luck next time';
    startButton.textContent = 'Play again';
  }
}

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add("chosen");
    e.target.setAttribute("disabled", true);
    const letterFound = checkLetter(e.target);
    if (letterFound === null) {
      missed += 1;
    }
  }
  checkWin();
});
