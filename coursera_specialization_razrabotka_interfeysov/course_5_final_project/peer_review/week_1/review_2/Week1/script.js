

let emojiArray = ['🐯', '🐰', '🐙', '🐟', '🦄', '🐨'];

let cardElems = document.querySelectorAll('.card');
let elemsFront = document.querySelectorAll('.card__front');

cardElems.forEach((card) => {
    card.addEventListener('click', (e) => {
        let elem = e.currentTarget;
        if (elem.classList.contains('animation-back')) {
            elem.classList.replace('animation-back', 'animation-front');
        }
        else if (elem.classList.contains('animation-front')) {
            elem.classList.replace('animation-front', 'animation-back');
        } else {
            elem.classList.add('animation-front');
        }
    })
});

// Удваиваем массив с эмоджи для нашей доски
let emojiArrayForFront = emojiArray.concat(emojiArray);
// Рандомно сортируем эмоджи
emojiArrayForFront.sort(() => {
    return Math.random().toFixed(1) > 0.5 ? 1 : -1;
})

elemsFront.forEach((front) => {
    front.textContent = emojiArrayForFront.shift();
});