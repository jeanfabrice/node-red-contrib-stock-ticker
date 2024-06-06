const protobuf = require("protobufjs");
const protoBufSrc = require.resolve("stocksocket/src/PricingData.proto");
const Ticker = protobuf.loadSync(protoBufSrc).lookupType("ticker");
const WebSocket = require("ws");

const address = "wss://streamer.finance.yahoo.com";

const _noop = () => {};

module.exports = class StockSocket {
  constructor({ onUpdate, onStatusChange, onError } = {}) {
    this.ws = null;
    this.symbols = new Set();
    this.onUpdate = onUpdate || _noop;
    this.onStatusChange = onStatusChange || _noop;
    this.onError = onError || _noop;
    this.pingTimeout = null;
  }

  heartbeat() {
    clearTimeout(this.pingTimeout);

    // Use `WebSocket#terminate()`, which immediately destroys the connection,
    // instead of `WebSocket#close()`, which waits for the close timer.
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    this.pingTimeout = setTimeout(() => {
      this.changeStatus(false);
      if (this.ws) {
        this.ws.terminate();
      }
      this.ws = null;
      this.open();
    }, 30000 + 1000);
  }

  open() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }

    try {
      this.ws = new WebSocket(address);
    } catch (e) {
      this.onError(e);
      return;
    }

    this.ws.onopen = () => {
      this.heartbeat();
      this.changeStatus(true);
      this.ws.send(
        '{"subscribe":' + JSON.stringify([...this.symbols.keys()]) + "}"
      );
    };

    this.ws.onmessage = (data) => {
      const decodedData = Ticker.decode(
        Buffer.from(data.data, "base64")
      ).toJSON();
      if (this.symbols.has(decodedData.id)) {
        this.onUpdate(decodedData);
      }
    };

    this.ws.onerror = (e) => {
      this.onError(e);
    };

    this.ws.onclose = () => {
      this.changeStatus(false);
    };

    this.ws.on("ping", () => {
      this.heartbeat();
      this.changeStatus(true);
    });
  }

  addTickers(...symbols) {
    for (const symbol of symbols) {
      this.symbols.add(symbol);
    }
  }

  removeTickers(...symbols) {
    for (const symbol of symbols) {
      this.symbols.delete(symbol);
    }
  }

  changeStatus(newStatus) {
    this.onStatusChange(newStatus);
    if (!newStatus && this.pingTimeout) {
      clearTimeout(this.pingTimeout);
      this.pingTimeout = null;
    }
  }

  close() {
    this.changeStatus(false);
    if (this.ws) {
      this.ws.send("close");
    }
    this.symbols = new Set();
  }
};
