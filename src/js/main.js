let countdown;
let secondsGlobal = 600;

// const TIMER_DOM = document.querySelector('[timer]');
const MIN_DOM = document.querySelector('[minutes]');
const SEC_DOM = document.querySelector('[seconds]');
const MSEC_DOM = document.querySelector('[mseconds]');

const START = document.querySelector('[start]');
const RESET = document.querySelector('[reset]');
const PLUS_ONE_MIN = document.querySelector('[plus-one-min]');
const PLUS_TWO_MIN = document.querySelector('[plus-two-min]');
const TEN_MIN = document.querySelector('[ten-min]');
const MINUS_ONE_MIN = document.querySelector('[minus-one-min]');
const ADD_LOT = document.querySelector('[add-lot]');
const LOTS = document.querySelector('.auc__lots-wrapper');
// const LOT_ITEM = document.querySelectorAll('.auc__item')[2];

const timer = (seconds) => {
  const NOW = Date.now();
  const THEN = NOW + seconds * 1000;
  display(seconds);

  countdown = setInterval(() => {
    const SECONDS_LEFT = Math.round((THEN - Date.now()) / 1000);
    if (SECONDS_LEFT < 0) {
      clearInterval(countdown);
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
  if (!START.classList.contains('auc__start--stop') || !countdown) {
    secondsGlobal += time;
    display(secondsGlobal);
  } else {
    secondsGlobal += time;
    clearInterval(countdown);
    timer(secondsGlobal);
  }
};

const reset = () => {
  secondsGlobal = 0;
  clearInterval(countdown);
  display(0);
  timer(0);
  START.classList.remove('auc__start--stop');
};

const lotAdd = () => {
  LOTS.insertAdjacentHTML('beforeend',
    `<div class="auc__item">
      <input class="auc__lot" type="text">
      <input class="auc__total-sum" type="text">
      <input class="auc__current-sum" type="text">
      <button class="auc__add-sum">
      <svg class="auc__icon">
        <use xlink:href="img/sprite.svg#plus"></use>
      </svg></button>
    </div>`
  );
};

START.addEventListener('click', () => {
  if (secondsGlobal > 0 && !START.classList.contains('auc__start--stop')) {
    timer(secondsGlobal);
    START.classList.add('auc__start--stop');
  } else if (START.classList.contains('auc__start--stop')) {
    clearInterval(countdown);
    START.classList.remove('auc__start--stop');
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

ADD_LOT.addEventListener('click', () => {
  lotAdd();
});
