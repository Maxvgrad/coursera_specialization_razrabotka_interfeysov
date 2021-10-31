
function setUpGame(config) {
  let board = document.querySelector('.board');
  board.addEventListener('click', handleCardFlip, true);
}

function handleCardFlip(event) {
  console.log('CLICK');
  console.log(event);
  const element = event.target;
  if (element.classList.contains('flip-card-front') || element.classList.contains('flip-card-back')) {
    const parent = element.parentElement;
    doFlip(parent);
  }
}

function doFlip(element) {
  let degree = null;
  if (!element.style.transform) {
    degree = 'rotateY(180deg)';
  }
  element.style.transform = degree;
}
