'use strict'

class Game {
  constructor() {
    this.board = new Board(document.querySelector('.board'))
    this.board.addHandlerToCards(handlerWrapper(this._handleClick, this))
    this.timer = new Timer(60);
    this.modal = new Modal();
    this._stop();
    this.gameRunnerId = setInterval(() => this._evaluateState.bind(this)(), 1000);
  };

  setUpGame() {
    this.board.reset();
    this._start();
  }

  _tryAgain() {
    this.board.reset();
    this.modal.hide();
    this._start();
  }

  isProcessing() {
    return this.state === 'PROCESSING'
  }

  isWin() {
    return this.board.isAllCardsMatch();
  }

  win() {
    this._stop();
    this.modal.display('Win', handlerWrapper(this._tryAgain, this), "Play again");
  }

  loose() {
    this._stop();
    this.modal.display('Loose', handlerWrapper(this._tryAgain, this), "Try again");
  }

  _stop() {
    this.state = 'STOPPED';
    this.timer.stop();
  }

  _start() {
    this.state = 'PROCESSING';
    this.timer.start();
  }

  _evaluateState() {
    if (!this.isProcessing()) {
      return;
    }
    if (this.isWin()) {
      this.win();
    } else if (this.timer.isTimeElapsed()) {
      this.loose();
    }
  }

  _handleClick(card) {
    if (!this.isProcessing()) {
      return;
    }
    const wasClickOnMissedCard = card.isMissed();
    this.board.flipMissingCards();
    if (card.isMatched() || wasClickOnMissedCard) {
      return;
    }

    const flippedCards = this.board.getFlippedCard().filter(card => { return !card.isMatched() && !card.isMissed() });
    card.flip();

    if (flippedCards.length > 1) {
      throw Error('Illegal state. ' + flippedCards.toString());
    }

    if (flippedCards.length === 1) {
      const flippedCard = flippedCards[0];

      if (card.eq(flippedCard)) {
        card.match();
        flippedCard.match();
      } else  {
        card.miss();
        flippedCard.miss();
      }
    }
  }

  doFlip(card) {
    card.classList.toggle('flipped');
  }
}

class Board {
  constructor(board) {
    this._board = board
    const cards = board.children
    const cardsObjs = []
    for (let i = 0; i < cards.length; i++) {
      let card = new Card(cards[i]);
      cardsObjs.push(card);
    }
    this._cards = cardsObjs;
    this.emojis = ["🐱", "🦄", "🐷", "🐸", "🐙", "🐟"]
  }
  addHandlerToCards(handler) {
    this._cards.forEach(card => {
      card.addClickEventListener(handler);
      card.disableDoubleClickEvent();
    })
  }

  flipMissingCards() {
    this._cards.forEach(card => {
      if (card.isMissed()) {
        card.reset();
      }
    })
  }

  isAllCardsMatch() {
    return this._cards.every(c => c.isMatched());
  }

  getFlippedCard() {
    return this._cards.filter(card => {
      return card.isFlipped();
    });
  }

  reset() {
    this._cards.forEach(card => {
      card.reset();
    })
    this._populateEmojis()
  }

  _populateEmojis() {
    const shuffledEmojis = shuffle([...this.emojis, ...this.emojis])
    this._cards.forEach((card, index) => {
      card.setEmoji(shuffledEmojis[index]);
    })
  }
}

class Card {
  constructor(card) {
    this._card = card;
    this.flippedClassName = 'flipped';
    this.missClassName = 'miss';
    this.matchClassName = 'match';
  }

  flip() {
    this._card.classList.toggle(this.flippedClassName);
  }

  eq(card) {
    return this.getEmoji() === card.getEmoji()
  }

  match() {
    this._getCardFront().classList.add(this.matchClassName);
  }

  miss() {
    this._getCardFront().classList.add(this.missClassName);
  }

  addClickEventListener(handler) {
    this._card.addEventListener('click', handler(this), true)
  }

  disableDoubleClickEvent() {
    this.addDoubleClickEventListener(() => {});
  }

  addDoubleClickEventListener(handler) {
    this._card.addEventListener('dblclick', function (e) {});
  }

  isFlipped() {
    return this._card.classList.contains(this.flippedClassName);
  }

  isMissed() {
    return this._getCardFront().classList.contains(this.missClassName);
  }

  isMatched() {
    return this._getCardFront().classList.contains(this.matchClassName);
  }

  reset() {
    this._card.classList.remove(this.flippedClassName);
    this._getCardFront().classList.remove(this.missClassName);
    this._getCardFront().classList.remove(this.matchClassName);
  }

  getEmoji() {
    return this._getCardFront().innerHTML;
  }

  setEmoji(emoji) {
    this._getCardFront().innerHTML = emoji;
  }

  _getCardFront() {
    return this._card.children[1];
  }
}

class Timer {
    constructor(seconds) {
      this.timer_ = document.querySelector('.timer');
      this.clockId = null;
      this.seconds = seconds
    }

    start() {
      const seconds = this.seconds
      this._setSeconds(seconds);
      const timer = this;
      if (!this.clockId) {
        this.clockId = setInterval(function () {
          if (timer.isTimeElapsed()) {
            timer.stop();
            return;
          }
          timer._decrement();
        }, 1000)
      }
    }
    stop() {
      clearInterval(this.clockId);
      this.clockId = null;
    };
    _decrement() {
      let seconds = this.getSeconds();
      this._setSeconds(--seconds);
    }
    getSeconds() {
      const timer = this.timer_
      if (timer.innerHTML === '01:00') {
        return 60;
      } else {
        return Number(timer.innerHTML.split(':')[1]);
      }
    }
    _setSeconds(seconds) {
      const timer = this.timer_
      let secondsStr;
      if (seconds === 60) {
        secondsStr = '01:00';
      } else {
        let prefix = '00:';
        if (seconds < 10) {
          prefix += '0'
        }
        secondsStr = prefix + seconds
      }
      timer.innerHTML = secondsStr;
    }
    isTimeElapsed() {
      return this.getSeconds() <= 0;
    }
}

class Modal {
  constructor() {
    this.gameResult = document.querySelector('.game__result_text');
    this.action = document.querySelector('.game__reset_action_text');
    this.modal = document.querySelector('.game__result_modal');
    this.actionButton = document.querySelector('.game__reset_action');
  }
  display(result, actionHandler, actionText) {
    const gameResult = this.gameResult;
    gameResult.innerHTML = result;
    const action = this.action;
    action.innerHTML = actionText;
    const modal = this.modal;
    modal.classList.add('display');
    this.actionButton.addEventListener('click', actionHandler(), true);
  }
  hide() {
    const modal = this.modal;
    modal.classList.remove('display');
    // Clear event listener
    const oldElement = this.actionButton;
    const newElement = oldElement.cloneNode(true);
    oldElement.parentNode.replaceChild(newElement, oldElement);
    this.actionButton = newElement;
  }
}

let game = new Game();
game.setUpGame();

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function handlerWrapper(handler, contextObject) {
  return (arg) => {
    return handler.bind(contextObject, arg);
  }
}
