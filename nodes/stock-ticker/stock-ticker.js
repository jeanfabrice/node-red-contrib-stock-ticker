const StockSocket = require("../../lib/stocksocket");
const { getTickerDataFactory } = require("../../lib/financeAPI");
const { parseTickers } = require("../../lib/utils");

const fixData = (data) => {
  const ret = { ...data };

  ["time", "dayVolume", "lastSize", "vol_24hr", "volAllCurrencies"].forEach(
    (key) => {
      if (ret.hasOwnProperty(key)) {
        ret[key] = parseInt(ret[key], 10);
      }
    }
  );

  return ret;
};

module.exports = function (RED) {
  function StockTickerNode(config) {
    RED.nodes.createNode(this, config);

    const node = this;

    let tickers;

    try {
      tickers = parseTickers(config.tickers);
    } catch (e) {
      node.error("Could not parse `tickers` config");
      node.status({
        fill: "yellow",
        shape: "ring",
        text: "misconfigured node",
      });
      return;
    }

    if (tickers.size === 0) {
      node.warn("You need to define at least one stock ticker");
      node.status({
        fill: "yellow",
        shape: "ring",
        text: "misconfigured node",
      });
      return;
    }

    const socket = new StockSocket({
      onUpdate: (data) => {
        node.send({ payload: fixData(data) });
      },
      onStatusChange: (status) => {
        if (status) {
          node.status({ fill: "green", shape: "dot", text: "connected" });
          node.send([null, { payload: true }]);
        } else {
          node.status({ fill: "red", shape: "ring", text: "disconnected" });
          node.send([null, { payload: false }]);
        }
      },
      onError: (e) => {
        node.error(e);
      },
    });

    const getTickerData = getTickerDataFactory(node);

    const start = () => {
      node.status({ fill: "green", shape: "ring", text: "starting..." });

      getTickerData(tickers)
        .then((res) => {
          node.status({ fill: "green", shape: "ring", text: "connecting..." });

          socket.addTickers(...res.flat());

          socket.open();
        })
        .catch((e) => {
          node.error(e);
        });
    };

    node.on("input", function (msg) {
      if (msg.payload) {
        start();
      } else {
        socket.close();
      }
    });

    node.on("close", function () {
      socket.close();
    });

    if (config.autoStart) {
      start();
    }
  }

  RED.nodes.registerType("stock-ticker", StockTickerNode);
};
