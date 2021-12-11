const emojiList = ["🐶", "🐓", "🐞", "🐟", "🐯", "🐸"];

function Game(settings) {
  this.containerId = settings.id;
  this.horizontalSize = settings.xSize;
  this.verticalSize = settings.ySize;

  this.openedCard = null;

  this.htmlElement = document.createElement("div");
  this.htmlElement.classList.add("margin-wrapper");
  this.htmlElement.addEventListener("click", listener.bind(this));

  this.containerHtmlElement = document.getElementById(this.containerId);
  this.containerHtmlElement.appendChild(this.htmlElement);

  this.cards = [];

  // Удваиваем массив с эмоджи для нашей доски
  const emojiListForFront = settings.emojiList.concat(settings.emojiList);
  // Рандомно сортируем эмоджи
  emojiListForFront.sort(() => {
    return Math.random().toFixed(1) > 0.5 ? 1 : -1;
  });

  for (let i = 0; i < this.horizontalSize * this.verticalSize; i++) {
    this.cards.push(new Card((i + 1).toString(), emojiListForFront.shift()));
  }

  const rows = [];

  for (let i = 0; i < this.verticalSize; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    rows.push(row);
  }

  rows.forEach((row, index) => {
    for (let i = 0; i < this.horizontalSize; i++) {
      row.appendChild(
        this.cards[index * this.horizontalSize + i].getHtmlElement()
      );
    }

    this.htmlElement.appendChild(row);
  });

  function listener(e) {
    const elem = e.target;
    if (!elem.classList.contains("card")) {
      return;
    } else if (elem.classList.contains("face")) {
      return;
    }

    this.cards.forEach((card) => {
      if (card.htmlElement.classList.contains("isNotCoincidence")) {
        card.htmlElement.classList.remove("face", "isNotCoincidence");
      }
    });

    const selectedCard = this.cards.find((card) => card.id === elem.id);
    elem.classList.add("face");

    if (!this.openedCard) {
      this.openedCard = selectedCard;
    } else {
      if (selectedCard.type === this.openedCard.type) {
        this.setCoincidence(selectedCard, this.openedCard);
        this.openedCard = null;
      } else {
        this.setNotCoincidence(selectedCard, this.openedCard);
        this.openedCard = null;
      }
    }
  }
}

Game.prototype.setCoincidence = function (card1, card2) {
  card1.setSuccess(card2.id);
  card2.setSuccess(card1.id);
};

Game.prototype.setNotCoincidence = function (card1, card2) {
  console.log("setCoincidenceError", card1, card2);

  card1.setError();
  card2.setError();
};

function Card(id, emoji) {
  const cardElem = document.createElement("div");
  cardElem.classList.add("card");
  cardElem.id = id;
  cardElem.dataset.type = emoji[1].charCodeAt();

  const cardFront = document.createElement("div");
  cardFront.classList.add("card-front");
  cardFront.textContent = emoji;
  cardElem.appendChild(cardFront);

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-back");
  cardElem.appendChild(cardBack);

  this.htmlElement = cardElem;
  this.id = id;
  this.type = emoji[1].charCodeAt();
}

Card.prototype = Object.create(Game.prototype);
Card.prototype.constructor = Card;

Card.prototype.getHtmlElement = function () {
  return this.htmlElement;
};

Card.prototype.setSuccess = function (id) {
  // this.htmlElement.dataset.pairWith = id;
  this.htmlElement.classList.add("isCoincidence");
};

Card.prototype.setError = function () {
  this.htmlElement.classList.add("isNotCoincidence");
};

const myGame = new Game({ id: "game-board", xSize: 4, ySize: 3, emojiList });
