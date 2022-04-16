function randomEmoji() {

    let emodji = ["🐶", "🐸", "🐭", "🐹", "🐰", "🐼","🐶", "🐸", "🐭", "🐹", "🐰", "🐼"].sort(() => Math.random() - 0.5);
    let listCards = document.querySelectorAll(".on");
    
    listCards.forEach( (element,key) => {
        element.innerHTML = emodji[key];
    });
}

randomEmoji();

function matchElements() {

    let allCards = document.querySelector('.board'),
        allChecked, input;

    allCards.addEventListener('change', function(event) {
        if ( event.target.checked ) {
            if ( allCards.querySelectorAll('.no-matched').length == 2 ) {
                allCards.querySelectorAll('.no-matched').forEach(element => {
                    input = element.closest('.card__flip').closest('.board__card').querySelector('.click');
                    input.checked = false;
                    input.disabled = "";
                    input.classList.remove('open');
                    element.classList.remove('no-matched');
                });
            }
            event.target.classList.add('open');
        }
        else {
            event.target.classList.remove('open');
        }

        allChecked = allCards.querySelectorAll('.open');
        if ( allChecked.length == 2 ) {
            allChecked[0].disabled = "disabled";
            allChecked[1].disabled = "disabled";

            cardOne = allChecked[0].closest('.board__card').querySelector('.on');
            cardTwo = allChecked[1].closest('.board__card').querySelector('.on');
            if ( cardOne.innerHTML == cardTwo.innerHTML ) {
                cardOne.classList.add("matched");
                cardTwo.classList.add("matched");
                
                allChecked[0].classList.remove('open');
                allChecked[1].classList.remove('open');
            }
            else {
                cardOne.classList.add("no-matched");
                cardTwo.classList.add("no-matched");
            }

        }
    });
    

}

matchElements();