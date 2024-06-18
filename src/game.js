const data = require('./data');
const prototypeQuestions = data.prototypeData;
const util = require('./util');
const { createCard } = require('./card');
const { createRound } = require('./round');
const { createDeck, countCards } = require('./deck');

const printMessage = deck => {
  console.log(`Welcome to FlashCards! You are playing with ${countCards(
    deck
  )} cards.
  -----------------------------------------------------------------------`);
};

const printQuestion = round => {
  util.main(round);
};

const start = () => {
  const cards = prototypeQuestions.map(card =>
    createCard(...Object.values(card))
  );
  const deck = createDeck(cards);
  printMessage(deck);
  const round = createRound(deck);
  printQuestion(round);
};

module.exports = { start, printMessage, printQuestion };
