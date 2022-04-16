'use strict';
var emoji = ['🐶', '🐱','🐨','🐯', '🐸', '🐻'];

function shuffle(arr){
	var j, temp;
	for(var i = arr.length - 1; i > 0; i--){
		j = Math.floor(Math.random()*(i + 1));
		temp = arr[j];
		arr[j] = arr[i];
		arr[i] = temp;
	}
	return arr;
}
function StartGame(){//конструктор игры
    this.cards = {};//создаем массив карточек
    this.field = document.getElementById("field");//получаем игровое поле
    this.memoji = shuffle(emoji.concat(emoji));//создаем массив перемешанных пар emoji
}
function Card(id, sticker){
    this.id = id;
    this.sticker = sticker;
}
Card.prototype.createCard = function(){//конструктор карточки
    this.card = document.createElement("div");
    this.card.classList.add("card");
    this.card.id = this.id;
    this.card.innerHTML = "<div class = 'front'></div><div class = 'back'>" + this.sticker + "</div>";
    return this.card;
}
StartGame.prototype.addCards = function(){
    for(var i = 0; i < this.memoji.length; i++){
        this.cards[i] = new Card(i, this.memoji[i]);//создаем карту
        var card_em = this.cards[i].createCard();
        card_em.addEventListener('click', function(){
            this.classList.toggle("flipped");
        });
        this.field.appendChild(card_em);
        
    }
}

var game = new StartGame();
game.addCards();