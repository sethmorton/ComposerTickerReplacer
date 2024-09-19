# Ticker Replacer

The Ticker Replacer is a tool that processes composer code and replaces tickers with suitable historical tickers based on certain criteria. It utilizes the Alpaca API, Yahoo Finance, and web scraping techniques to fetch and validate ticker data.

## Features

- Extracts tickers from composer code
- Validates tickers using the Alpaca API
- Fetches and caches ticker data from various sources
- Finds suitable historical tickers based on inception date and correlation
- Replaces tickers in composer code with historical tickers
- Handles special cases such as K1 tickers and individual assets
- Replaces stacked quotes in composer code for proper formatting

## Dependencies

- @alpacahq/alpaca-trade-api: Alpaca API client library
- yahoo-finance2: Yahoo Finance API library
- chowdown: Web scraping library
