class MemojyGame {

	constructor() {
		this.generateGame()
		this.duration = 1000;
		this.cardsContainer = document.querySelector('.cards');
		this.cards = Array.from(this.cardsContainer.children);
	}

	flip(selectedCard) {
		let flippedCards = []
		this.cards.forEach((card) => {
			const cardClassList = Array.from(card.classList)
			this.isFlipped(cardClassList) && flippedCards.push(card)

		})

		if (flippedCards.length === 0) {
			selectedCard.classList.add('flipped');

			this.cards.forEach(card => {
				const cardClassList = Array.from(card.classList)
				if (this.isNotMatch(cardClassList)) {
					card.classList.remove('has-not-match')
				}
			})

		} else if (flippedCards.length === 1) {
			selectedCard.classList.add('flipped');

			if (flippedCards[0].dataset.emodji === selectedCard.dataset.emodji) {
				flippedCards[0].classList.add('has-match')
				selectedCard.classList.add('has-match')
			} else {
				flippedCards[0].classList.add('has-not-match')
				selectedCard.classList.add('has-not-match')
			}
			flippedCards[0].classList.remove('flipped')
			selectedCard.classList.remove('flipped')
		}
	}

	isFlipped(cardClassList) {
		return cardClassList.indexOf('flipped') != -1
	}

	isNotMatch(cardClassList) {
		return cardClassList.indexOf('has-not-match') != -1
	}

	generateGame() {
		const emodjiList = ["🐱", "🦄", "🐷", "🐸", "🐙", "🐟"]
		const shuffledEmodjiList = shuffle([...emodjiList, ...emodjiList])

		let innerHtml = ""
		shuffledEmodjiList.forEach((emodji) => {
			innerHtml +=`<div class="card" data-emodji="${emodji}">
							<div class="card_back"></div>
							<div class="card_front">${emodji}</div>
						</div>`
		})
		const field = document.querySelector('.cards')
		field.innerHTML = innerHtml
	}
}




const game = new MemojyGame;

game.cards.forEach(card => {
	card.addEventListener('click', game.flip.bind(game, card));
})


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}