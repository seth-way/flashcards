const chai = require('chai');
const expect = chai.expect;

const { prototypeData } = require('../src/data');
const { evaluateGuess, takeTurn } = require('../src/turn');
const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');
const { createRound } = require('../src/round');

describe('evaluateGuess', () => {
  it('should be a function', () => {
    expect(evaluateGuess).to.be.a('function');
  });

  it('should evaluate if an answer matches a correct answer', () => {
    const card = createCard(
      1,
      'What allows you to define a set of related information using key-value pairs?',
      ['object', 'array', 'function'],
      'object'
    );

    const turn1 = evaluateGuess('object', card.correctAnswer);
    expect(turn1).to.equal('correct!');

    const turn2 = evaluateGuess('array', card.correctAnswer);
    expect(turn2).to.equal('incorrect!');
  });
});

describe('takeTurn', () => {
  it("should update a round's `turns` count", () => {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    const answer1 = deck[0].correctAnswer;
    const answer2 = deck[1].correctAnswer;
    const answer3 = deck[2].correctAnswer;

    takeTurn(answer1, round);
    expect(round.turns).to.equal(1);

    takeTurn(answer2, round);
    takeTurn(answer3, round);
    expect(round.turns).to.equal(3);
  });

  it('should update `turns` count, even when answer is incorrect', () => {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    const answer1 = deck[0].correctAnswer;

    takeTurn(answer1, round);
    expect(round.turns).to.equal(1);

    takeTurn(answer1, round);
    takeTurn(answer1, round);
    expect(round.turns).to.equal(3);
  });

  it('should update `currentCard` to the next card in the deck', () => {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    const card2 = deck[1];
    const card4 = deck[3];

    const answer1 = deck[0].correctAnswer;
    const answer2 = card2.correctAnswer;
    const answer3 = deck[2].correctAnswer;

    takeTurn(answer1, round);
    expect(round.currentCard).to.eql(card2);

    takeTurn(answer2, round);
    takeTurn(answer3, round);
    expect(round.currentCard).to.eql(card4);
  });

  it('should store the id\'s of incorrect guess in the `incorrectGuesses` array', () => {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    const answer1 = deck[0].correctAnswer;
    const id2 = deck[1].id;
    const id3 = deck[2].id;

    takeTurn(answer1, round);
    expect(round.turns).to.equal(1);

    takeTurn(answer1, round);
    takeTurn(answer1, round);
    expect(round.incorrectGuesses).to.eql([id2, id3]);
  })

  it('should give appropriate feedback for correct/incorrect guesses', () => {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    const answer1 = deck[0].correctAnswer;

    const feedback1 = takeTurn(answer1, round);
    expect(feedback1).to.equal('correct!');

    const feedback2 = takeTurn(answer1, round);
    expect(feedback2).to.equal('incorrect!');
  })
});
