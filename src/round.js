const createRound = deck => ({
  deck,
  turns: 0,
  currentCard: deck[0],
  incorrectGuesses: [],
});

const calculatePercentCorrect = round => {
  if (!round.turns) return 0;

  const numCorrectGuesses = round.turns - round.incorrectGuesses.length;
  return ~~((numCorrectGuesses / round.turns) * 100);
};

const endRound = round => {
  const percentageCorrect = calculatePercentCorrect(round);
  const message = `** Round over! ** You answered ${percentageCorrect}% of the questions correctly!`;
  console.log(message);
};

module.exports = { createRound, calculatePercentCorrect, endRound };
