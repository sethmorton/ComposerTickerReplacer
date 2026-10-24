<script lang="ts">
	import type { ReplacedTicker, ComposerData } from '$lib/types';
	import { logger } from '$lib/logger';
	import TooltipLabel from '$lib/components/TooltipLabel.svelte';

	let date: string = new Date().toISOString().split('T')[0];
	let allowK1: boolean = false;
	let inputtedComposerCode: string = '';
	let shouldReplaceStocks: boolean = false;
	let replacementTicker: string = '';
	let isDataLoading: boolean = false;
	let error: string | null = null;
	let manualApprove: boolean = false;
	let replaceConditions: boolean = true;
	let potentialReplacements: ReplacedTicker[] = [];
	let selectedReplacements: ReplacedTicker[] = [];
	let data: ComposerData | null = null;
	let copied: boolean = false;

	$: allReplacementsProcessed = potentialReplacements.every(
		(replacement) => replacement.approved !== undefined
	);

	async function processComposerCode(isInitialRequest: boolean = true): Promise<void> {
		isDataLoading = true;
		error = null;

		try {
			const response = await fetch('/api/process-composer-code', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					date,
					allowK1,
					inputtedComposerCode,
					shouldReplaceStocks,
					replacementTicker,
					replaceConditions,
					manualApprove,
					isInitialRequest,
					selectedReplacements: isInitialRequest ? [] : selectedReplacements
				})
			});
			if (!response.ok) {
				throw new Error('Could not process your code. Check your input and try again.');
			}
			const result = await response.json();

			if (isInitialRequest && manualApprove) {
				potentialReplacements = result.potentialReplacements || [];
				data = null;
			} else {
				data = result;
				potentialReplacements = [];
				copied = false;
			}

			if (potentialReplacements.length === 0 && data === null) {
				error = 'No replacements found for the given tickers.';
			}

			logger.info(
				isInitialRequest
					? 'Potential replacements fetched successfully'
					: 'New composer code fetched successfully'
			);
		} catch (err) {
			error = err instanceof Error ? err.message : 'An unknown error occurred';
			logger.error('Error processing composer code', { error });
		} finally {
			isDataLoading = false;
		}
	}

	async function handleSubmit(): Promise<void> {
		if (shouldReplaceStocks && replacementTicker === '') {
			error = 'Please enter a replacement ticker';
			logger.warn('Submission attempted without replacement ticker');
			return;
		}
		if (inputtedComposerCode.trim() === '') {
			error = 'Paste your Composer code to get started.';
			logger.warn('Submission attempted without composer code');
			return;
		}

		await processComposerCode(true);
	}

	async function fetchNewComposerCode(): Promise<void> {
		await processComposerCode(false);
	}

	function copyToClipboard(): void {
		if (data === null) return;
		navigator.clipboard
			.writeText(data.NEW_COMPOSER_CODE)
			.then(() => {
				copied = true;
				logger.info('New composer code copied to clipboard');
			})
			.catch(() => {
				error = 'Could not copy the code. Select and copy it from the result below.';
			});
	}

	function handleReplacement(approve: boolean, replacement: ReplacedTicker): void {
		replacement.approved = approve;
		replacement.denied = !approve;

		potentialReplacements = potentialReplacements.map((r) => (r === replacement ? replacement : r));

		selectedReplacements = selectedReplacements.filter(
			(r) => r.originalTicker !== replacement.originalTicker
		);
		if (approve) {
			selectedReplacements = [...selectedReplacements, replacement];
		}
		logger.info(`Replacement ${approve ? 'approved' : 'denied'}`, {
			ticker: replacement.originalTicker
		});
	}
</script>

<svelte:head>
	<title>Backtest Extender | Composer tools</title>
	<meta
		name="description"
		content="Find historical ticker alternatives and extend your Composer strategy's backtest. Review replacements and copy the updated code."
	/>
</svelte:head>

