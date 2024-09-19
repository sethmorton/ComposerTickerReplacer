// TickerDataService.ts
import { LRUCache } from 'lru-cache';
import K1Json from '$lib/assets/k1.json';
import ETF_LIST from '$lib/assets/ETF_LIST.json' assert { type: 'json' };
import cacheData from '$lib/assets/cache.json';
import { logger } from '$lib/logger';
import type { TickerData, ETFData } from '$lib/types';
//@ts-expect-error chowdown is not typed
import chowdown from 'chowdown';
export class TickerDataService {
	private cache: LRUCache<string, TickerData>;
	private k1Tickers: Set<string>;
	private readonly FMP_API_KEY = '6CFJbVdWgFuHuItBDuzxImfP3cZc7zj8';

	constructor() {
		this.cache = new LRUCache<string, TickerData>({ max: 1000, ttl: 1000 * 60 * 60 * 24 });
		this.k1Tickers = new Set(K1Json.filter((item) => item.ticker).map((item) => item.ticker!));
		this.initializeCache();
	}

	private initializeCache(): void {
		logger.info('Initializing cache from cache.json');
		Object.entries(cacheData).forEach(([ticker, data]) => {
			const tickerData = {
				...data,
				inceptionDate: new Date(data.inceptionDate)
			} as TickerData;
			this.cache.set(ticker, tickerData);
		});
		logger.info('Cache initialized', { cacheSize: this.cache.size });
	}

	async getTickerData(ticker: string): Promise<TickerData | undefined> {
		if (this.cache.has(ticker)) {
			logger.debug(`Cache hit for ticker: ${ticker}`);
			return this.cache.get(ticker);
		}

		logger.debug(`Cache miss for ticker: ${ticker}, fetching data`);
		const isEtf = await this.isETF(ticker);
		const data = isEtf ? await this.fetchEtfData(ticker) : await this.fetchStockData(ticker);

		if (data) {
			this.cache.set(ticker, data);
			logger.debug(`Data fetched and cached for ticker: ${ticker}`);
		}

		return data;
	}

	private async isETF(ticker: string): Promise<boolean> {
		return (ETF_LIST as Array<{ symbol: string }>).some((etf) => etf.symbol === ticker);
	}

	private async fetchStockData(ticker: string): Promise<TickerData> {
		try {
			const response = await fetch(
				`https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${this.FMP_API_KEY}`
			);
			const jsonData = await response.json();
			const ipoDate = jsonData[0]?.ipoDate;
			
			const inceptionDate = ipoDate ? new Date(ipoDate) : new Date(0); // Use Unix epoch if no IPO date

			if (!ipoDate) {
				logger.warn(`No IPO date found for stock ticker: ${ticker}. Using default date.`);
			}

			return {
				inceptionDate,
				correlatedTickers: [],
				correlationValues: [],
				isIndividualAsset: true,
				isK1Ticker: this.k1Tickers.has(ticker)
				};
		} catch (error) {
			logger.error(`Error fetching stock data for ${ticker}:`, error);
			// Return a default TickerData object in case of an error
			return {
				inceptionDate: new Date(0),
				correlatedTickers: [],
				correlationValues: [],
				isIndividualAsset: true,
				isK1Ticker: this.k1Tickers.has(ticker)
			};
		}
	}

	private async fetchEtfData(ticker: string): Promise<TickerData | undefined> {
		try {
			const etfData = await this.scrapeComposerEtfData(ticker);
			if (!etfData) {
				logger.warn(`No ETF data found for ticker: ${ticker}`);
				return undefined;
			}

			return {
				inceptionDate: new Date(etfData.inceptionDate),
				correlatedTickers: etfData.data.map((correlatedEtf) => correlatedEtf.ticker),
				correlationValues: etfData.data.map((correlatedEtf) => correlatedEtf.correlation),
				isIndividualAsset: false,
				isK1Ticker: this.k1Tickers.has(ticker)
			};
		} catch (error) {
			logger.error(`Error fetching ETF data for ${ticker}:`, error);
			return undefined;
		}
	}
	private async scrapeComposerEtfData(ticker: string): Promise<ETFData | undefined> {
		try {
			const scope = await chowdown(`https://www.composer.trade/etf/${ticker}`);
			if (scope.error) throw new Error(scope.error);
			const scriptContent = await scope.string('script#__NEXT_DATA__');
			return this.processScriptContent(scriptContent);
		} catch (error) {
			console.error(`Error fetching data for ${ticker}:`, error);
			return undefined;
		}
	}

	private processScriptContent(scriptContent: string): {
		inceptionDate: string;
		data: Array<{ ticker: string; correlation: number }>;
	} {
		interface ETFData {
			ticker: string;
			correlation_1y: number;
		}

		interface ScriptJson {
			props: {
				pageProps: {
					data: {
						characteristics: {
							ListingDate: string;
						};
						relations: {
							correlated: ETFData[];
							related: ETFData[];
						};
					};
				};
			};
		}

		const json: ScriptJson = JSON.parse(scriptContent);
		const { ListingDate: listingDate } = json.props.pageProps.data.characteristics;
		const correlatedEtfs = json.props.pageProps.data.relations.correlated
			.concat(json.props.pageProps.data.relations.related)
			.filter((etf: ETFData) => etf.correlation_1y > 0)
			.sort((a: ETFData, b: ETFData) => b.correlation_1y - a.correlation_1y)
			.map((etf: ETFData) => ({ ticker: etf.ticker, correlation: etf.correlation_1y }));

		return { inceptionDate: listingDate, data: correlatedEtfs };
	}

	// New method to save current cache state
	public saveCacheState(): void {
		const cacheObject: Record<string, TickerData> = {};
		for (const [key, value] of this.cache.entries()) {
			cacheObject[key] = value;
		}

		// Here you would typically write this to a file or database
		// For demonstration, we'll just log it
		logger.info('Saving cache state', { cacheSize: Object.keys(cacheObject).length });
		console.log(JSON.stringify(cacheObject, null, 2));
	}
}
