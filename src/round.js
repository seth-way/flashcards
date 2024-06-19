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
};

const getCard = (round, id) => round.deck.find(card => card.id === id);

const createReportCard = round => {
  if (round.incorrectGuesses.length) {
    const incorrectGuesses = {};
    console.log('\n** Incorrectly Answered Questions:');

    round.incorrectGuesses.forEach(id => {
      if (!incorrectGuesses[id]) {
        const card = getCard(round, id);

        incorrectGuesses[id] = {
          attempts: 0,
          question: card.question.slice(7),
          answer: card.correctAnswer
        };
      }
      incorrectGuesses[id].attempts += 1;
    });

    Object.values(incorrectGuesses).forEach(({attempts, question, answer}) => {
      console.log(question);
      console.log(`* Correct Answer: ${answer} * Incorrect Attempts: ${attempts} *\n`)
    })
  }
};

const endRound = round => {
  const [minutes, seconds] = calculateDuration(round);
  const percentageCorrect = calculatePercentCorrect(round);

  const message = `** Round over!\n** You answered ${percentageCorrect}% of the questions correctly!`;
  console.log(message);

  const message2 = `** It took ${minutes} minutes & ${seconds} seconds!`;
  console.log(message2);
  createReportCard(round);
};

module.exports = {
  createRound,
  takeTurn,
  evaluateGuess,
  calculatePercentCorrect,
  createReportCard,
  endRound,
};
