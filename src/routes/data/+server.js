import { json } from '@sveltejs/kit';
import TickerReplacer from '$lib/ComposerCodeProcessor';

// const composerCodeProcessor = new ComposerCodeProcessor();

export async function POST({request}) {
    
    const { date, allow_k1, inputtedComposerCode, shouldReplaceStocks, replacementTicker } = await request.json();

    const composerCodeProcessor = new TickerReplacer(inputtedComposerCode, allow_k1, new Date(date), shouldReplaceStocks, replacementTicker);

    // // Initialize the instance
    await composerCodeProcessor.init();
    console.log(composerCodeProcessor.validTickers);
    const NEW_COMPOSER_CODE = await composerCodeProcessor.replaceTickersInComposerCode();
    const OBJ = {NEW_COMPOSER_CODE, INDIVIDUAL_TICKERS: composerCodeProcessor.individualTickers_, REPLACED_TICKERS: composerCodeProcessor.replacedTickers_};
    return json(OBJ);
  }