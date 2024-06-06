const { getTickerDataFactory } = require("../../lib/financeAPI");
const { parseTickers } = require("../../lib/utils");

module.exports = function (RED) {
  function StockRequestNode(config) {
    RED.nodes.createNode(this, config);

    const node = this;

    const getTickerData = getTickerDataFactory(node);

    const tickers = parseTickers(config.tickers);

    node.on("input", function (msg) {
      if (tickers.size) {
        return getTickerData(tickers);
      }

      try {
        return getTickerData(parseTickers(msg.payload));
      } catch (e) {
        return node.error(e);
      }
    });
  }

  RED.nodes.registerType("stock-request", StockRequestNode);
};
