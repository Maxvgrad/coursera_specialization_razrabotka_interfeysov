window.onload = function() {
    function gameClick(e){
        let card = e.target.closest('.flipcard');
        if(!card) return;

        this.removeEventListener('click', gameClick);
        card.classList.toggle('active');
    }

    let game = document.querySelector('.game');
    game.countTransitionEnd = 0;
    
    game.addEventListener('click', gameClick);

    game.addEventListener('transitionend', function(e){
        if( ++game.countTransitionEnd == 2){
            game.countTransitionEnd = 0;
            game.addEventListener('click', gameClick);
        }
    });
}