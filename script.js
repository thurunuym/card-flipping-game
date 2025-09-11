document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let startTime;
    let timerInterval;

    const cardArray = [
        { name: 'card1', img: 'images/k1.jpg' },
        { name: 'card1', img: 'images/k2.jpg' },
        { name: 'card2', img: 'images/q1.jpg' },
        { name: 'card2', img: 'images/q2.jpg' },
        { name: 'card3', img: 'images/j1.jpg' },
        { name: 'card3', img: 'images/j2.jpg' },
        { name: 'card4', img: 'images/t1.jpg' },
        { name: 'card4', img: 'images/t2.jpg' },
        { name: 'card5', img: 'images/a1.jpg' },
        { name: 'card5', img: 'images/a2.jpg' },
    ];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';  // Clear old board
        cardsWon = [];
        cardsChosen = [];
        cardsChosenId = [];

        // Start the timer
        startTime = new Date();
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = setInterval(updateTimer, 1000);

        // Generate cards
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }

        // Optional: display timer on page
        if (!document.getElementById('timer')) {
            const timerEl = document.createElement('p');
            timerEl.id = 'timer';
            timerEl.style.fontSize = '1.2rem';
            timerEl.style.color = '#ffd700';
            timerEl.style.marginTop = '20px';
            document.querySelector('.container').appendChild(timerEl);
        }
        document.getElementById('timer').textContent = 'Time: 0s';
    }

    function updateTimer() {
        const now = new Date();
        const elapsed = Math.floor((now - startTime) / 1000); // seconds
        document.getElementById('timer').textContent = `Time: ${elapsed}s`;
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 550);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            clearInterval(timerInterval); // stop timer
            const endTime = new Date();
            const totalTime = Math.floor((endTime - startTime) / 1000);
            alert(`Congratulations! You found them all in ${totalTime} seconds!`);
        }
    }

    startButton.addEventListener('click', createBoard);
});
