class MemojyGame {

	constructor() {
		this.duration = 1000;
		this.cardsContainer = document.querySelector('.cards');
		this.cards = Array.from(this.cardsContainer.children);
	}

	flip(selectedCard) {
		const cardClassList = Array.from(selectedCard.classList)

		if (this.isFlipped(cardClassList)) {
			selectedCard.classList.remove('flipped')
		} else {
			selectedCard.classList.add('flipped');
		}

	}

	isFlipped(cardClassList) {
		return cardClassList.indexOf('flipped') != -1
	}
}

const game = new MemojyGame;

game.cards.forEach(card => {
	card.addEventListener('click', game.flip.bind(game, card));
})