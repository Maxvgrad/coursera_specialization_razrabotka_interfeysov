// объект карточки
class Card {
    constructor(element) {
        this.element = element;
    }

    getElement () {
        return this.element;
    }
    checkProperty (property) {
        return this.element.querySelector(property) != null;
    }

    flipOut () {
        this.element.querySelector('.click').checked = false;
        this.element.querySelector('.click').disabled = "";
        if ( this.element.querySelector('.click').classList.contains('open') ) {
            this.element.querySelector('.click').classList.remove('open');
        }
        if ( this.element.querySelector('.no-matched') != null ) {
            this.element.querySelector('.no-matched').classList.remove('no-matched');
        }
        if ( this.element.querySelector('.matched') != null ) {
            this.element.querySelector('.matched').classList.remove('matched');
        }
        
        
    }
    getInnerHTML() {
        return this.element.querySelector('.on').innerHTML;
    }
}

// объект поле игры
class Board {
    constructor(select) {
        this.board = document.querySelector(select);
        this.arrCards = new Array();
        Array.from(document.querySelectorAll('.board__card')).forEach( (element) => {
            this.arrCards.push(new Card(element));
        });
        this.play = 0; 
        this.goTime = 59;
        this.time;
    }

    //гет для поля
    getBoard () {
        return this.board;
    }
    
    getOpenCards () {
        return this.arrCards.filter( element => {
            return element.checkProperty('.open');
        });
    }
    getMatchCards () {
        return this.arrCards.filter( element => {
            return element.checkProperty('.matched');
        });
    }
    
    getMissCards () {
        return this.arrCards.filter( element => {
            return element.checkProperty('.no-matched');
        });
    }

    matchOpenCards () {
        let openCards = this.getOpenCards();
        
        openCards.forEach(element => {
            element.getElement().querySelector('.on').classList.add("matched");
            element.getElement().querySelector('.click').classList.remove('open');
        });
    }
    
    missOpenCards () {
        let openCards = this.getOpenCards();
        
        openCards.forEach(element => {
            element.getElement().querySelector('.on').classList.add("no-matched");
        });
        
    }

    DisabledOpenCards () {
        let openCards = this.getOpenCards();        
        openCards.forEach(element => {
            element.getElement().querySelector('.open').disabled = "disabled";
        });
    }

    startGame () {
        let emodji = ["🐶", "🐸", "🐭", "🐹", "🐰", "🐼","🐶", "🐸", "🐭", "🐹", "🐰", "🐼"].sort(() => Math.random() - 0.5);    
        
        this.arrCards.forEach( (element,key) => {
            element.getElement().querySelector('.on').innerHTML = emodji[key];
        });
        this.play = 1;
        this.startTime();
    }

    endGameWin () {
        this.stopTime();
        this.board.querySelector('.modal').style.display = "block";
        danceText();
    }
    endGameLose () {
        this.stopTime();
        this.board.querySelector('.result').innerHTML = 'Lose';
        this.board.querySelector('.modal').style.display = "block";
        danceText();
    }

    refreshGame () {
        this.arrCards.forEach( (element) => element.flipOut() );
        this.board.querySelector('.modal').style.display = "none";
        this.board.closest('.main').querySelector('.main__timer').innerHTML = '01:00';
    }

    getStatusPlay () {
        return this.play;
    }
    
    startTime () {
        this.countTime(59);
    }

    stopTime () {
        this.play = 0;
        clearTimeout(this.time);
    }

    countTime (i) {
        var self = this;
        document.querySelector('.main__timer').innerHTML = i < 10 ? "00:0" + i : "00:" + i;
        i--;
        if ( i > -1) {
            self.time = setTimeout( function () { 
                self.countTime(i);
            }, 1000);
        }
        else {
            self.endGameLose();
        }
    }

}


function checkCard() {
    let board = new Board('.board');
    
    board.getBoard().addEventListener('click', function(event) {
        if ( event.target.checked ) {
            if ( board.getStatusPlay() == 0 ) {
                board.startGame();
            }

            if ( board.getMissCards().length == 2 ) {
                board.getMissCards().forEach(element => {
                    element.flipOut();
                });
            }
            event.target.classList.add('open');
        }
        else {
            event.target.classList.remove('open');
        }
        
        if ( board.getOpenCards().length == 2) {
            board.DisabledOpenCards();
            if ( board.getOpenCards()[0].getInnerHTML() == board.getOpenCards()[1].getInnerHTML()) {
                board.matchOpenCards();
                if ( board.getMatchCards().length == 12 ) {
                    board.endGameWin();
                }
            }
            else {
                board.missOpenCards();
            }
        }

        if ( event.target.classList.contains('button-again') ){
            board.refreshGame();
        }
    });
}

checkCard();

function danceText () {
    let resultText = document.querySelector('.result'),
        letters;
    resultText.innerHTML = resultText.textContent.replace(/\S/g, "<div class='letter'>$&</div>");

    letters = document.querySelectorAll('.letter');

    letters.forEach( (element,i) => {
        element.style.animation = `danceLetter 500ms infinite ${150*i}ms alternate`;
    });
}
