import { BacktestProcessor } from '$lib/BacktestProcessor';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const {
		date,
		allowK1,
		inputtedComposerCode,
		shouldReplaceStocks,
		replacementTicker,
		replaceConditions,
		manualApprove,
		isInitialRequest,
		selectedReplacements
	} = await request.json();

	const processor = new BacktestProcessor(
		date,
		allowK1,
		inputtedComposerCode,
		shouldReplaceStocks,
		replacementTicker,
		replaceConditions,
		manualApprove
	);

	const result = await processor.process(isInitialRequest, selectedReplacements);

	return new Response(JSON.stringify(result), { status: 200 });
};
