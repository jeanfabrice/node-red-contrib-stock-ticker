const MARKET_SUFFIX = "_MARKET";

const mapToStockSocket = (price) => {
  const crypto =
    price.quoteType === "CRYPTOCURRENCY"
      ? {
          currency: price.currency,
          dayVolume: price.regularMarketVolume,
          dayHigh: price.regularMarketDayHigh,
          dayLow: price.regularMarketDayLow,
          shortName: price.shortName,
          lastSize: price.volume24Hr,
          vol_24hr: price.volume24Hr,
          volAllCurrencies: price.volumeAllCurrencies,
          fromcurrency: price.fromCurrency,
          lastMarket: price.quoteSourceName,
          circulatingSupply: price.circulatingSupply,
          marketcap: price.marketCap,
        }
      : {};

  let marketHours = price.marketState.toUpperCase();

  if (!marketHours.endsWith(MARKET_SUFFIX)) {
    marketHours += MARKET_SUFFIX;
  }

  return {
    id: price.symbol,
    price: price.regularMarketPrice,
    time: price.regularMarketTime.getTime(),
    exchange: price.exchange,
    quoteType: price.quoteType,
    marketHours,
    changePercent: price.regularMarketChangePercent * 100,
    change: price.regularMarketChange,
    priceHint: price.priceHint.toString(),
    ...crypto,
  };
};

const parseTickers = (payload) =>
  new Set(
    payload
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean)
  );

module.exports = {
  mapToStockSocket,
  parseTickers,
};
