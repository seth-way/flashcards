const chai = require('chai');
const expect = chai.expect;

const { createCard } = require('../src/card');
const { createDeck, countCards } = require('../src/deck');
const { prototypeData } = require('../src/data');

describe('createDeck', function () {
  it('should be a function', function () {
    expect(createDeck).to.be.a('function');
  });

  it('should create a deck & its properties', function () {
    const cards = prototypeData.map(card => createCard(...Object.values(card)));
    const deck = createDeck(cards);

    expect(deck).to.eql(cards);
  });

  it('should create a different deck when given different arguments', function () {
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
    const deck = createDeck([card1, card2])

    expect(deck).to.eql([card1, card2]);
  });

  it('should be able to handle an empty arrray argument', function() {

  })
});

describe('countCards', function () {
  it('should be a function', function () {
    expect(countCards).to.be.a('function');
  });

  it('should correctly evaluate the number of cards in a given deck', function () {
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
    const card3 = createCard(
      3,
      'What type of prototype method directly modifies the existing array?',
      ['mutator method', 'accessor method', 'iteration method'],
      'mutator method'
    );
    const deck = createDeck([card1, card2, card3])

    const count1 = countCards(deck);
    expect(count1).to.equal(3);

    const deck2 = createDeck();

    const count2 = countCards(deck2);
    expect(count2).to.equal(0);
  });
});
