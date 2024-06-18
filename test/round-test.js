const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { createDeck } = require('../src/deck');
const { createRound, calculatePercentCorrect, endRound} = require('../src/round');
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

describe('calculatePercentCorrect', () => {
  it('should be a function', function () {
    expect(calculatePercentCorrect).to.be.a('function');
  });
})

describe('endRound', () => {
  it('should be a function', function () {
    expect(endRound).to.be.a('function');
  });
})
