document.getElementById('start-game').addEventListener('click', startGame);

function startGame() {
    const gridSize = parseInt(document.getElementById('grid-size').value);
    const numPlayers = parseInt(document.getElementById('players').value);
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;

    const totalCards = gridSize * gridSize;
    const symbols = generateSymbols(totalCards / 2);
    const cards = shuffle([...symbols, ...symbols]);

    cards.forEach(symbol => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="front"></div>
            <div class="back">${symbol}</div>
        `;
        card.addEventListener('click', () => flipCard(card));
        gridContainer.appendChild(card);
    });
}

function generateSymbols(numPairs) {
    const symbols = [];
    for (let i = 0; i < numPairs; i++) {
        symbols.push(String.fromCharCode(65 + i));
    }
    return symbols;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

let firstCard, secondCard;
let lockBoard = false;

function flipCard(card) {
    if (lockBoard) return;
    if (card === firstCard) return;

    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.back').textContent === secondCard.querySelector('.back').textContent;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}