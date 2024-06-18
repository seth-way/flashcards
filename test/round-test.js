const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { createDeck, countCards } = require('../src/deck');
const {
  createRound,
  takeTurn,
  evaluateGuess,
  calculatePercentCorrect,
  endRound,
} = require('../src/round');
const { prototypeData } = require('../src/data');

describe('createRound', function () {
  it('should be a function', function () {
    expect(createRound).to.be.a('function');
  });

  it('should create a round & its properties', function () {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    expect(round.deck).to.eql(deck);
    expect(round.currentCard).to.eql(deck[0]);
    expect(round.turns).to.equal(0);
    expect(round.incorrectGuesses).to.be.an('array');
    expect(round.incorrectGuesses).to.eql([]);
  });

  it('should create a different round when given different arguments', function () {
    const card1 = createCard(
      1,
      'What allows you to define a set of related information using key-value pairs?',
      ['object', 'array', 'function'],
      'object'
    );
    const card2 = createCard(
      2,
      'What is a comma-separated list of related values?',
      ['array', 'object', 'function'],
      'array'
    );
    const deck = createDeck([card1, card2]);
    const round = createRound(deck);

    expect(round.deck).to.eql([card1, card2]);
    expect(round.currentCard).to.eql(card1);
  });
});

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

  it("should store the id's of incorrect guess in the `incorrectGuesses` array", () => {
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
  });

  it('should give appropriate feedback for correct/incorrect guesses', () => {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    const answer1 = deck[0].correctAnswer;

    const feedback1 = takeTurn(answer1, round);
    expect(feedback1).to.equal('correct!');

    const feedback2 = takeTurn(answer1, round);
    expect(feedback2).to.equal('incorrect!');
  });

  it('should label incorrectly answered cards & add them to the end of the deck', () => {
    const cards = prototypeData
      .map(card => createCard(...Object.values(card)))
      .slice(0, 3);
    const deck = createDeck(cards);
    const round = createRound(deck);

    const correctAnswer1 = deck[0].correctAnswer;
    const card2 = deck[1];
    const expectedQuestion2Retry = 'RETRY: ' + card2.question;

    takeTurn(correctAnswer1, round);
    expect(round.incorrectGuesses.length).to.equal(0);
    expect(countCards(round.deck)).to.equal(3);

    takeTurn('wrong answer', round);
    expect(round.incorrectGuesses.length).to.equal(1);
    expect(countCards(round.deck)).to.equal(4);

    const lastCard = round.deck[countCards(round.deck) - 1];
    expect(lastCard.question).to.equal(expectedQuestion2Retry);
  });

  it('should should only add the `RETRY` label the 1st time a card is answered incorrectly', () => {
    const cards = prototypeData
      .map(card => createCard(...Object.values(card)))
      .slice(0, 3);
    const deck = createDeck(cards);
    const round = createRound(deck);

    const correctAnswer1 = deck[0].correctAnswer;
    const correctAnswer3 = deck[2].correctAnswer;

    const card2 = deck[1];
    const expectedQuestion2Retry = 'RETRY: ' + card2.question;

    takeTurn(correctAnswer1, round);
    takeTurn('wrong answer', round);
    takeTurn(correctAnswer3, round);
    takeTurn('wrong answer', round);

    expect(round.incorrectGuesses.length).to.equal(2);
    expect(countCards(round.deck)).to.equal(5);

    const lastCard = round.deck[countCards(round.deck) - 1];
    expect(lastCard.question).to.equal(expectedQuestion2Retry);
  });
});

describe('calculatePercentCorrect', () => {
  it('should be a function', function () {
    expect(calculatePercentCorrect).to.be.a('function');
  });

  it('should calculate & return the percentage of correct guesses', () => {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    const correctAnswer1 = deck[0].correctAnswer;
    const correctAnswer2 = deck[1].correctAnswer;

    takeTurn(correctAnswer1, round);
    takeTurn(correctAnswer2, round);
    expect(calculatePercentCorrect(round)).to.equal(100);

    takeTurn('wrong answer', round);
    takeTurn('wrong answer', round);
    expect(calculatePercentCorrect(round)).to.equal(50);
  });

  it('should work with multiple round inputs', () => {
    let cards = prototypeData.map(card => createCard(...Object.values(card)));
    cards = cards.slice(0, 5);
    const deck = createDeck(cards);
    const round = createRound(deck);

    const correctAnswer1 = deck[0].correctAnswer;

    takeTurn(correctAnswer1, round);
    expect(calculatePercentCorrect(round)).to.equal(100);

    takeTurn('wrong answer', round);
    takeTurn('wrong answer', round);
    takeTurn('wrong answer', round);
    expect(calculatePercentCorrect(round)).to.equal(25);
  });
});

describe('endRound', () => {
  let originalLog;
  let loggedMessage;

  beforeEach(() => {
    originalLog = console.log;

    console.log = message => {
      loggedMessage = message;
    };
  });

  afterEach(() => {
    console.log = originalLog;
  });

  it('should be a function', () => {
    expect(endRound).to.be.a('function');
  });

  it('should print the appropriate message to the console', () => {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);
    const round = createRound(deck);

    const correctAnswer1 = deck[0].correctAnswer;
    const correctAnswer2 = deck[1].correctAnswer;

    takeTurn(correctAnswer1, round);
    takeTurn(correctAnswer2, round);
    takeTurn('wrong answer', round);
    takeTurn('wrong answer', round);

    endRound(round);
    const message =
      '** Round over! ** You answered 50% of the questions correctly!';
    expect(loggedMessage).to.equal(message);
  });

  it('should work with multiple round inputs', () => {
    let cards = prototypeData.map(card => createCard(...Object.values(card)));
    cards = cards.slice(0, 5);
    const deck = createDeck(cards);
    const round = createRound(deck);

    const correctAnswer1 = deck[0].correctAnswer;

    takeTurn(correctAnswer1, round);
    takeTurn('wrong answer', round);
    takeTurn('wrong answer', round);
    takeTurn('wrong answer', round);

    endRound(round);
    const message =
      '** Round over! ** You answered 25% of the questions correctly!';
    expect(loggedMessage).to.equal(message);
  });
});
