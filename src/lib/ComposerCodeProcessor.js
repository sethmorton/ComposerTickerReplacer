import Alpaca from "@alpacahq/alpaca-trade-api";
import yahooFinance from "yahoo-finance2";
import K1Json from "$lib/assets/k1.json";
import cacheData from "$lib/assets/cache.json";
import chowdown from "chowdown";
import { PAPER_API_KEY_ALPACA, SECRET_KEY_ALPACA } from '$env/static/private';

class TickerReplacer {
  /**
   * @param {string} composerCode - The composer code to process.
   * @param {boolean} allowK1 - Whether to allow K1 tickers (default: false).
   * @param {Date} date - The date to use for comparisons (default: current date).
   */
  constructor(composerCode, allowK1 = false, date = new Date(), shouldReplaceStocks = false, replacementTicker = "") {
    /** @private {string} */
    this.composerCode_ = composerCode;
    
    /** @private {Alpaca} */
    this.alpaca_ = new Alpaca({
      keyId: PAPER_API_KEY_ALPACA,
      secretKey: SECRET_KEY_ALPACA,
      paper: true,
    });
    
    /** @private {Map} */
    this.cache_ = new Map();
    
    /** @private {Date} */
    this.date_ = date;
    
    /** @private {boolean} */
    this.allowK1_ = allowK1;
    
    /**
     * 
     * @type {string[]}
     */
    this.validTickers_ = [];
    
    /** @public {Array<string>} */
    this.individualTickers_ = [];
    
    /** @public {Array<Object>} */
    this.replacedTickers_ = [];
    
    /**
     * 
     * @type {string | string[]}
     */
    this.k1Tickers_ = [];

    /**
     * @private {boolean}
     * Should we replace stocks for a given ETF?
     */
    this.shouldReplaceStocks = shouldReplaceStocks;
    /**
     * @private {string}
     * The ticker to replace stocks in composer code. 
     */
    this.replacementTicker = replacementTicker;
  }

  /**
 * @typedef {Object} ReplacedTicker
 * @property {string} originalTicker - The original ticker symbol
 * @property {string} replacementTicker - The replacement ticker symbol (e.g., 'QQQ')
 * @property {boolean} isIndividualAsset - Indicates if the ticker represents an individual asset
 * @property {boolean} approved - Indicates if the replacement has been approved
 * @property {boolean} denied - Indicates if the replacement has been denied
 * @property {number} correlation - The correlation between the original and replacement tickers
 */

/**
 * @typedef {Object} ComposerData
 * @property {string} NEW_COMPOSER_CODE - The new composer code
 * @property {ReplacedTicker[]} REPLACED_TICKERS - An array of replaced tickers
 */

  /**
   * Initializes the TickerReplacer.
   * @return {Promise<void>}
   */
  async init() {
    await this.loadCache_();
    await this.initK1Tickers_();
    await this.initValidTickers_();
  }

  /**
   * Initializes the valid tickers.
   * @private
   * @return {Promise<void>}
   */
  async initValidTickers_() {
    const extractedTickers = this.extractTickersFromCode_();
    this.validTickers_ = await this.validateTickers_(extractedTickers);
  }

