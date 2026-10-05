'use strict';

const body = document.body;
const cardList = document.createElement('ul');
const section = document.createElement('section');

const renderElements = function() {
    section.classList.add('memory-game');
    cardList.classList.add('cards');
    section.appendChild(cardList);
    body.prepend(section);
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

renderElements();
renderCards();