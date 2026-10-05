'use strict';

const body = document.body;
const section = document.createElement('section');
const cardList = document.createElement('ul');
const counts = document.createElement('div');
const movesCounterEl = document.createElement('span');
const pairsCounterEl = document.createElement('span');

const renderElements = function() {
    section.classList.add('memory-game');
    cardList.classList.add('cards');
    movesCounterEl.classList.add('moves-counter');
    pairsCounterEl.classList.add('pairs-counter');
    counts.classList.add('counts');
    counts.append(movesCounterEl);
    counts.append(pairsCounterEl);
    section.appendChild(cardList);
    body.prepend(section);
    section.prepend(counts);
}

const images = [
    {
        src: './images/img-1.png',
        alt: 'Pig',
    },
    {
        src: './images/img-2.png',
        alt: 'Kangaroo',
    },
    {
        src: './images/img-3.png',
        alt: 'Dragonfly',
    },
    {
        src: './images/img-4.png',
        alt: 'Cat',
    },
    {
        src: './images/img-5.png',
        alt: 'Sloth',
    },
    {
        src: './images/img-6.png',
        alt: 'Ladybug',
    },
    {
        src: './images/img-7.png',
        alt: 'Elephant',
    },
    {
        src: './images/img-8.png',
        alt: 'Rabbit',
    }
];

const state = {
    cards: makeCards(),
    openedCards: [],
    movesCounter: 0,
    pairsCounter: 0,
    timerId: null
}

function makeCards() {
    const doubledImages = [...images, ...images];

    const shuffledImages = shuffle(doubledImages);

    return shuffledImages.map(function(item, index) {
        return {
            id: index + 1,
            img: item.src,
            alt: item.alt,
            isOpened: false,
            isPaired: false,
        }
    });
}

function shuffle(array) {
    for(let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const savedValue = array[i];
        array[i] = array[j];
        array[j] = savedValue;
    }

    return array;
}

function renderCards() {
    cardList.replaceChildren();

    state.cards.forEach(function(item) {
        const cardItem = document.createElement('li');
        const cardButton = document.createElement('button');
        const cardImg = document.createElement('img');
        const imgPath = getImgPath(item);
        const imgAlt = getImgAlt(item);

        cardButton.setAttribute('type', 'button');
        cardButton.setAttribute('data-id', item.id);
        cardImg.setAttribute('src', imgPath);
        cardImg.setAttribute('alt', imgAlt);

        cardButton.appendChild(cardImg);
        cardItem.appendChild(cardButton);
        cardList.appendChild(cardItem);
    });
}

function getImgPath(item) {
    return item.isOpened ? item.img : './images/img.png';
}

function getImgAlt(item) {
    return item.isOpened ? item.alt : 'Unknown image';
}

function renderCounts() {
    pairsCounterEl.textContent = `Pairs: ${state.pairsCounter} of 8`;
    movesCounterEl.textContent = `Moves: ${state.movesCounter}`;
}

cardList.addEventListener('click', function(e) {
    if (state.openedCards.length === 2) return;

    const currentCard = e.target.closest('button');
    if (!currentCard) return;

    state.cards.forEach(function(item) {
        if (item.id == currentCard.dataset.id && !item.isOpened) {
            item.isOpened = true;
            state.openedCards.push(item);
            if (state.openedCards.length === 2) {
                state.movesCounter++;
                renderCounts();
            }
            currentCard.querySelector('img').setAttribute('src', getImgPath(item));
            currentCard.querySelector('img').setAttribute('alt', getImgAlt(item));
        }
    });

    if (state.openedCards.length === 2) compareCards();
});

function compareCards() {
    if (state.openedCards[0].img === state.openedCards[1].img) {
        state.openedCards[0].isPaired = true;
        state.openedCards[1].isPaired = true;
        state.pairsCounter++;
        renderCounts();
        if (state.pairsCounter === 8) {
            console.log('You win!');
        }
        state.openedCards = [];
    } else {
        state.timerId = setTimeout(() => {
            state.openedCards[0].isOpened = false;
            state.openedCards[1].isOpened = false;
            renderCards();
            state.openedCards = [];
            state.timerId = null;
        }, 1000);
    }
}

renderElements();
renderCards();
renderCounts();