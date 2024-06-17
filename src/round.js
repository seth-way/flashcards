const createRound = deck => ({
  deck,
  currentCard: deck[0],
  turns: 0,
  incorrectGuesses: [],
});

module.exports = { createRound };
