const createDeck = deck => {
  if (!deck) return [];
  return [...deck];
};

const countCards = deck => deck.length;

module.exports = { createDeck, countCards };
