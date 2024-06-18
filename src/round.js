const createRound = deck => ({
  deck,
  turns: 0,
  currentCard: deck[0],
  incorrectGuesses: [],
});

module.exports = { createRound };
