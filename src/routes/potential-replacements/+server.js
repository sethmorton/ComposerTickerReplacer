import { json } from '@sveltejs/kit';
import TickerReplacer from '$lib/ComposerCodeProcessor';

export async function POST({request}) {
    
    const { date, allow_k1, inputtedComposerCode, shouldReplaceStocks, replacementTicker } = await request.json();

    const tickerReplacer = new TickerReplacer(inputtedComposerCode, allow_k1, new Date(date), shouldReplaceStocks, replacementTicker);

    // // Initialize the instance
    await tickerReplacer.init();
    const POTENTIAL_REPLACEMENTS = await tickerReplacer.getTickerReplacements();
    return json(POTENTIAL_REPLACEMENTS);
  }