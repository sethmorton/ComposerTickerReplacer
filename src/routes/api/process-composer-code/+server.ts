import { ComposerBacktestProcessor } from '$lib/ComposerCodeProcessor';

export async function POST({ request }) {
	const {
		date,
		allowK1,
		inputtedComposerCode,
		shouldReplaceStocks,
		replacementTicker,
		manualApprove,
		replaceConditions,
		isInitialRequest,
		selectedReplacements
	} = await request.json();

	const processor = new ComposerBacktestProcessor(
		date,
		allowK1,
		inputtedComposerCode,
		shouldReplaceStocks,
		replacementTicker,
		manualApprove,
		replaceConditions
	);

	const result = await processor.process(isInitialRequest, selectedReplacements);

	return new Response(JSON.stringify(result), { status: 200 });
}
