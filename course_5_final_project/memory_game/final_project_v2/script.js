'use strict'

class Game {
  constructor() {
    this.flippedCards = []
    this.board = new Board(document.querySelector('.board'))
  };

  setUpGame() {
    this._populateEmojis();
    this.board.addHandlerToCards(handlerWrapper(this._handleClick, this))
  }

  _populateEmojis() {
    const emojis = ["🐱", "🦄", "🐷", "🐸", "🐙", "🐟"]
    const shuffledEmojis = shuffle([...emojis, ...emojis])
    const cardsBack = document.querySelectorAll('.card-front');
    for (let i = 0; i < cardsBack.length; i++) {
      cardsBack[i].innerHTML = shuffledEmojis[i];
    }
  }

  _handleClick(card) {
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

  getFlippedCard() {
    return this._cards.filter(card => {
      return card.isFlipped();
    });
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

  _getCardFront() {
    return this._card.children[1];
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
