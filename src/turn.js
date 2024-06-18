const evaluateGuess = (guess, correctAnswer) => {
  if (guess === correctAnswer) return 'correct!';
  return 'incorrect!';
};

const takeTurn = (guess, round) => {
  const feedback = evaluateGuess(guess, round.currentCard.correctAnswer);
  if (feedback === 'incorrect!') round.incorrectGuesses.push(round.currentCard.id);

  round.turns += 1;
  round.currentCard = round.deck[round.turns]

  return feedback;
};

module.exports = { evaluateGuess, takeTurn };
