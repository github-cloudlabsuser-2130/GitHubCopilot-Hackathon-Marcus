import React, { useState, useEffect } from 'react';
import './memorygame.css';

const symbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍒', '🍍', '🥝'];

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

/**
 * MemoryGame component represents a memory matching game.
 * 
 * @component
 * @example
 * return (
 *   <MemoryGame />
 * )
 * 
 * @returns {JSX.Element} The rendered memory game component.
 * 
 * @description
 * The MemoryGame component initializes a set of cards with symbols, shuffles them, and manages the game state including flipped and matched cards. 
 * When two cards are flipped, it checks if they match and updates the state accordingly. If all cards are matched, a win message is displayed.
 * 
 * @function
 * @name MemoryGame
 * 
 * @hook
 * @name useState
 * @description Manages the state of cards, flipped cards, and matched cards.
 * 
 * @hook
 * @name useEffect
 * @description Initializes the cards by shuffling a doubled set of symbols.
 * 
 * @param {number} index - The index of the clicked card.
 * 
 * @returns {void}
 */
const MemoryGame = () => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
        const doubledSymbols = [...symbols, ...symbols];
        setCards(shuffleArray(doubledSymbols));
    }, []);

    const handleCardClick = (index) => {
        if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) {
            return;
        }

        const newFlippedCards = [...flippedCards, index];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            const [firstIndex, secondIndex] = newFlippedCards;
            if (cards[firstIndex] === cards[secondIndex]) {
                setMatchedCards([...matchedCards, firstIndex, secondIndex]);
            }
            setTimeout(() => setFlippedCards([]), 1000);
        }
    };

    return (
        <div className="memory-game">
            <div className="grid">
                {cards.map((symbol, index) => (
                    <div
                        key={index}
                        className={`card ${flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="card-inner">
                            <div className="card-front">?</div>
                            <div className="card-back">{symbol}</div>
                        </div>
                    </div>
                ))}
            </div>
            {matchedCards.length === cards.length && <div className="win-message">You Win!</div>}
        </div>
    );
};

export default MemoryGame;