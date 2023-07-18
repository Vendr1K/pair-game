(() => {
// заголовок приложения
function createAppTitle (title) {
  const appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
};

// создаем подзаголовок, форму и кнопку
function createForm(){
  const formWrapper = document.createElement('div');
  const formTitle = document.createElement('h5');
  const form = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');
  const buttonWrapper = document.createElement('div');

  formTitle.innerHTML = `Открывайте по две карточки и найдите все совпадения`;
  form.classList.add('input-group', 'bm-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите четное число от 2 до 10';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Поехали!';

  formWrapper.append(formTitle);
  formWrapper.append(form);
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    formWrapper,
    formTitle,
    form,
    input,
    button,
  };
};

// создаем блок-лист для карточек
function createWrapper() {
  const cardWrapper = document.createElement('ul');
  cardWrapper.classList.add('wraper-cards');
  return cardWrapper;
}

// отрисовываем элемнеты
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  //отрисовываем заголовок
  const pairTitle = createAppTitle(`ДА НАЧНЕТСЯ ИГРА В ПАРЫ!`);
  // отрисовываем форму + кнопку
  const pairForm = createForm();
  container.append(pairTitle);
  container.append(pairForm.formWrapper);

  // создаем обертку краточек
  const ulWrap = createWrapper();
  container.append(ulWrap);

  // создаем обработчик на кнопку в форму
  document.addEventListener('submit', (e) =>{
    // не перересовываем страницу принажатии кнопки старта игры
   e.preventDefault();
   console.log(shuffle(newArr));
   //проверяем существует ли поле
   if (document.querySelector(".card")) {
    ulWrap.innerHTML = '';
   }
   // игнорируем начало, если инпут не заполнен
   const inputValue = pairForm.input.value;
   if (!inputValue) {
     return;
   };

   // проврека валидности ввода числа в форму
    function validNumber(inputValue) {
      if ( inputValue % 2 == 0 && inputValue <= 10 && inputValue >= 2) {
        result = inputValue;
        pairForm.button.disabled = true;
        pairForm.input.value = '';
        return result;
      } else {
        return pairForm.input.value = 4;
      }
    }


    // функция таймера
    function newTime () {
      const timeGame = timePlay()
      container.append(timeGame.timerWrap)
      console.log(countPair)
      timer = clearInterval(timer)
      console.log(timeGame.time.innerHTML)
      timer = setInterval(() => {
        timeGame.time.innerHTML -= 1;
        if ( timeGame.time.innerHTML <= 0) {
          timer = clearInterval(timer)
          timeGame.time.innerHTML = 0
        }
      },1000)
    }

    // вызов функций при нажатии кнопки старта игры
    validNumber(inputValue);
    arr(result);
    shuffle(newArr);
    getListContent(result, ulWrap);
    valueCard();
    newTime();
    gameReload = setTimeout(() => {
      alert('Время игры закончилось');
      window.location.reload();
    }, (TIME * 1001));
  });

  //создаем массив пар
  const newArr = [];
  function arr(value) {
  for (let i = 0; i < value * value; i++) {
    newArr[i] = Math.trunc(i/2) + 1;
    console.log(newArr[i]);
  };
  return newArr;
  };

  // перемешиваем масив
  function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    let t = array[i];
    array[i] = array[j];
    array[j] = t;
    };
    console.log(array);
    return array;
  };

  // создаем div .card + расчет размера контейнера + атрибут
  function getListContent(result, ulWrap) {
    for (let i = 0; i < result * result; i++) {
        card = document.createElement("div");
        card.classList.add('card');
        card.dataset.number = newArr[i];
        ulWrap.append(card);
    };

    if (result < 5 ) {
      ulWrap.style.width = (85 * result ) + 'px';
      ulWrap.style.height = (85 * result ) + 'px';
      ulWrap.style.padding = (10) + 'px';
    } else {
      ulWrap.style.width = (75 * result ) + 'px';
      ulWrap.style.height = (75 * result ) + 'px';
      ulWrap.style.padding = (10) + 'px';
    }
    return ulWrap;
  };

  // открытие значения карточки по клику
  let countPair = 0; // счетчик кол-ва открытых пар
  function valueCard () {
    const cardClick = document.querySelectorAll('.card');
    let firstCard = null;
    let secondCard = null;
    let lockCard = false; // используем в логике,чтобы не открыть более двух карт за раз
    // обработчик клика карточки
    cardClick.forEach(card => card.addEventListener('click', checkCard))
    function checkCard(event) {

      if (lockCard == false) {
        event.target.innerHTML = event.target.dataset.number; // показываем цифру карты при соблюдении условия
      };
      if (firstCard !== null && lockCard == false) { // даем значение второй карте
        if (secondCard == null ) {
          secondCard = event.target;
          lockCard = true;
               if ( secondCard == firstCard) { // проверка на двойной клик по одной карте
                setTimeout(() => {
                  closeCard(); // сборас значений открытых карт
                }, 100)
               } else if ( firstCard.dataset.number === secondCard.dataset.number ) { // сравниваем значение дата атрибутов открытых карт
                  openCard();
                  countPair ++;
                  if (countPair == Math.pow(result, 2) / 2 ) {
                    timer = clearInterval(timer)
                    endGame() // вызов функции окончания игры
                  }
                } else { // сравниваем значение дата атрибутов открытых карт
                    setTimeout(() => {
                      closeCard(); // сборас значений открытых карт
                  }, 250);
                }
        }
      } else if ( lockCard == false) { // даем значение первой открытой карте
        firstCard = event.target;
      };
    };

  // функция сбораса значений открытых карт
  function closeCard() {
    firstCard.innerHTML = '';
    secondCard.innerHTML = '';
    firstCard = null;
    secondCard = null;
    lockCard = false;
  };

  // функция открытия значений карт, если их атрибуты равны, удаляем обработчик клик с совпавших карт
    function openCard() {
      firstCard.classList.add('open');
      secondCard.classList.add('open');
      firstCard.removeEventListener('click', checkCard);
      secondCard.removeEventListener('click', checkCard);
      firstCard = null;
      secondCard = null;
      lockCard = false;
    };
  };

  // создаем блок под таймер
  const TIME = 60;
  let timer;
  function timePlay() {
    const timerWrap = document.createElement('div');
    const timeText = document.createElement('span');
    const time = document.createElement('span');

    timerWrap.classList.add('timer-wrap');
    time.classList.add('timer-wrap__time');
    timeText.classList.add('timer-wrap__text');
    timeText.innerHTML = 'Ваше оставшееся время: ';
    time.innerHTML = TIME;

    timerWrap.append(timeText);
    timerWrap.append(time);

    return {
      timerWrap,
      time,
    };
  };

  // создаем кнопку новой игры после открытия всех карточек
  function endGame() {
    if (countPair == 2 || countPair == 32 ){
      createButtonEnd(`Поздравляем! Вы нашли все ${countPair} пары`);
    } else {
      createButtonEnd(`Поздравляем! Вы нашли все ${countPair} пар`);
    };
  };

  function createButtonEnd(text) {
    const button = document.createElement('button');
    const textEnd = document.createElement('span');
    textEnd.innerHTML = text;
    textEnd.classList.add('text-end');
    button.innerText = 'Сыграть ещё раз';
    button.classList.add('btn', 'btn-reload', 'btn-primary');
    container.append(textEnd);
    container.append(button);
    clearTimeout(gameReload);
    button.addEventListener('click', () => {
      window.location.reload();
      });
    return {
      button,
      textEnd
    };
  };
});
})();