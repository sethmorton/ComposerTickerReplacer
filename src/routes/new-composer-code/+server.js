import { json } from '@sveltejs/kit';
import TickerReplacer from '$lib/ComposerCodeProcessor';

export async function POST({request}) {
    
    const { date, allow_k1, inputtedComposerCode, shouldReplaceStocks, replacementTicker, replacements, replaceConditions} = await request.json();
    console.log("selectedReplacements", replacements);
    const tickerReplacer = new TickerReplacer(inputtedComposerCode, allow_k1, new Date(date), shouldReplaceStocks, replacementTicker);

    // // Initialize the instance
    // await tickerReplacer.init();
    const NEW_COMPOSER_CODE = await tickerReplacer.replaceTickersInComposerCode(replacements, replaceConditions);
    return json(NEW_COMPOSER_CODE);

    // return json(POTENTIAL_REPLACEMENTS);
  }