# `@leipert/node-red-contrib-yahoo-finance`

> Nodes to retrieve stock information from YAHOO Finance.

## Usage

The package has two different nodes:

- `stock-request`: A node that gets the information on request
- `stock-ticker`: A node that provides real time updates, whenever a trade happens.

Both nodes will provide the same output.

### `stock-request` node

![](https://gitlab.com/leipert-projects/npm-packages/-/raw/main/scoped/node-red-contrib-stock-ticker/assets/stock-request.png)

Simply specify a comma separated list of stock symbols you are interested in.

You can either specify the tickers you are interested in the node config or via `msg.payload`.
The tickers from the config will be preferred.

### `stock-ticker` node

![](https://gitlab.com/leipert-projects/npm-packages/-/raw/main/scoped/node-red-contrib-stock-ticker/assets/stock-ticker.png)

Simply specify a comma separated list of stock symbols you are interested in.

Will send a retrieve stock information directly after connecting and once the next trade happens.

- Inject `true` to (re)-start the connection.
- Inject `false` to stop the connection.

## Example message payload

Equity:

```json
{
  "id": "TSLA",
  "price": 1219.8299560546875,
  "time": 1636146686000,
  "exchange": "NMS",
  "quoteType": "EQUITY",
  "marketHours": "POST_MARKET",
  "changePercent": -0.18492990732192993,
  "change": -2.260009765625,
  "priceHint": "2"
}
```

Crypto:

```json
{
  "id": "ETH-USD",
  "price": 4467.684,
  "time": 1636146722000,
  "exchange": "CCC",
  "quoteType": "CRYPTOCURRENCY",
  "marketHours": "REGULAR_MARKET",
  "changePercent": -1.0066552,
  "change": -45.43164,
  "priceHint": "2",
  "currency": "USD",
  "dayVolume": 15251728384,
  "dayHigh": 4568.065,
  "dayLow": 4453.6626,
  "shortName": "Ethereum USD",
  "lastSize": 15251728384,
  "vol_24hr": 15251728384,
  "volAllCurrencies": 15251728384,
  "fromcurrency": "ETH",
  "lastMarket": "CoinMarketCap",
  "circulatingSupply": 118222240,
  "marketcap": 528179625984
}
```

Exchange Rate:

```json
{
  "id": "EURUSD=X",
  "price": 1.156738,
  "time": 1636146889000,
  "exchange": "CCY",
  "quoteType": "CURRENCY",
  "marketHours": "REGULAR_MARKET",
  "changePercent": 0.080971303,
  "change": 0.00093591213,
  "priceHint": "4"
}
```