<div class="app-shell">
	<header class="site-header">
		<a class="brand" href="/" aria-label="Backtest Extender home">
			<span class="brand-mark" aria-hidden="true">↤</span>
			Backtest Extender
		</a>
		<a href="https://www.sethmorton.com" target="_blank" rel="noreferrer">Built by Seth Morton ↗</a
		>
	</header>

	<main>
		<header class="intro">
			<p class="eyebrow">For Composer strategies</p>
			<h1>Give your backtest<br class="desktop-break" /> a longer history.</h1>
			<p>
				Find historically correlated alternatives to newer tickers.<br class="desktop-break" /> Paste
				your strategy, choose a date, and review the replacements.
			</p>
		</header>

		<form class="workspace" on:submit|preventDefault={handleSubmit} aria-busy={isDataLoading}>
			<aside class="settings panel">
				<div class="panel-heading">
					<h2>Backtest settings</h2>
					<span class="small-label">Your preferences</span>
				</div>
				<label class="field-label" for="date">Extend backtest to</label>
				<input type="date" id="date" bind:value={date} required disabled={isDataLoading} />
				<p class="field-hint">Look for funds with history reaching this date.</p>
				<div class="options">
					<TooltipLabel
						id="allow-k1"
						bind:checked={allowK1}
						tooltip="Include funds that issue K-1 tax forms."
						disabled={isDataLoading}
					>
						<svelte:fragment slot="label">Allow K-1 funds</svelte:fragment>
					</TooltipLabel>
					<TooltipLabel
						id="replace-stocks"
						bind:checked={shouldReplaceStocks}
						tooltip="Swap individual stocks for a ticker you choose."
						disabled={isDataLoading}
					>
						<svelte:fragment slot="label">Replace individual stocks</svelte:fragment>
					</TooltipLabel>
					{#if shouldReplaceStocks}
						<div class="ticker-field">
							<label class="field-label" for="replaceTicker">Replacement ticker</label>
							<input
								id="replaceTicker"
								type="text"
								bind:value={replacementTicker}
								placeholder="e.g. QQQ"
								disabled={isDataLoading}
							/>
						</div>
					{/if}
					<TooltipLabel
						id="manual-approve"
						bind:checked={manualApprove}
						tooltip="Review each suggestion before generating code."
						disabled={isDataLoading}
					>
						<svelte:fragment slot="label">Approve replacements manually</svelte:fragment>
					</TooltipLabel>
					<TooltipLabel
						id="replace-conditions"
						bind:checked={replaceConditions}
						tooltip="Also replace tickers inside conditional logic."
						disabled={isDataLoading}
					>
						<svelte:fragment slot="label">Replace in conditionals</svelte:fragment>
					</TooltipLabel>
				</div>
			</aside>

			<section class="editor panel" aria-labelledby="code-heading">
				<div class="panel-heading">
					<h2 id="code-heading"><label for="composerCode">Your Composer code</label></h2>
					<span class="code-tag">Clojure</span>
				</div>
				<p class="editor-hint">Paste the code from your Composer strategy below.</p>
				<textarea
					id="composerCode"
					rows="12"
					bind:value={inputtedComposerCode}
					spellcheck="false"
					autocapitalize="off"
					autocomplete="off"
					placeholder={'(defsymphony "Your strategy"\n  ...\n)'}
					disabled={isDataLoading}
				></textarea>
				<div class="editor-actions">
					<span class="field-hint">Your original strategy stays unchanged.</span>
					<button class="primary" type="submit" disabled={isDataLoading}>
						{#if isDataLoading}<span class="spinner" aria-hidden="true"></span>Finding replacements…
						{:else if manualApprove}Review replacements <span aria-hidden="true">→</span>
						{:else}Extend backtest <span aria-hidden="true">→</span>{/if}
					</button>
				</div>
			</section>
		</form>

		{#if isDataLoading}
			<p class="loading-status" role="status">Checking ticker history. This can take a moment.</p>
		{/if}
		{#if error}
			<div class="error-message" role="alert">
				<strong>Action needed</strong>
				<p>{error}</p>
			</div>
		{/if}

		{#if potentialReplacements.length > 0}
			<section class="result panel" aria-labelledby="review-heading">
				<div class="panel-heading">
					<h2 id="review-heading">Review replacements</h2>
					<span class="small-label"
						>{potentialReplacements.filter((r) => r.approved !== undefined).length} of {potentialReplacements.length}
						reviewed</span
					>
				</div>
				<div class="table-scroll">
					<table>
						<thead
							><tr
								><th>Original</th><th>Replacement</th><th>Correlation (1Y)</th><th>Decision</th></tr
							></thead
						>
						<tbody>
							{#each potentialReplacements as replacement}
								<tr>
									<td class="ticker">{replacement.originalTicker}</td>
									<td>
										{#if replacement.editing}
											<input
												class="ticker-edit"
												aria-label={`Replacement for ${replacement.originalTicker}`}
												bind:value={replacement.replacementTicker}
												on:blur={() => (replacement.editing = false)}
												on:keydown={(e) => {
													if (e.key === 'Enter') replacement.editing = false;
												}}
											/>
										{:else}
											<button
												class="edit-button"
												on:click={() => (replacement.editing = true)}
												disabled={isDataLoading}
												>{replacement.replacementTicker}
												<span class="small-label">Edit</span></button
											>
										{/if}
									</td>
									<td>{replacement.correlation ?? 'Unavailable'}</td>
									<td class="decision">
										<button
											class:chosen={replacement.approved}
											on:click={() => handleReplacement(true, replacement)}
											disabled={isDataLoading}
											aria-pressed={replacement.approved === true}>Approve</button
										>
										<button
											class:chosen={replacement.denied}
											on:click={() => handleReplacement(false, replacement)}
											disabled={isDataLoading}
											aria-pressed={replacement.denied === true}>Skip</button
										>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<div class="result-actions">
					<p class="field-hint">Approve or skip each replacement to continue.</p>
					<button
						on:click={fetchNewComposerCode}
						disabled={!allReplacementsProcessed || isDataLoading}>Generate updated code →</button
					>
				</div>
			</section>
		{/if}

		{#if data !== null}
			<section class="result panel" aria-labelledby="result-heading">
				<div class="panel-heading">
					<div>
						<p class="eyebrow">Ready to review</p>
						<h2 id="result-heading">Your updated strategy</h2>
					</div>
					<button on:click={copyToClipboard}>{copied ? 'Copied!' : 'Copy updated code'}</button>
				</div>
				{#if data.REPLACED_TICKERS.length > 0}
					<div class="table-scroll">
						<table>
							<thead><tr><th>Original</th><th>Replacement</th><th>Correlation (1Y)</th></tr></thead>
							<tbody>
								{#each data.REPLACED_TICKERS as ticker}
									<tr
										><td class="ticker">{ticker.originalTicker}</td><td class="ticker"
											>{ticker.replacementTicker}</td
										><td>{ticker.correlation ?? 'Unavailable'}</td></tr
									>
								{/each}
							</tbody>
						</table>
					</div>
				{:else}
					<p class="empty-result">
						No ticker replacements were returned. Review the code before using it.
					</p>
				{/if}
				<label class="field-label" for="updatedCode">Updated Composer code</label>
				<textarea
					id="updatedCode"
					class="output-code"
					rows="7"
					readonly
					value={data.NEW_COMPOSER_CODE}
					spellcheck="false"
				></textarea>
				<p class="field-hint">
					Historical correlation does not guarantee future performance. Review all changes in
					Composer.
				</p>
			</section>
		{/if}

		<details class="guide">
			<summary>New here? Watch the walkthrough <span aria-hidden="true">↗</span></summary>
			<div class="video-wrap">
				<iframe
					src="https://www.youtube.com/embed/T6iARrOE6x0"
					title="Backtest Extender walkthrough"
					loading="lazy"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowfullscreen
				></iframe>
			</div>
		</details>
		<footer>
			<p>Made for the Composer community.</p>
			<nav aria-label="Footer">
				<a href="https://tally.so/r/3NYOLj" target="_blank" rel="noreferrer">Give feedback ↗</a>
				<a
					href="https://github.com/sethmorton/ComposerTickerReplacer"
					target="_blank"
					rel="noreferrer">GitHub ↗</a
				>
				<a href="mailto:sethmorton05@gmail.com">Email</a>
			</nav>
		</footer>
	</main>
</div>
