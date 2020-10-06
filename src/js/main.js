/* eslint-disable curly */
/* eslint-disable radix */
/* eslint-disable indent */
let countdown;
let secondsGlobal = 600;
let id = 0;

const LOT_ARRAY = [];

const MIN_DOM = document.querySelector('[minutes]');
const SEC_DOM = document.querySelector('[seconds]');
// const MSEC_DOM = document.querySelector('[mseconds]');

const START_STOP_BTN = document.querySelector('[start]');
const RESET_BTN = document.querySelector('[reset]');
const PLUS_ONE_MIN_BTN = document.querySelector('[plus-one-min]');
const PLUS_TWO_MIN_BTN = document.querySelector('[plus-two-min]');
const EQUAL_TEN_MIN_BTN = document.querySelector('[ten-min]');
const MINUS_ONE_MIN_BTN = document.querySelector('[minus-one-min]');
const ADD_LOT_BTN = document.querySelector('[add-lot]');
const LOTS_DOM = document.querySelector('.auc__lots-wrapper');
const TOTAL_DOM = document.querySelector('[total]');

const startTimer = (seconds) => {
  const NOW = Date.now();
  const THEN = NOW + seconds * 1000;
  displayTimer(seconds);

  countdown = setInterval(() => {
    const SECONDS_LEFT = Math.round((THEN - Date.now()) / 1000);
    if (SECONDS_LEFT < 0) {
      clearInterval(countdown);
      START_STOP_BTN.classList.remove('auc__start--stop');
      return;
    }
    displayTimer(SECONDS_LEFT);
  }, 10);
};

const displayTimer = (seconds) => {
  secondsGlobal = seconds;
  const MIN = Math.floor(seconds / 60);
  const SEC = seconds % 60;
  MIN < 10 ? MIN_DOM.innerHTML = '0' + MIN : MIN_DOM.innerHTML = MIN;
  SEC < 10 ? SEC_DOM.innerHTML = '0' + SEC : SEC_DOM.innerHTML = SEC;
  // MSEC < 100 ? MSEC_DOM.innerHTML = '' + MSEC : MSEC_DOM.innerHTML = MSEC;
};

const setTimer = (time) => {
  if (!START_STOP_BTN.classList.contains('auc__start--stop') || !countdown) {
    secondsGlobal += time;
    displayTimer(secondsGlobal);
  } else {
    secondsGlobal += time;
    clearInterval(countdown);
    startTimer(secondsGlobal);
  }
};

const resetTimer = () => {
  START_STOP_BTN.classList.remove('auc__start--stop');
  secondsGlobal = 0;
  clearInterval(countdown);
  displayTimer(secondsGlobal);
};

const addLot = () => {
  LOTS_DOM.insertAdjacentHTML('beforeend',
    `<div class="auc__item"><input class="auc__lot" type="text" title="Название лота"><input class="auc__total-sum"
    type="text" oninput="this.value=this.value.replace(/[^0-9]^./g,'');" title="Всего внесено"><input
    class="auc__current-sum" type="text" oninput="this.value=this.value.replace(/[^0-9]^./g,'');"
    title="Ввод суммы"><button class="auc__add-sum" add-sum title="Внести сумму"><svg class="auc__icon">
      <use xlink:href="img/sprite.svg#plus"></use>
    </svg></button></div>`
  );
  eventListenerAdding();
};

const sortLots = (arr) => {
  const ARR_LENGTH = arr.length;
  if (ARR_LENGTH === 1 || arr[ARR_LENGTH - 1].totalBet < arr[ARR_LENGTH - 2].totalBet) return;
  arr.sort((a, b) => {
    return b.totalBet - a.totalBet;
  });
};

