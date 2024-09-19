const fs = require('fs').promises;
const path = require('path');
const chowdown = require('chowdown');

const cachePath = path.join(process.cwd(), 'assets', 'cache.json');
const FMP_API_KEY = '6CFJbVdWgFuHuItBDuzxImfP3cZc7zj8';

async function loadCache() {
	try {
		const data = await fs.readFile(cachePath, 'utf8');
		return JSON.parse(data);
	} catch (error) {
		console.error('Error loading cache:', error);
		return {};
	}
}

async function saveCache(cache) {
	try {
		await fs.writeFile(cachePath, JSON.stringify(cache, null, 2));
		console.log('Cache updated successfully');
	} catch (error) {
		console.error('Error saving cache:', error);
	}
}

async function validateTicker(ticker) {
	try {
		const response = await fetch(
			`https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${FMP_API_KEY}`
		);
		const jsonData = await response.json();
		return !!jsonData[0]?.ipoDate;
	} catch (error) {
		console.error(`Error validating ticker ${ticker}:`, error);
		return false;
	}
}

async function scrapeComposerEtfData(ticker) {
	try {
		const scope = await chowdown(`https://www.composer.trade/etf/${ticker}`);
		if (scope.error) throw new Error(scope.error);
		const scriptContent = await scope.string('script#__NEXT_DATA__');
		const json = JSON.parse(scriptContent);
		const { ListingDate: listingDate } = json.props.pageProps.data.characteristics;
		const correlatedEtfs = json.props.pageProps.data.relations.correlated
			.concat(json.props.pageProps.data.relations.related)
			.filter((etf) => etf.correlation_1y > 0)
			.sort((a, b) => b.correlation_1y - a.correlation_1y)
			.slice(0, 20);

		return {
			inceptionDate: new Date(listingDate).toISOString(),
			correlatedTickers: correlatedEtfs.map((etf) => etf.ticker),
			correlationValues: correlatedEtfs.map((etf) =>
				parseFloat(etf.correlation_1y.toFixed(4))
			),
			isIndividualAsset: false,
			isK1Ticker: false
		};
	} catch (error) {
		console.error(`Error fetching ETF data for ${ticker}:`, error);
		return null;
	}
}

async function fetchStockData(ticker) {
	try {
		const response = await fetch(
			`https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${FMP_API_KEY}`
		);
		const jsonData = await response.json();
		const ipoDate = jsonData[0].ipoDate;
		return {
			inceptionDate: new Date(ipoDate).toISOString(),
			correlatedTickers: [],
			correlationValues: [],
			isIndividualAsset: true,
			isK1Ticker: false
		};
	} catch (error) {
		console.error(`Error fetching stock data for ${ticker}:`, error);
		return null;
	}
}

async function updateCache(tickers) {
	const cache = await loadCache();
	const updatedTickers = [];
	const skippedTickers = [];

	for (const ticker of tickers) {
		if (cache[ticker]) {
			console.log(`Ticker ${ticker} already exists in cache. Skipping.`);
			skippedTickers.push(ticker);
			continue;
		}

		if (!(await validateTicker(ticker))) {
			console.log(`Ticker ${ticker} is not valid. Skipping.`);
			skippedTickers.push(ticker);
			continue;
		}

		const tickerData = (await scrapeComposerEtfData(ticker)) || (await fetchStockData(ticker));

		if (tickerData) {
			cache[ticker] = {
				ticker,
				tradable: true,
				...tickerData
			};
			updatedTickers.push(ticker);
			console.log(`Added ${ticker} to cache.`);
		} else {
			console.log(`Unable to fetch data for ${ticker}. Skipping.`);
			skippedTickers.push(ticker);
		}
	}

	if (updatedTickers.length > 0) {
		await saveCache(cache);
	}

	return { updatedTickers, skippedTickers };
}

// Array of tickers to update
const tickersToUpdate = [
	'SPY',
	'VIXY',
	'QQQ',
	'XLK',
	'IYY',
	'VTV',
	'VOX',
	'XLP',
	'FAS',
	'TMF',
	'BIL',
	'TMV',
	'BTAL',
	'VIXM',
	'TQQQ',
	'XLU',
	'DBC',
	'ERX',
	'NUGT',
	'TECL',
	'AGG',
	'SVXY',
	'UPRO',
	'TLT',
	'UUP',
	'UVXY',
	'SOXL',
	'LLY',
	'NVO',
	'COST',
	'GE',
	'SOXX',
	'PSQ',
	'SPHB',
	'NAIL',
	'GBTC',
	'UGL',
	'BND',
	'HYG',
	'VUG',
	'XLE',
	'SOXS',
	'SQQQ',
	'TECS',
	'GLD',
	'SPXU',
	'IEF',
	'SPLV',
	'UDOW',
	'FAZ',
	'MSFT',
	'AAPL',
	'NVDA',
	'AMZN',
	'GOOGL',
	'META',
	'TSLA',
	'AMD',
	'ADBE',
	'NFLX',
	'XME',
	'FCG',
	'UNG',
	'KOLD',
	'UCO',
	'DBO',
	'COIN'
];

// Main execution
async function main() {
	console.log(`Updating cache for tickers: ${tickersToUpdate.join(', ')}`);
	const { updatedTickers, skippedTickers } = await updateCache(tickersToUpdate);

	console.log('\nSummary:');
	console.log(`Updated tickers: ${updatedTickers.join(', ') || 'None'}`);
	console.log(`Skipped tickers: ${skippedTickers.join(', ') || 'None'}`);
}

main().catch(console.error);
