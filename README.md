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

## Web app

Production: https://backtestextender.vercel.app, deployed by the personal Vercel project
`composer-ticker-replacer` from this repository's `main` branch.

Settings sit beside the Composer code editor on desktop and stack on mobile.
Replacement suggestions can be edited, approved, or skipped before generating code.
The result includes a replacement table, selectable code, and a copy button.
The walkthrough is available below the editor.

Use the committed pnpm lockfile to install dependencies. The npm lockfile predates
the current dependency versions.

```sh
pnpm install --frozen-lockfile --config.strictDepBuilds=false
npm exec --yes --package=node@22 -- node node_modules/vite/bin/vite.js build
npm run dev
```

Browser smoke check: paste `(defsymphony "History check" {} [(asset "TQQQ" "Nasdaq")])`,
set the date to `2000-01-01`, and select **Extend backtest**. The result replaces
TQQQ with QQQ using the bundled ticker data. Repeat with manual approval enabled,
approve the suggestion, generate code, and check that **Copy updated code** copies
the displayed result.

`npm run check` currently reports pre-existing errors in `updateCache.js` and the
nullable correlation field in `BacktestProcessor.ts`.
