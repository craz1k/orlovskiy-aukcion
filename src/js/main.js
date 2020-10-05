let countdown;
let secondsGlobal = 600;
let id = 0;

const LOT = {
  id: '',
  name: '',
  totalSum: 0,
  curSum: 0
};

let lotArray = [];

// const TIMER_DOM = document.querySelector('[timer]');
const MIN_DOM = document.querySelector('[minutes]');
const SEC_DOM = document.querySelector('[seconds]');
const MSEC_DOM = document.querySelector('[mseconds]');

const START_STOP = document.querySelector('[start]');
const RESET = document.querySelector('[reset]');
const PLUS_ONE_MIN = document.querySelector('[plus-one-min]');
const PLUS_TWO_MIN = document.querySelector('[plus-two-min]');
const TEN_MIN = document.querySelector('[ten-min]');
const MINUS_ONE_MIN = document.querySelector('[minus-one-min]');
const ADD_LOT = document.querySelector('[add-lot]');
const LOTS = document.querySelector('.auc__lots-wrapper');

const timer = (seconds) => {
  const NOW = Date.now();
  const THEN = NOW + seconds * 1000;
  display(seconds);

  countdown = setInterval(() => {
    const SECONDS_LEFT = Math.round((THEN - Date.now()) / 1000);
    if (SECONDS_LEFT < 0) {
      clearInterval(countdown);
      START_STOP.classList.remove('auc__start--stop');
      return;
    }
    display(SECONDS_LEFT);
  }, 10);
};

const display = (seconds) => {
  secondsGlobal = seconds;

  const MIN = Math.floor(seconds / 60);
  const SEC = seconds % 60;
  // const MSEC = 1000 - date.getMilliseconds();
  MIN < 10 ? MIN_DOM.innerHTML = '0' + MIN : MIN_DOM.innerHTML = MIN;
  SEC < 10 ? SEC_DOM.innerHTML = '0' + SEC : SEC_DOM.innerHTML = SEC;
  // MSEC < 100 ? MSEC_DOM.innerHTML = '' + MSEC : MSEC_DOM.innerHTML = MSEC;
};

const setTime = (time) => {
  if (!START_STOP.classList.contains('auc__start--stop') || !countdown) {
    secondsGlobal += time;
    display(secondsGlobal);
  } else {
    secondsGlobal += time;
    clearInterval(countdown);
    timer(secondsGlobal);
  }
};

const reset = () => {
  START_STOP.classList.remove('auc__start--stop');
  secondsGlobal = 0;
  clearInterval(countdown);
  display(secondsGlobal);
};

const lotAdd = () => {
  LOTS.insertAdjacentHTML('beforeend',
    `<div class="auc__item"><input class="auc__lot" type="text"><input class="auc__total-sum" type="text"
    pattern="[0-9]{10}" oninput="this.value=this.value.replace(/[^0-9]/g,'');"><input class="auc__current-sum"
    type="text" pattern="[0-9]{10}" oninput="this.value=this.value.replace(/[^0-9]/g,'');"><button
    class="auc__add-sum" add-sum><svg class="auc__icon">
      <use xlink:href="img/sprite.svg#plus"></use>
    </svg></button></div>`
  );
  nodeAdding();
};

START_STOP.addEventListener('click', () => {
  if (secondsGlobal > 0 && !START_STOP.classList.contains('auc__start--stop')) {
    timer(secondsGlobal);
    START_STOP.classList.add('auc__start--stop');
  } else if (START_STOP.classList.contains('auc__start--stop')) {
    clearInterval(countdown);
    START_STOP.classList.remove('auc__start--stop');
  }
});

RESET.addEventListener('click', reset);

PLUS_ONE_MIN.addEventListener('click', () => {
  setTime(60);
});

PLUS_TWO_MIN.addEventListener('click', () => {
  setTime(120);
});

TEN_MIN.addEventListener('click', () => {
  secondsGlobal = 0;
  setTime(600);
});

MINUS_ONE_MIN.addEventListener('click', () => {
  secondsGlobal >= 60 ? setTime(-60) : reset();
});

ADD_LOT.addEventListener('click', lotAdd);

const nodeAdding = () => document.querySelectorAll('[add-sum]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const LOT_NAME = btn.parentElement.firstChild;
    const LOT_CUR_SUM = btn.previousSibling;
    const LOT_TOTAL_SUM = btn.parentElement.firstChild.nextSibling;

    if (!isNaN(parseFloat(LOT_CUR_SUM.value))) {
      if (!btn.hasAttribute('id')) {
        const LOT_CLONE = {};
        Object.assign(LOT_CLONE, LOT);

        LOT_CLONE.id = id;
        LOT_CLONE.name = LOT_NAME.value;
        LOT_CLONE.totalSum += parseFloat(LOT_CUR_SUM.value);
        LOT_CLONE.curSum = parseFloat(LOT_CUR_SUM.value);

        LOT_CUR_SUM.value = '';
        LOT_TOTAL_SUM.value = LOT_CLONE.totalSum;
        btn.setAttribute('id', id++);

        lotArray.push(LOT_CLONE);
        console.log(lotArray);
      } else {
        const curLot = lotArray.find((el) => el.id === parseInt(btn.getAttribute('id'), 10));
        curLot.name = LOT_NAME.value;
        curLot.curSum = parseFloat(LOT_CUR_SUM.value);
        curLot.totalSum += parseFloat(LOT_CUR_SUM.value);
        LOT_CUR_SUM.value = '';
        LOT_TOTAL_SUM.value = curLot.totalSum;
        console.log(lotArray);
      }
    }
  });
});