const displayLots = (arr) => {
  const LOTS_ITEM_DOM = document.querySelectorAll('.auc__item');
  const ARR_LENGTH = arr.length;
  const LOTS_ITEM_DOM_LENGTH = LOTS_ITEM_DOM.length;

  for (let i = 0; i < LOTS_ITEM_DOM_LENGTH; i++) {
    LOTS_ITEM_DOM[i].childNodes[0].value = '';
    LOTS_ITEM_DOM[i].childNodes[1].value = '';
    LOTS_ITEM_DOM[i].childNodes[2].value = '';
    LOTS_ITEM_DOM[i].childNodes[3].removeAttribute('id');
  }

  for (let i = 0; i < ARR_LENGTH; i++) {
    LOTS_ITEM_DOM[i].childNodes[0].value = arr[i].name;
    LOTS_ITEM_DOM[i].childNodes[1].value = arr[i].totalBet;
    LOTS_ITEM_DOM[i].childNodes[3].setAttribute('id', arr[i].id);
  }

  TOTAL_DOM.innerText = '';
  TOTAL_DOM.innerText = arr.reduce((acc, el) => acc + parseFloat(el.totalBet), 0);
};

const lotArrayFill = (name, totalBet, lastBet) => {
  const LOT = {
    id: '',
    name: '',
    totalBet: 0,
    lastBet: 0
  };

  LOT.id = id++;
  LOT.name = name;
  if (isNaN(parseFloat(totalBet))) {
    LOT.totalBet += parseFloat(lastBet);
  } else {
    LOT.totalBet = parseFloat(lastBet) + parseFloat(totalBet);
  }
  LOT.lastBet = parseFloat(lastBet);
  LOT_ARRAY.push(LOT);
};

const lotArrayEdit = (idEd, name, totalBet, lastBet) => {
  const CURRENT_LOT = LOT_ARRAY.find((el) => el.id === idEd);
  CURRENT_LOT.name = name;
  CURRENT_LOT.lastBet = parseFloat(lastBet);
  if (isNaN(parseFloat(totalBet))) {
    CURRENT_LOT.totalBet += parseFloat(lastBet);
  } else {
    CURRENT_LOT.totalBet = parseFloat(lastBet) + parseFloat(totalBet);
  }
};

START_STOP_BTN.addEventListener('click', () => {
  if (secondsGlobal > 0 && !START_STOP_BTN.classList.contains('auc__start--stop')) {
    startTimer(secondsGlobal);
    START_STOP_BTN.classList.add('auc__start--stop');
  } else if (START_STOP_BTN.classList.contains('auc__start--stop')) {
    clearInterval(countdown);
    START_STOP_BTN.classList.remove('auc__start--stop');
  }
});

RESET_BTN.addEventListener('click', resetTimer);

PLUS_ONE_MIN_BTN.addEventListener('click', () => {
  setTimer(60);
});

PLUS_TWO_MIN_BTN.addEventListener('click', () => {
  setTimer(120);
});

EQUAL_TEN_MIN_BTN.addEventListener('click', () => {
  secondsGlobal = 0;
  setTimer(600);
});

MINUS_ONE_MIN_BTN.addEventListener('click', () => {
  secondsGlobal >= 60 ? setTimer(-60) : resetTimer();
});

ADD_LOT_BTN.addEventListener('click', addLot);

const eventListenerAdding = () => document.querySelectorAll('[add-sum]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const LOT_NAME_DOM = btn.parentElement.firstChild;
    const LOT_CUR_SUM_DOM = btn.previousSibling;
    const LOT_TOTAL_SUM_DOM = btn.parentElement.firstChild.nextSibling;

    if (!isNaN(parseFloat(LOT_CUR_SUM_DOM.value))) {
      if (!btn.hasAttribute('id')) {
        lotArrayFill(
          LOT_NAME_DOM.value,
          LOT_TOTAL_SUM_DOM.value,
          LOT_CUR_SUM_DOM.value
        );
      } else {
        lotArrayEdit(
          parseInt(btn.getAttribute('id')),
          LOT_NAME_DOM.value,
          LOT_TOTAL_SUM_DOM.value,
          LOT_CUR_SUM_DOM.value
        );
      }
      sortLots(LOT_ARRAY);
      displayLots(LOT_ARRAY);
    }
  });
});

eventListenerAdding();
