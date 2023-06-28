// table
const tableField = document.querySelector('.table-field');

// button creates table
const btn4 = document.querySelector('.button-creatre-4');
const btn6 = document.querySelector('.button-creatre-6');
const btn8 = document.querySelector('.button-creatre-8');
const btn10 = document.querySelector('.button-creatre-10');

// button menu
const buttonStartGame = document.querySelector('.button-start-game');
const buttonReloadGame = document.querySelector('.button-reload-game');
const buttonEndGame = document.querySelector('.button-end-game');

// Statistics
const statisticsItemTime = document.querySelector('.statistics__item-time');
const statisticsItemScore = document.querySelector('.statistics__item-score');
const statisticsItemAttempts = document.querySelector('.statistics__item-attempts');


// SERVICE
const setField = new Set();
let timerId;


// Create DEFAULT table 10 x 10
function gamesDefault() {
  const tds = document.querySelectorAll('.table-field td')

  while (setField.size < 10) {
    setField.add(Math.ceil(Math.random() * 100));
  }

  tds.forEach((td, index) => {
    td.textContent = index + 1;
  })
}
gamesDefault();

// Create table 4 x 4
const createField4 = () => {
  btn4.addEventListener('click', () => feelTabbleField(4));
}
createField4();

// Create table 6 x 6
const createField6 = () => {
  btn6.addEventListener('click', () => feelTabbleField(6));
}
createField6();

// Create table 8 x 8
const createField8 = () => {
  btn8.addEventListener('click', () => feelTabbleField(8));
}
createField8();

// Create table 10 x 10
const createField10 = () => {
  btn10.addEventListener('click', () => feelTabbleField(10));
}
createField10();

// function Feel table
function feelTabbleField(num) {
  if (document.querySelector('.table-field tr')) {
    const table = document.querySelectorAll('.table-field tr');
    for (let tableTd of table) {
      tableTd.remove();
    }
  }

  let index = 1;
  for (let i = 0; i < num; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < num; j++) {
      const td = document.createElement('td');
      td.textContent = index++;
      tr.appendChild(td);
    }
    tableField.appendChild(tr);
  }
  createHiddenNums(num);
}

// function create set num
function createHiddenNums(num) {
  setField.clear();
  while (setField.size < num) {
    setField.add(Math.ceil(Math.random() * Math.pow(num, 2)));
  }
}

function searchNum(setField) {

  // START GAME
  buttonStartGame.addEventListener('click', function () {
    btn4.disabled = true;
    btn6.disabled = true;
    btn8.disabled = true;
    btn10.disabled = true;


    timerId = setInterval(function () {

      statisticsItemTime.textContent--;

      if (statisticsItemTime.textContent > 10) {
        statisticsItemTime.dataset.timer = 'green';
      } else if (statisticsItemTime.textContent > 5) {
        statisticsItemTime.dataset.timer = 'yellow';
      } else if (statisticsItemTime.textContent > 0) {
        statisticsItemTime.dataset.timer = 'red';
      }


      if (Number(statisticsItemTime.textContent) === 0) {
        clearInterval(timerId);
        console.log('12465')
      }
    }, 1000);


    const tds = document.querySelectorAll('td');

    tds.forEach((td) => {
      td.addEventListener('click', function () {
        console.log(setField);

        if (setField.has(Number(td.textContent)) && td.className != 'rules') {
          td.classList.add('rules');
          console.log('+++')
        } else if (!setField.has(Number(td.textContent)) && td.className != 'error') {
          td.classList.add('error');
          console.log('---');
        }
      })
    })
  });

  buttonReloadGame.addEventListener('click', function () {
    console.log(this)
  })

  buttonEndGame.addEventListener('click', function () {
    btn4.disabled = false;
    btn6.disabled = false;
    btn8.disabled = false;
    btn10.disabled = false;
  })
}

searchNum(setField);