// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// CTA button click handler
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function () {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NUMBER GUESSING GAME =====
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function submitGuess() {
    const guessInput = document.getElementById('guessInput');
    const guess = parseInt(guessInput.value);
    const messageElement = document.getElementById('guessMessage');
    const attemptsDisplay = document.getElementById('attemptsDisplay');

    if (isNaN(guess) || guess < 1 || guess > 100) {
        messageElement.textContent = 'Please enter a number between 1 and 100!';
        messageElement.className = 'game-message info';
        return;
    }

    attempts++;

    if (guess === secretNumber) {
        messageElement.textContent = `🎉 Correct! The number was ${secretNumber}. You guessed it in ${attempts} attempts!`;
        messageElement.className = 'game-message correct';
        guessInput.disabled = true;
    } else if (guess < secretNumber) {
        messageElement.textContent = '📈 Too low! Try a higher number.';
        messageElement.className = 'game-message incorrect';
    } else {
        messageElement.textContent = '📉 Too high! Try a lower number.';
        messageElement.className = 'game-message incorrect';
    }

    attemptsDisplay.textContent = `Attempts: ${attempts}`;
    guessInput.value = '';
    guessInput.focus();
}

function resetGuessGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('guessInput').value = '';
    document.getElementById('guessInput').disabled = false;
    document.getElementById('guessMessage').textContent = '';
    document.getElementById('guessMessage').className = 'game-message';
    document.getElementById('attemptsDisplay').textContent = '';
    document.getElementById('guessInput').focus();
}

// Allow Enter key to submit guess
document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && document.getElementById('guessInput') === document.activeElement) {
        submitGuess();
    }
});

// ===== MEMORY MATCH GAME =====
const emojis = ['🎨', '🎮', '🎭', '🎪', '🎸', '🎬', '🎲', '🎯'];
let gameCards = [];
let flippedCards = [];
let matchedCards = [];

function initMemoryGame() {
    const board = document.getElementById('memoryBoard');
    board.innerHTML = '';
    
    // Create pairs of emojis
    const cardArray = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    gameCards = cardArray;
    flippedCards = [];
    matchedCards = [];
    
    cardArray.forEach((emoji, index) => {
        const card = document.createElement('button');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.textContent = '?';
        card.onclick = () => flipCard(index, card);
        board.appendChild(card);
    });
    
    document.getElementById('matchMessage').textContent = '';
    document.getElementById('matchMessage').className = 'game-message';
}

function flipCard(index, cardElement) {
    if (flippedCards.length >= 2 || matchedCards.includes(index) || flippedCards.includes(index)) {
        return;
    }

    cardElement.textContent = gameCards[index];
    cardElement.classList.add('flipped');
    flippedCards.push(index);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [index1, index2] = flippedCards;
    const card1 = document.querySelector(`[data-index="${index1}"]`);
    const card2 = document.querySelector(`[data-index="${index2}"]`);

    if (gameCards[index1] === gameCards[index2]) {
        // Match found
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(index1, index2);
        flippedCards = [];

        if (matchedCards.length === gameCards.length) {
            document.getElementById('matchMessage').textContent = '🎉 You matched all pairs! You won!';
            document.getElementById('matchMessage').className = 'game-message correct';
        }
    } else {
        // No match - flip back
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '?';
            card2.textContent = '?';
            flippedCards = [];
        }, 1000);
    }
}

function resetMemoryGame() {
    initMemoryGame();
}

// Initialize memory game on page load
document.addEventListener('DOMContentLoaded', function () {
    initMemoryGame();
});
