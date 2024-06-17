const evaluateGuess = (guess, correctAnswer) => {
  if (guess === correctAnswer) return 'correct!';
  return 'incorrect!';
};

const takeTurn = (guess, round) => {
  const currentCard = round.deck.shift();
  round.turns += 1;
  round.currentCard = round.deck[0];
  if (guess === currentCard.correctAnswer) return 'correct!';

  round.incorrectGuesses.push(currentCard.id);
  return 'incorrect!';
};

module.exports = { evaluateGuess, takeTurn };
