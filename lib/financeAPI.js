const yahooFinance = require("yahoo-finance2").default;
const { mapToStockSocket } = require("./utils");

const getTickerDataFactory = (node) => (symbols) => {
  const promises = [...symbols].map((symbol) =>
    yahooFinance
      .quoteSummary(symbol, {
        modules: ["price"],
      })
      .then((quote) => {
        node.send({ payload: mapToStockSocket(quote.price) });
        return symbol;
      })
      .catch((e) => {
        node.error(e);
        return [];
      })
  );

  return Promise.all(promises);
};

module.exports = {
  getTickerDataFactory,
};
