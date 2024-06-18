const createRound = deck => ({
  deck,
  turns: 0,
  currentCard: deck[0],
  incorrectGuesses: [],
  start: Date.now(),
});

const evaluateGuess = (guess, correctAnswer) => {
  if (guess === correctAnswer) return 'correct!';
  return 'incorrect!';
};

const takeTurn = (guess, round) => {
  const feedback = evaluateGuess(guess, round.currentCard.correctAnswer);
  if (feedback === 'incorrect!') {
    round.incorrectGuesses.push(round.currentCard.id);
    if (!round.currentCard.question.startsWith('RETRY: ')) {
      round.currentCard.question = 'RETRY: ' + round.currentCard.question;
    }

    round.deck.push(round.currentCard);
  }

  round.turns += 1;
  round.currentCard = round.deck[round.turns];
  return feedback;
};

const calculatePercentCorrect = round => {
  if (!round.turns) return 0;

  const numCorrectGuesses = round.turns - round.incorrectGuesses.length;
  return ~~((numCorrectGuesses / round.turns) * 100);
};

const calculateDuration = round => {
  let seconds = ~~((Date.now() - round.start) / 1000);
  let minutes = 0;

  while (seconds > 59) {
    seconds -= 60;
    minutes += 1;
  }

  return [minutes, seconds];
}

const endRound = round => {
  const [minutes, seconds] = calculateDuration(round);
  const percentageCorrect = calculatePercentCorrect(round);
  
  const message = `** Round over!\n** You answered ${percentageCorrect}% of the questions correctly!`;
  console.log(message);

  const message2 = `** It took ${minutes} minutes & ${seconds} seconds!`;
  console.log(message2);
};

module.exports = {
  createRound,
  takeTurn,
  evaluateGuess,
  calculatePercentCorrect,
  endRound,
};
