import K1Json from '$lib/assets/k1.json';
import cacheData from '$lib/assets/cache.json';
import ETF_LIST from '$lib/assets/ETF_LIST.json';
import chowdown from 'chowdown';
import { LRUCache } from 'lru-cache';
import type { ReplacedTicker, ComposerData, ETFData } from '$lib/types';
import { logger } from '$lib/logger';
export class ComposerBacktestProcessor {
	private cache: LRUCache<string, any>;
	private k1Tickers: Set<string>;
	private validTickers: string[] = [];
	private FMP_API_KEY = '6CFJbVdWgFuHuItBDuzxImfP3cZc7zj8';
	constructor(
		private date: string,
		private allowK1: boolean,
		private inputtedComposerCode: string,
		private shouldReplaceStocks: boolean,
		private replacementTicker: string,
		private replaceConditions: boolean,
		private manualApprove: boolean
	) {
		this.cache = new LRUCache({ max: 1000, ttl: 1000 * 60 * 60 * 24 }); // 24 hour TTL
		this.k1Tickers = new Set(
			K1Json.filter((item) => item.ticker !== '').map((item) => item.ticker)
		);
		logger.info('ComposerBacktestProcessor initialized', {
			date,
			allowK1,
			shouldReplaceStocks,
			replacementTicker,
			replaceConditions,
			manualApprove
		});
	}

	async process(
		isInitialRequest: boolean,
		selectedReplacements: ReplacedTicker[] = []
	): Promise<ComposerData | { potentialReplacements: ReplacedTicker[] }> {
		logger.info('Starting process', { isInitialRequest });
		await this.init();

		if (isInitialRequest && this.manualApprove) {
			const potentialReplacements = await this.getTickerReplacements();
			logger.info('Potential replacements found', { count: potentialReplacements.length });
			return { potentialReplacements };
		} else {
			const replacements = this.manualApprove
				? selectedReplacements
				: await this.getTickerReplacements();
			return this.processReplacements(replacements);
		}
	}
	private async init(): Promise<void> {
		logger.info('Initializing ComposerBacktestProcessor');
		await this.loadCache();
		await this.initValidTickers();
	}

	private async loadCache(): Promise<void> {
		logger.info('Loading cache');
		Object.entries(cacheData || {}).forEach(([key, value]) => {
			this.cache.set(key, value);
		});
		logger.info('Cache loaded', { cacheSize: this.cache.size });
	}
	private async initValidTickers(): Promise<void> {
		logger.info('Initializing valid tickers');
		const extractedTickers = this.extractTickersFromCode();
		logger.info('Tickers extracted from code', { count: extractedTickers.length });
		this.validTickers = await this.validateTickers(extractedTickers);
		logger.info('Valid tickers initialized', { count: this.validTickers.length });
	}

	private extractTickersFromCode(): string[] {
		const tickerRegex = /\s+"([A-Z]+)"/gm;
		return [...new Set(Array.from(this.inputtedComposerCode.matchAll(tickerRegex), (m) => m[1]))];
	}

	private async validateTickers(tickers: string[]): Promise<string[]> {
		const validationPromises = tickers.map((ticker) => this.validateTicker(ticker));
		return (await Promise.all(validationPromises)).filter(Boolean) as string[];
	}

	private async validateTicker(ticker: string): Promise<string | null> {
		if (!this.isValidTickerFormat(ticker)) {
			logger.warn(`Invalid ticker format: ${ticker}`);
			return null;
		}

		const cachedData = this.cache.get(ticker);
		if (cachedData && cachedData.tradable) {
			logger.debug(`Ticker ${ticker} found in cache and is tradable`);
			return ticker;
		}

		try {
			const response = await fetch(
				`https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${this.FMP_API_KEY}`
			);
			const jsonData = await response.json();
			if (jsonData[0]?.ipoDate) {
				logger.debug(`Ticker ${ticker} validated and cached`);
				this.cache.set(ticker, { tradable: true });
				return ticker;
			}
			logger.debug(`Ticker ${ticker} not found or not tradable`);
			return null;
		} catch (error) {
			logger.error(`Error validating ticker ${ticker}:`, error);
			return null;
		}
	}
	private isValidTickerFormat(ticker: string): boolean {
		return /^([A-Z]{1,5})(-[A-Z]{1,2})?$/.test(ticker);
	}

	private async fetchAndCacheData(ticker: string): Promise<any> {
		const cachedData = this.cache.get(ticker);
		logger.info(`Fetching data for ${ticker}`);
		logger.info(`Cached data for ${ticker}:`, cachedData);
		if (this.isDataValid(cachedData)) {
			logger.debug(`Data for ${ticker} is valid`);
			return cachedData;
		}

		try {
			const data = await this.fetchTickerData(ticker);
			this.cache.set(ticker, { ...this.cache.get(ticker), ...data });
			return data;
		} catch (error) {
			return undefined;
		}
	}

	private isDataValid(data: any): boolean {
		return (
			data &&
			data.inceptionDate instanceof Date &&
			Array.isArray(data.correlatedTickers) &&
			Array.isArray(data.correlationValues) &&
			typeof data.isIndividualAsset === 'boolean' &&
			typeof data.isK1Ticker === 'boolean'
		);
	}

	private async isETF(ticker: string): Promise<boolean> {
		logger.info(`Checking if ${ticker} is an ETF`);
		return ETF_LIST.some((etf) => etf.symbol === ticker);
	}

