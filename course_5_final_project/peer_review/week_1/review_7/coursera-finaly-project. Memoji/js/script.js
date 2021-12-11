const cards = document.querySelectorAll('.game__card');

function openCard() {
        this.classList.toggle('open-card');
    return;
}

cards.forEach((el) => {
    el.addEventListener('click', openCard);
});