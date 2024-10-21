let firstCard, secondCard;
let lockBoard = false;
let currentPlayer = 1;
let timer;
const turnTimeLimit = 10;
const timeLeftDisplay = document.getElementById('time-left');

document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('start-game');
    startGameButton.addEventListener('click', startGame);
});

async function startGame() {
    const gridSize = parseInt(document.getElementById('grid-size').value);
    const players = parseInt(document.getElementById('players').value);
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;

    const symbols = await generateSymbols(gridSize);
    const cards = shuffle([...symbols, ...symbols]);

    cards.forEach(symbol => {
        const card = createCard(symbol);
        gameBoard.appendChild(card);
    });

    let matches = 0;

    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back"><img src="${symbol}" alt="Pokemon"></div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, symbol));
        return card;
    }

    startTurn();
}

function startTurn() {
    resetTimer();
    timer = setInterval(countDown, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeftDisplay.textContent = turnTimeLimit;
}

function countDown() {
    let timeLeft = parseInt(timeLeftDisplay.textContent);
    if (timeLeft > 0) {
        timeLeftDisplay.textContent = timeLeft - 1;
    } else {
        endTurn();
    }
}

function endTurn() {
    clearInterval(timer);
    alert(`Player ${currentPlayer}'s turn is over!`);
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    startTurn();
}

function flipCard(card, symbol) {
    if (lockBoard || card === firstCard) return;
    card.classList.add('flipped');

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    if (firstCard.innerHTML === secondCard.innerHTML) {
        disableCards();
        matches++;
        if (matches === (gridSize * gridSize) / 2) {
            alert(`Player ${currentPlayer} wins!`);
        }
    } else {
        unflipCards();
    }

    if (players === 2) {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    lockBoard = false;
    resetTimer();
    timer = setInterval(countDown, 1000); // Restart the timer for the next turn
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

async function generateSymbols(size) {
    const count = (size * size) / 2;
    const symbols = [];
    for (let i = 0; i < count; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 151) + 1}`);
        const data = await response.json();
        symbols.push(data.sprites.front_default);
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