	private async fetchTickerData(ticker: string): Promise<any> {
		const IS_ETF = await this.isETF(ticker);
		if (IS_ETF === false) {
			const apiUrl = `https://financialmodelingprep.com/api/v3/profile/${ticker}?apikey=${this.FMP_API_KEY}`;
			const response = await fetch(apiUrl);
			const jsonData = await response.json();
			const ipoDate = jsonData[0].ipoDate;
			return {
				inceptionDate: new Date(ipoDate),
				correlatedTickers: [],
				correlationValues: [],
				isIndividualAsset: true,
				isK1Ticker: this.k1Tickers.has(ticker)
			};
		} else {
			const ETF_DATA = await this.scrapeComposerEtfData(ticker);
			return {
				inceptionDate: new Date(ETF_DATA.inceptionDate),
				correlatedTickers: ETF_DATA.data.map((correlatedEtf: any) => correlatedEtf.ticker),
				correlationValues: ETF_DATA.data.map((correlatedEtf: any) => correlatedEtf.correlation),
				isIndividualAsset: false,
				isK1Ticker: this.k1Tickers.has(ticker)
			};
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
		const json = JSON.parse(scriptContent);
		const { ListingDate: listingDate } = json.props.pageProps.data.characteristics;
		const correlatedEtfs = json.props.pageProps.data.relations.correlated
			.concat(json.props.pageProps.data.relations.related)
			.filter((etf: any) => etf.correlation_1y > 0)
			.sort((a: any, b: any) => b.correlation_1y - a.correlation_1y)
			.map((etf: any) => ({ ticker: etf.ticker, correlation: etf.correlation_1y }));

		return { inceptionDate: listingDate, data: correlatedEtfs };
	}

	private async findHistoricalTicker(
		targetTicker: string,
		backtestDate: Date,
		allowK1Tickers = false,
		visitedTickers = new Set<string>()
	): Promise<string | null> {
		if (visitedTickers.has(targetTicker)) return null;
		visitedTickers.add(targetTicker);

		const data = await this.fetchAndCacheData(targetTicker);
		if (!data) return null;

		const { inceptionDate, correlatedTickers, isK1Ticker } = data;

		if (this.isSuitableHistoricalTicker(inceptionDate, backtestDate, isK1Ticker, allowK1Tickers)) {
			return targetTicker;
		}

		for (const correlatedTicker of correlatedTickers) {
			if (visitedTickers.has(correlatedTicker)) continue;
			const result = await this.findHistoricalTicker(
				correlatedTicker,
				backtestDate,
				allowK1Tickers,
				visitedTickers
			);
			if (result) return result;
		}

		return null;
	}

	private isSuitableHistoricalTicker(
		inceptionDate: Date,
		backtestDate: Date,
		isK1Ticker: boolean,
		allowK1: boolean
	): boolean {
		return inceptionDate <= backtestDate && (allowK1 || !isK1Ticker);
	}

	private async getTickerReplacements(): Promise<ReplacedTicker[]> {
		const replacements: ReplacedTicker[] = [];
		const backtestDate = new Date(this.date);

		for (const ticker of this.validTickers) {
			const historicalTicker = await this.findHistoricalTicker(ticker, backtestDate, this.allowK1);
			if (!historicalTicker) continue;

			const { isIndividualAsset, correlatedTickers, correlationValues } =
				await this.fetchAndCacheData(historicalTicker);

			if (this.shouldReplaceStocks && this.replacementTicker && isIndividualAsset) {
				const replacementData = await this.fetchAndCacheData(this.replacementTicker);
				const correlationIndex = replacementData.correlatedTickers.indexOf(ticker);
				const correlation =
					correlationIndex !== -1 ? replacementData.correlationValues[correlationIndex] : null;

				replacements.push({
					originalTicker: ticker,
					replacementTicker: this.replacementTicker,
					isIndividualAsset: true,
					correlation: correlation
				});
			} else if (historicalTicker !== ticker) {
				const correlationIndex = correlatedTickers.indexOf(ticker);
				const correlation =
					correlationIndex !== -1
						? correlationValues[correlationIndex]
						: Math.max(...correlationValues);

				replacements.push({
					originalTicker: ticker,
					replacementTicker: historicalTicker,
					correlation: correlation,
					isIndividualAsset: false
				});
			}
		}
		return replacements;
	}

	private processReplacements(replacements: ReplacedTicker[]): ComposerData {
		logger.info('Processing replacements', { count: replacements.length });
		let newComposerCode = this.inputtedComposerCode;
		for (const { originalTicker, replacementTicker, denied } of replacements) {
			if (denied) {
				logger.debug(`Replacement denied for ${originalTicker}`);
				continue;
			}
			newComposerCode = this.replaceTickerInCode(
				newComposerCode,
				originalTicker,
				replacementTicker
			);
			logger.debug(`Replaced ${originalTicker} with ${replacementTicker} in code`);
		}
		const processedCode = this.replaceStackedQuotesInComposerCode(newComposerCode);
		logger.info('Replacements processing completed');
		return {
			NEW_COMPOSER_CODE: processedCode,
			REPLACED_TICKERS: replacements
		};
	}

	private replaceTickerInCode(code: string, originalTicker: string, newTicker: string): string {
		const regex = new RegExp(`"${originalTicker}"`, 'g');
		return code.replace(regex, `"${newTicker}"`);
	}

	private replaceStackedQuotesInComposerCode(inputString: string): string {
		const stackedQuotePattern = /\[\(group\s+((?:(?!\[).)*)\s+/gm;
		return inputString.replace(stackedQuotePattern, (match) => {
			if (match.split('"').length > 3) {
				const strippedStackedQuote = match.replace(/['"\\]/g, '');
				return `[(group "${strippedStackedQuote.replace('[(group', '').trim()}"`;
			}
			return match;
		});
	}
}
