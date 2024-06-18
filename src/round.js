const createRound = deck => ({
  deck,
  turns: 0,
  currentCard: deck[0],
  incorrectGuesses: [],
});

const evaluateGuess = (guess, correctAnswer) => {
  if (guess === correctAnswer) return 'correct!';
  return 'incorrect!';
};

const takeTurn = (guess, round) => {
  const feedback = evaluateGuess(guess, round.currentCard.correctAnswer);
  if (feedback === 'incorrect!')
    round.incorrectGuesses.push(round.currentCard.id);

  round.turns += 1;
  round.currentCard = round.deck[round.turns];

  return feedback;
};

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

module.exports = {
  createRound,
  takeTurn,
  evaluateGuess,
  calculatePercentCorrect,
  endRound,
};
