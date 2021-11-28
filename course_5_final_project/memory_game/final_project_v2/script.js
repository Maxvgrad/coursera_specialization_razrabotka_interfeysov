'use strict'

class Game {
  constructor() {

  };

  getBoard() {
    return document.querySelector('.board');
  }

  setUpGame() {
    let board = game.getBoard();
    console.log(board)
    let cards = board.children
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      card.addEventListener('click', this.doFlip.bind(this, card), true)
      card.addEventListener('dblclick', function (e) {})
    }
  }

  doFlip(card) {
    card.classList.toggle('flipped');
  }
}

let game = new Game();
game.setUpGame();