  /**
   * Extracts tickers from the composer code.
   * @private
   * @return {Array<string>}
   */
  extractTickersFromCode_() {
    const tickerRegex = /\s+"[A-Z]+"/gm;
    const tickers = new Set();
    let match;
    while ((match = tickerRegex.exec(this.composerCode_)) !== null) {
      tickers.add(match[0].replace(/"/g, '').trim());
    }
    return Array.from(tickers);
  }

  /**
   * Validates the given tickers.
   * @private
   * @param {Array<string>} tickers - The tickers to validate.
   * @return {Promise<Array<string>>} - The validated tickers.
   */
  async validateTickers_(tickers) {
    const validTickers = [];

    for (const ticker of tickers) {
      if (this.isValidTickerFormat_(ticker)) {
        const cachedData = this.cache_.get(ticker);
        if (cachedData && cachedData.tradable) {
          validTickers.push(ticker);
        } else {
          try {
            const asset = await this.alpaca_.getAsset(ticker);
            const tradable = asset.tradable;
            if (tradable) {
              validTickers.push(ticker);
              this.cache_.set(ticker, {ticker, tradable});
            }
          } catch (error) {
            console.error(`Error validating ticker ${ticker}:`, error.message);
          }
        }
      } else {
        console.warn(`Invalid ticker format: ${ticker}`);
      }
    }

    return validTickers;
  }

  /**
   * Initializes the K1 tickers.
   * @private 
   * @return {Promise<void>}
   */
  async initK1Tickers_() {
    const k1Json = JSON.stringify(K1Json);
    this.k1Tickers_ = JSON.parse(k1Json).map((/** @type {{ ticker: string; }} */ item) => item.ticker);
  }

  /**
   * Loads the cache from file.
   * @private
   * @return {Promise<void>}
   */
  async loadCache_() {
    try {
      // if node js
      // if (typeof window === 'undefined') {
      // const cacheFilePath = path.join(__dirname, 'cache.json');
      // const cacheData = await fs.readFile(cacheFilePath, 'utf8')
      // this.cache_ = new Map(Object.entries(cacheData || {}));
      // } 
      // else {
        this.cache_ = new Map(Object.entries(cacheData || {}));
      // }
    } catch (err) {
      if (err.code !== 'ENOENT') {
        console.error('Error reading cache file:', err);
      }
    }
  }

  /**
   * Fetches data for the given ticker and caches it if not already cached or if the existing data is invalid.
   * @param {string} ticker - The ticker symbol to fetch data for.
   * @return {Promise<cachedData|undefined>} - The fetched data or undefined if an error occurs.
   */
  async fetchAndCacheData_(ticker) {
    /** @type {cachedData} */
    const cachedData = this.cache_.get(ticker);
    console.log(cachedData);
  
    if (this.isDataValid_(cachedData)) {
      console.log(`Using cached data for ${ticker}:`, cachedData);
      return cachedData;
    }
  
    try {
      const data = await this.fetchData_(ticker);
      const existingData = this.cache_.get(ticker) || {};
      this.cache_.set(ticker, { ...existingData, ...data });
      console.log(`Fetched data for ${ticker}:`, data);
      return data;
    } catch (error) {
      return undefined;
    }
  }
  
  /**
   * @typedef {Object} cachedData
   * @property {string} [inceptionDate] - The inception date of the ticker
   * @property {string[]} [correlatedTickers] - An array of correlated ticker symbols
   * @property {boolean} [isIndividualAsset] - Indicates if the ticker represents an individual asset
   * @property {boolean} [isK1Ticker] - Indicates if the ticker is a K1 ticker
   */

  /**
   * Checks if the given data is valid.
   * @private
   * @param {cachedData} data - The data to validate.
   * @return {boolean} - True if the data is valid, false otherwise.
   */
  isDataValid_(data) {
    return (
      data &&
      data.inceptionDate !== undefined &&
      data.correlatedTickers !== undefined &&
      data.isIndividualAsset !== undefined &&
      data.isK1Ticker !== undefined
    );
  }

  /**
   * Scrapes composer ETF data for the given ticker.
   * @private
   * @param {string} ticker - The ticker symbol to scrape data for.
   * @return {Promise<ProcessedData|undefined>} - The scraped data or undefined if an error occurs.
   */
  async scrapeComposerEtfData_(ticker) {
    try {
      const scope = await chowdown(`https://www.composer.trade/etf/${ticker}`);

      if (scope.error) {
        console.error(`Error fetching data for ${ticker}:`);
        return undefined;
      }

      const scriptContent = await scope.string('script#__NEXT_DATA__');
      return this.processScriptContent_(scriptContent);
    } catch (error) {
      console.error(`Error fetching data for ${ticker}:`, error);
      return undefined;
    }
  }

/**
 * @typedef {Object} EtfData
 * @property {string} ticker - The ETF ticker symbol
 * @property {number} correlation - The 1-year correlation value
 */

/**
 * @typedef {Object} ProcessedData
 * @property {string} inceptionDate - The listing date of the ETF
 * @property {EtfData[]} data - The merged array of correlated and related ETFs
 */

/**
 * Processes the script content and extracts relevant data.
 * @private
 * @param {string} scriptContent - The script content to process.
 * @return {ProcessedData} - The processed data.
 */
processScriptContent_(scriptContent) {
  const json = JSON.parse(scriptContent);
  const listingDate = json.props.pageProps.data.characteristics.ListingDate;
  console.log(listingDate);

  const correlatedEtfs = json.props.pageProps.data.relations.correlated
    .sort((a, b) => b.correlation_1y - a.correlation_1y)
    .filter((etf) => etf.correlation_1y > 0);
  console.log(correlatedEtfs);

  const relatedEtfs = json.props.pageProps.data.relations.related
    .sort((a, b) => b.correlation_1y - a.correlation_1y)
    .filter((etf) => etf.correlation_1y > 0);
  console.log(relatedEtfs);

  const mergedEtfs = [
    ...this.mapEtfData_(correlatedEtfs),
    ...this.mapEtfData_(relatedEtfs),
  ];

  return {
    inceptionDate: listingDate,
    data: mergedEtfs,
  };
}

/**
 * @typedef {Object} Etf
 * @property {string} ticker - The ETF ticker symbol
 * @property {number} correlation_1y - The 1-year correlation value
 */

/**
 * @typedef {Object} MappedEtf
 * @property {string} ticker - The ETF ticker symbol
 * @property {number} correlation - The 1-year correlation value
 */

/**
 * Maps ETF data to a simplified format.
 * @private
 * @param {Etf[]} etfs - The ETFs to map.
 * @return {MappedEtf[]} - The mapped ETF data.
 */
mapEtfData_(etfs) {
  return etfs.map((etf) => ({
    ticker: etf.ticker,
    correlation: etf.correlation_1y,
  }));
}

  /**
   * Fetches data for the given ticker.
   * @private
   * @param {string} ticker - The ticker symbol to fetch data for.
   * @return {Promise<Object>} - The fetched data.
   */
  async fetchData_(ticker) {
    const response = await this.scrapeComposerEtfData_(ticker);
    let inceptionDate;
    let isIndividualAsset;
    /**
     * @type {string[]}
     */
    let correlatedTickers = [];
    /**
     * @type {number[]}
     */
    let correlationValues = [];

    if (response === undefined) {
      const queryOptions = {period1: '1970-01-01'};
      const historicalData = await yahooFinance.historical(ticker, queryOptions);
      const minDate = historicalData.reduce(
        (min, item) => (item.date < min ? item.date : min),
        historicalData[0].date
      );
      inceptionDate = new Date(minDate);
      isIndividualAsset = true;
    } else {
      inceptionDate = new Date(response.inceptionDate);
      isIndividualAsset = false;
      correlatedTickers = response.data.map((item) => item.ticker) || [];
      correlationValues = response.data.map((item) => item.correlation) || [];
    }

    const result = {
      inceptionDate,
      correlatedTickers,
      correlationValues,
      isIndividualAsset,
      isK1Ticker: this.k1Tickers_.includes(ticker),
    };

    console.log(result);
    return result;
  }

  /**
   * Finds a suitable historical ticker based on the given parameters.
   * @param {string} targetTicker - The target ticker to find a historical match for.
   * @param {Date} backtestDate - The backtest date to compare against.
   * @param {boolean} [allowK1Tickers=false] - Whether to allow K1 tickers.
   * @param {Set<string>} [visitedTickers=new Set()] - Set of visited tickers.
   * @return {Promise<string|null>} - The suitable historical ticker or null if not found.
   */
  async findHistoricalTicker_(
    targetTicker,
    backtestDate,
    allowK1Tickers = false,
    visitedTickers = new Set()
  ) {
    if (visitedTickers.has(targetTicker)) {
      return null;
    }
    visitedTickers.add(targetTicker);

    const data = await this.fetchAndCacheData_(targetTicker);
    if (data === undefined) {
      return null;
    }
    
    const {
      inceptionDate: targetTickerInceptionString,
      correlatedTickers: targetCorrelatedTickers,
      isIndividualAsset: isTargetTickerIndividualAsset,
      isK1Ticker: isTargetTickerK1,
    } = data;
    
    if (
      targetTickerInceptionString === undefined ||
      targetCorrelatedTickers === undefined ||
      isTargetTickerIndividualAsset === undefined ||
      isTargetTickerK1 === undefined
    ) {
      return null;
    }


    const targetTickerInceptionDate = new Date(targetTickerInceptionString);

    // Check if the target ticker is suitable
    if (
      this.isUnsuitableHistoricalTicker_(
        targetTickerInceptionDate,
        backtestDate,
        isTargetTickerK1,
        allowK1Tickers
      )
    ) {
      for (const correlatedTicker of targetCorrelatedTickers) {
        if (visitedTickers.has(correlatedTicker)) {
          continue;
        }

        const {
          inceptionDate: correlatedTickerInceptionString,
          isK1Ticker: isCorrelatedTickerK1,
        } = await this.fetchAndCacheData_(correlatedTicker);

        const correlatedTickerInceptionDate = new Date(
          correlatedTickerInceptionString
        );

        if (
          this.isSuitableCorrelatedTicker_(
            allowK1Tickers,
            isCorrelatedTickerK1,
            backtestDate,
            correlatedTickerInceptionDate
          )
        ) {
          return correlatedTicker;
        }
      }

      const nextUnvisitedTicker = this.findNextUnvisitedTicker_(
        targetCorrelatedTickers,
        visitedTickers
      );
      if (nextUnvisitedTicker) {
        const foundTicker = await this.findHistoricalTicker_(
          nextUnvisitedTicker,
          backtestDate,
          allowK1Tickers,
          visitedTickers
        );
        if (foundTicker) {
          return foundTicker;
        }
      }
    }

    return targetTicker;
  }

  /**
   * Checks if a ticker is unsuitable as a historical ticker based on the given parameters.
   * @private
   * @param {Date} inceptionDate - The inception date of the ticker.
   * @param {Date} backtestDate - The backtest date to compare against.
   * @param {boolean} isK1Ticker - Whether the ticker is a K1 ticker.
   * @param {boolean} allowK1 - Whether to allow K1 tickers.
   * @return {boolean} - True if the ticker is unsuitable, false otherwise.
   */
  isUnsuitableHistoricalTicker_(
    inceptionDate,
    backtestDate,
    isK1Ticker,
    allowK1
  ) {
    return inceptionDate > backtestDate || (!allowK1 && isK1Ticker);
  }

  /**
   * Checks if a correlated ticker is suitable based on the given parameters.
   * @private
   * @param {boolean} allowK1 - Whether to allow K1 tickers.
   * @param {boolean} isK1Ticker - Whether the ticker is a K1 ticker.
   * @param {Date} backtestDate - The backtest date to compare against.
   * @param {Date} inceptionDate - The inception date of the correlated ticker.
   * @return {boolean} - True if the correlated ticker is suitable, false otherwise.
   */
  isSuitableCorrelatedTicker_(allowK1, isK1Ticker, backtestDate, inceptionDate) {
    return (allowK1 || !isK1Ticker) && backtestDate > inceptionDate;
  }

  /**
   * Finds the next unvisited ticker from the given list of tickers.
   * @private
   * @param {Array<string>} tickers - The list of tickers to search from.
   * @param {Set<string>} visitedTickers - Set of visited tickers.
   * @return {string|undefined} - The next unvisited ticker or undefined if not found.
   */
  findNextUnvisitedTicker_(tickers, visitedTickers) {
    return tickers.find((ticker) => !visitedTickers.has(ticker));
  }

  /**
   * Checks if a ticker has a valid format.
   * @private
   * @param {string} ticker - The ticker symbol to validate.
   * @return {boolean} - True if the ticker has a valid format, false otherwise.
   */
  isValidTickerFormat_(ticker) {
    const tickerFormatRegex = /^([A-Za-z]{1,5})(-[A-Za-z]{1,2})?$/;
    return tickerFormatRegex.test(ticker);
  }

  async getTickerReplacements() {
    const replacements = [];
  
    for (const ticker of this.validTickers_) {
      const historicalTicker = await this.findHistoricalTicker_(
        ticker,
        this.date_,
        this.allowK1_
      );
  
      if (this.shouldReplaceStocks && this.replacementTicker !== "") {
        console.log("Replacing stocks for", this.replacementTicker);
        if (
          this.cache_.get(historicalTicker).isIndividualAsset &&
          new Date(this.cache_.get(ticker).inceptionDate) < new Date(this.date_)
        ) {
          replacements.push({
            originalTicker: ticker,
            replacementTicker: this.replacementTicker,
            isIndividualAsset: true,
          });
          // this.individualTickers_.push(ticker);
        }
      }
      if (historicalTicker !== ticker) {
        const tickerData = this.cache_.get(ticker);
        const correlationIndex = tickerData.correlatedTickers.indexOf(historicalTicker);
        const correlation = tickerData.correlationValues[correlationIndex];
        if (!this.cache_.get(historicalTicker).isIndividualAsset) {
        replacements.push({
          originalTicker: ticker,
          replacementTicker: historicalTicker,
          correlation: correlation,
          isIndividualAsset: false,
        });
      }
      }
    }
  
    return replacements;
  }


  async replaceTickersInComposerCode(replacements) {
    for (const replacement of replacements) {
      if (replacement.denied !== undefined && replacement.denied) {
        continue;
      }
        await this.replaceTickerInComposerCode(
          this.composerCode_,
          replacement.originalTicker,
          replacement.replacementTicker
        );
    }

    return {NEW_COMPOSER_CODE : this.replaceStackedQuotesInComposerCode(this.composerCode_), REPLACED_TICKERS: replacements};
  }
  
  /**
   * 
   * @param {*} composerCode 
   * @param {*} ticker 
   * @param {*} newTicker 
   * @param {*} replaceConditional 
   */
  async replaceTickerInComposerCode(
    composerCode,
    ticker,
    newTicker,
    replaceConditional = false
  ) {
    const escapedTicker = ticker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    let replacedCode = "";

    if (replaceConditional) {
      const regex = new RegExp(`"${escapedTicker}"`, "g");
      replacedCode = composerCode.replace(regex, `"${newTicker}"`);
    } else {
      const regex = new RegExp(`asset\\s+"${ticker}"`, "g");
      replacedCode = composerCode.replace(regex, `asset "${newTicker}"`);
    }

    this.composerCode_ = replacedCode;
  }


  /**
   * 
   * @param {string} inputString 
   * @returns Composer Code
   */
  replaceStackedQuotesInComposerCode(inputString) {
    const stackedQuotePattern = /\[\(group\s+((?:(?!\[).)*)\s+/gm;
    const stackedQuoteMatches = inputString.match(stackedQuotePattern);

    if (!stackedQuoteMatches) {
      return inputString;
    }
  
    for (const stackedQuoteMatch of stackedQuoteMatches) {
      if (stackedQuoteMatch.split('"').length > 3) {
        const strippedStackedQuote = stackedQuoteMatch.replace(/"/g, '');
        const updatedStackedQuote = strippedStackedQuote.replace(
          `[(group`,
          `[(group "`
        );
        const finalStackedQuote = updatedStackedQuote + '"';
        inputString = inputString.replace(stackedQuoteMatch, finalStackedQuote);
      }
    }
  
    return inputString;
  }
  // async saveCache() {
  //   const cacheFilePath = path.join(__dirname, "cache.json");
  //   const cacheData = JSON.stringify(Object.fromEntries(this.cache));
  //   try {
  //     await fs.writeFile(cacheFilePath, cacheData);
  //   } catch (err) {
  //     console.error("Error writing cache file:", err);
  //   }
  // }
}

export default TickerReplacer;

// main().catch((error) => console.error(error));
