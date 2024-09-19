import type { ReplacedTicker, ComposerData } from '$lib/types';
import { logger } from '$lib/logger';
import { TickerDataService } from './TickerDataService';

export class BacktestProcessor {
	private validTickers: string[] = [];
	private tickerDataService: TickerDataService;

	constructor(
		private date: string,
		private allowK1: boolean,
		private inputtedComposerCode: string,
		private shouldReplaceStocks: boolean,
		private replacementTicker: string,
		private replaceConditions: boolean,
		private manualApprove: boolean
	) {
		this.tickerDataService = new TickerDataService();
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
		await this.initValidTickers();

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

		const data = await this.tickerDataService.getTickerData(ticker);
		return data ? ticker : null;
	}

	private isValidTickerFormat(ticker: string): boolean {
		return /^([A-Z]{1,5})(-[A-Z]{1,2})?$/.test(ticker);
	}

	private async findHistoricalTicker(
		targetTicker: string,
		backtestDate: Date,
		allowK1Tickers = false,
		visitedTickers = new Set<string>()
	): Promise<string | null> {
		if (visitedTickers.has(targetTicker)) return null;
		visitedTickers.add(targetTicker);

		const data = await this.tickerDataService.getTickerData(targetTicker);
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

			const data = await this.tickerDataService.getTickerData(historicalTicker);
			if (!data) continue;

			const { isIndividualAsset, correlatedTickers, correlationValues } = data;

			if (this.shouldReplaceStocks && this.replacementTicker && isIndividualAsset) {
				const replacementData = await this.tickerDataService.getTickerData(this.replacementTicker);
				if (!replacementData) continue;

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
		if (this.replaceConditions) {
			// Replace all occurrences
			return code.replace(regex, `"${newTicker}"`);
		} else {
			// Replace only outside of if statements
			return code.replace(
				/(if\s*\([^)]*\)[^{]*{[^}]*})|"${originalTicker}"/g,
				(match, ifStatement) => {
					if (ifStatement) {
						// If it's an if statement, return it unchanged
						return ifStatement;
					}
					// Otherwise, replace the ticker
					return `"${newTicker}"`;
				}
			);
		}
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
