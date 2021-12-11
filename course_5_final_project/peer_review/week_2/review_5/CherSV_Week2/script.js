'use strict'

let game = {
    board: document.querySelector('.game-board'),
    pics: {
        capricorn: '&#9809;',
        aquarius: '&#9810;',
        fish: '&#9811;',
        aries: '&#9800;',
        taurus: '&#9801;',
        lion: '&#9804;'
    },
    firstCheckedCard: null,
    secondCheckedCard: null,
    init: function() {
        let cards = this.board.querySelectorAll('.back-card');
        cards = Array.from(cards);

        for (let i = 0; i < 2; i++) {
            for (const key in this.pics) {
                if (this.pics.hasOwnProperty(key)) {
                    const pic = this.pics[key];

                    let num = getRandomInt(0, cards.length);

                    while (cards[num].innerHTML) {
                        num = getRandomInt(0, cards.length);
                    }

                    cards[num].innerHTML = pic;
                }
            }
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkClickedCard(card) {
    card.classList.add('disabled');

    if (game.firstCheckedCard && game.secondCheckedCard) {
        game.firstCheckedCard.classList.remove('clicked', 'fail', 'disabled');
        game.secondCheckedCard.classList.remove('clicked', 'fail', 'disabled');

        game.firstCheckedCard = card;
        game.secondCheckedCard = null;

    } else if (game.firstCheckedCard) {
        game.secondCheckedCard = card;

        let firstCardPic = game.firstCheckedCard.querySelector('.back-card').innerHTML;
        let secondCardPic = game.secondCheckedCard.querySelector('.back-card').innerHTML;

        if (firstCardPic === secondCardPic) {
            game.firstCheckedCard.classList.add('disabled', 'success');
            game.secondCheckedCard.classList.add('disabled', 'success');

            game.firstCheckedCard = null;
            game.secondCheckedCard = null;
        } else {
            game.firstCheckedCard.classList.add('fail');
            game.secondCheckedCard.classList.add('fail');
        }

    } else {
        game.firstCheckedCard = card;
    }
}

game.init();

game.board.addEventListener('click', e => {
    let target = e.target;
    while (target.parentNode) {

        if (target.classList.contains('game') && !target.classList.contains('disabled')) {
            target.classList.toggle('clicked');

            checkClickedCard(target);
        }

        target = target.parentNode;
    }

})