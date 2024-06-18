const createRound = deck => ({
  deck,
  turns: 0,
  currentCard: deck[0],
  incorrectGuesses: [],
});

const calculatePercentCorrect = (round) => {};

const endRound = (round) => {};

module.exports = { createRound, calculatePercentCorrect, endRound };
