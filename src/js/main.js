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

function timer(seconds) {
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
}

function display(seconds) {
  secondsGlobal = seconds;

  const MIN = Math.floor(seconds / 60);
  const SEC = seconds % 60;
  // const MSEC = 1000 - date.getMilliseconds();
  MIN < 10 ? MIN_DOM.innerHTML = '0' + MIN : MIN_DOM.innerHTML = MIN;
  SEC < 10 ? SEC_DOM.innerHTML = '0' + SEC : SEC_DOM.innerHTML = SEC;
  // MSEC < 100 ? MSEC_DOM.innerHTML = '' + MSEC : MSEC_DOM.innerHTML = MSEC;
}

const reset = () => {
  secondsGlobal = 0;
  clearInterval(countdown);
  display(0);
  timer(0);
  START.classList.remove('auc__start--stop');
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
  if (!START.classList.contains('auc__start--stop') || !countdown) {
    secondsGlobal += 60;
    display(secondsGlobal);
  } else {
    secondsGlobal += 60;
    clearInterval(countdown);
    timer(secondsGlobal);
  }
});

PLUS_TWO_MIN.addEventListener('click', () => {
  if (!START.classList.contains('auc__start--stop') || !countdown) {
    secondsGlobal += 120;
    display(secondsGlobal);
  } else {
    secondsGlobal += 120;
    clearInterval(countdown);
    timer(secondsGlobal);
  }
});


TEN_MIN.addEventListener('click', () => {
  if (!START.classList.contains('auc__start--stop') || !countdown) {
    secondsGlobal = 600;
    display(secondsGlobal);
  } else {
    secondsGlobal = 600;
    clearInterval(countdown);
    timer(secondsGlobal);
  }
});


MINUS_ONE_MIN.addEventListener('click', () => {
  if (secondsGlobal >= 60) {
    if (!START.classList.contains('auc__start--stop') || !countdown) {
      secondsGlobal -= 60;
      display(secondsGlobal);
    } else {
      secondsGlobal -= 60;
      clearInterval(countdown);
      timer(secondsGlobal);
    }
  } else {
    reset();
  }
});
