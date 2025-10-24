<script lang="ts">
import { Jumper } from 'svelte-loading-spinners';
import { onMount } from 'svelte';
import type { ReplacedTicker, ComposerData } from '$lib/types';
import { logger } from '$lib/logger';
import { tweened } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';
import TooltipLabel from '$lib/components/TooltipLabel.svelte';
import AppButton from '$lib/components/AppButton.svelte';

let progress = tweened(0, {
  duration: 1000,
  easing: cubicOut
});

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
  progress.set(0);

  const startTime = Date.now();
  let progressValue = 0;

  const progressInterval = setInterval(() => {
    if (progressValue < 60) {
      progressValue = Math.min((Date.now() - startTime) / 100, 70);
    } else {
      progressValue = Math.min(progressValue + 0.2, 99);
    }
    progress.set(progressValue);
  }, 100);

  try {
    console.log('Sending request with:', { manualApprove, isInitialRequest });
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
      throw new Error('Error processing composer code');
    }
    const result = await response.json();
    console.log('Received result:', result);

    if (isInitialRequest && manualApprove) {
      potentialReplacements = result.potentialReplacements || [];
      console.log('Set potential replacements:', potentialReplacements);
      data = null;
    } else {
      data = result;
      potentialReplacements = [];
      copied = false;
    }

    if (potentialReplacements.length === 0 && data === null) {
      error = 'No replacements found for the given tickers.';
    }

    logger.info(isInitialRequest ? 'Potential replacements fetched successfully' : 'New composer code fetched successfully');
  } catch (err) {
    error = err instanceof Error ? err.message : 'An unknown error occurred';
    logger.error('Error processing composer code', { error });
  } finally {
    clearInterval(progressInterval);
    progress.set(100); // Set progress to 100% when data is loaded
    setTimeout(() => {
      isDataLoading = false;
      if (data !== null) {
        progress.set(0); // Reset progress when "Copy New Composer Code" is available
      }
    }, 500); // Short delay to show the full progress bar
  }
}

async function handleSubmit(): Promise<void> {
  if (shouldReplaceStocks && replacementTicker === '') {
    error = 'Please enter a replacement ticker';
    logger.warn('Submission attempted without replacement ticker');
    return;
  }
  if (inputtedComposerCode === '') {
    error = 'Please enter a composer code';
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
    .catch((err) => {
      logger.error('Failed to copy composer code', { error: err });
    });
}


function handleReplacement(approve: boolean, replacement: ReplacedTicker): void {
  replacement.approved = approve;
  replacement.denied = !approve;

  potentialReplacements = potentialReplacements.map((r) => (r === replacement ? replacement : r));

  selectedReplacements = selectedReplacements.filter((r) => r.originalTicker !== replacement.originalTicker);
  if (approve) {
    selectedReplacements = [...selectedReplacements, replacement];
  }
  logger.info(`Replacement ${approve ? 'approved' : 'denied'}`, {
    ticker: replacement.originalTicker
  });
}

let videoElement: HTMLIFrameElement;

onMount(() => {
  if (videoElement) {
    videoElement.src = 'https://www.youtube.com/embed/T6iARrOE6x0';
  }
});
</script>

<div class="bg-base-100 flex min-h-screen flex-col">
	<main class="flex flex-grow flex-col items-center justify-center p-8">
		<h1 class="mb-8 text-4xl font-bold">Composer Backtest Extender</h1>

		<div class="card bg-base-100 border border-base-200 mb-8 w-full max-w-md shadow-xl">
			<div class="card-body">
				<TooltipLabel id="allow-k1" bind:checked={allowK1} tooltip="Allow funds issuing K-1 tax forms" className="mb-4">
					<svelte:fragment slot="label">Allow K1</svelte:fragment>
				</TooltipLabel>

				<TooltipLabel id="replace-stocks" bind:checked={shouldReplaceStocks} tooltip="Swap individual stocks to ETFs or alternates" placement="right" className="mb-4">
					<svelte:fragment slot="label">Replace individual stocks</svelte:fragment>
				</TooltipLabel>

				<TooltipLabel id="manual-approve" bind:checked={manualApprove} tooltip="Review and approve each proposed replacement" placement="left" className="mb-4">
					<svelte:fragment slot="label">Manually Approve Replacements</svelte:fragment>
				</TooltipLabel>

				<TooltipLabel id="replace-conditions" bind:checked={replaceConditions} tooltip="Replace conditional logic blocks when needed" placement="bottom" className="mb-4">
					<svelte:fragment slot="label">Replace Conditionals</svelte:fragment>
				</TooltipLabel>

				{#if shouldReplaceStocks}
					<div class="form-control mb-4">
						<label class="label" for="replaceTicker">
							<span class="label-text">Replace with ticker:</span>
						</label>
						<input
							id="replaceTicker"
							type="text"
							bind:value={replacementTicker}
							class="input input-bordered w-full"
							placeholder="Eg. QQQ"
						/>
					</div>
				{/if}

				<div class="form-control mb-4">
					<label class="label" for="date">
						<span class="label-text">Extend Backtest to:</span>
					</label>
					<div class="w-full">
						<input
							type="date"
							id="date"
							bind:value={date}
							class="input input-bordered w-full max-w-xs"
						/>
					</div>
				</div>
			</div>
		</div>

		<div class="mb-6 w-full max-w-md">
			<div class="mb-4">
				<label for="composerCode" class="label-text mr-4 font-semibold">Insert Composer Code:</label>
			</div>
			<div class="mb-4 flex justify-center">
				<div class="relative w-[400px] h-[225px]">
					<iframe
						bind:this={videoElement}
						width="400"
						height="225"
						title="Guiding video for composer code"
						frameborder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowfullscreen
						class="rounded-lg"
					></iframe>
				</div>
			</div>
			<textarea
				id="composerCode"
				rows="6"
				class="textarea textarea-bordered w-full"
				bind:value={inputtedComposerCode}
				placeholder="Insert Clojure style Composer Code here, I.E. (defsymphony ...)"
			></textarea>
		</div>

		<div class="mb-8 flex items-center gap-4">
			<button class="btn btn-primary btn-lg" on:click={() => handleSubmit()}>
				{#if manualApprove}
					Fetch Potential Replacements
				{:else}
					Fetch New Composer Code
				{/if}
			</button>

			{#if isDataLoading || (data === null && $progress > 0)}
				<progress class="progress progress-primary w-64" value={$progress} max="100" aria-label="Loading"></progress>
			{/if}

			{#if data !== null}
				<button class="btn btn-secondary btn-lg" on:click={copyToClipboard}>
					{#if copied}
						Copied!
					{:else}
						Copy New Composer Code
					{/if}
				</button>
			{/if}
		</div>
		{#if potentialReplacements.length > 0}
			<div class="mt-8 w-full max-w-4xl">
				<h2 class="mb-4 text-xl font-bold">Potential Replacements</h2>
				<div class="space-y-6">
					{#each potentialReplacements as replacement}
						<div class="card bg-base-100 border border-base-200 shadow-xl">
							<div class="card-body">
								<div class="mb-4 flex items-center justify-between">
									<div>
										<p class="text-sm font-semibold">Original Ticker:</p>
										<p class="text-lg">{replacement.originalTicker}</p>
									</div>
									<div class="ml-8 flex items-center">
										<p class="text-sm font-semibold">Replacement Ticker:</p>
										{#if replacement.editing}
											<input
												type="text"
												class="input input-bordered input-sm ml-2"
												bind:value={replacement.replacementTicker}
												on:blur={() => (replacement.editing = false)}
												on:keydown={(e) => {
													if (e.key === 'Enter') {
														replacement.editing = false;
													}
												}}
											/>
										{:else}
											<p class="ml-2 text-lg">
												{replacement.replacementTicker}
											</p>
											<button
												class="btn btn-ghost btn-sm ml-2"
												on:click={() => (replacement.editing = true)}
											>
												<i class="fas fa-pencil-alt"></i>
											</button>
										{/if}
									</div>
								</div>
								{#if replacement.correlation !== undefined}
									<p class="mb-4 text-sm">
										Correlation (1Y): {replacement.correlation}
									</p>
								{/if}
								<div class="card-actions justify-end">
									<button
										class="btn btn-sm btn-primary"
										class:btn-primary={!replacement.approved}
										class:btn-success={replacement.approved}
										on:click={() => handleReplacement(true, replacement)}
										disabled={replacement.approved}
									>
										{#if replacement.approved}
											Approved
										{:else}
											Approve
										{/if}
									</button>
									<button
										class="btn btn-sm btn-error"
										class:btn-ghost={!replacement.denied}
										class:btn-error={replacement.denied}
										on:click={() => handleReplacement(false, replacement)}
										disabled={replacement.denied}
									>
										{#if replacement.denied}
											Denied
										{:else}
											Deny
										{/if}
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
				{#if data === null}
					<button class="btn btn-primary btn-lg mt-4"
						on:click={fetchNewComposerCode}
						disabled={!allReplacementsProcessed || isDataLoading}
					>
						Submit
					</button>
				{/if}
				{#if data !== null}
					<button class="btn btn-secondary btn-lg" on:click={copyToClipboard}>
						{#if copied}
							Copied!
						{:else}
							Copy New Composer Code
						{/if}
					</button>
				{/if}
			</div>
		{/if}

		{#if data !== null}
			<div class="mt-8 grid w-full max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
				<!-- Column 1 -->
				<div class="card bg-base-100 border border-base-200 shadow-xl">
					<div class="card-body">
						<h2 class="card-title">
							Individual Stocks
							{#if shouldReplaceStocks}
								<span class="badge badge-primary">Replaced with {replacementTicker}</span>
							{/if}
						</h2>
						<div class="space-y-4">
							{#each data.REPLACED_TICKERS as ticker}
								{#if ticker.correlation === null}
									<div class="card bg-base-100 border border-base-200">
										<div class="card-body p-4">
											<p class="text-md font-semibold">{ticker.originalTicker}</p>
										</div>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				</div>

				<!-- Column 2 -->
				<div class="card bg-base-100 border border-base-200 shadow-xl">
					<div class="card-body">
						<h2 class="card-title">Replaced Ticker and Correlation</h2>
						<div class="space-y-4">
							{#each data.REPLACED_TICKERS as ticker}
							{#if ticker.correlation !== null}
								<div class="card bg-base-100 border border-base-200">
									<div class="card-body p-4">
										<div class="mb-2 flex items-center justify-between">
											<p class="text-md font-semibold">
												Original Ticker: {ticker.originalTicker}
											</p>
											<p class="text-md font-semibold">
												Replaced Ticker: {ticker.replacementTicker}
											</p>
										</div>
										<p>Correlation (1Y): {ticker.correlation}</p>
									</div>
								</div>
								{/if}
							{#if ticker.correlation === undefined && ticker.replacementTicker !== replacementTicker}
								<div class="card bg-base-100 border border-base-200">
									<div class="card-body p-4">
										<div class="mb-2 flex items-center justify-between">
											<p class="text-md font-semibold">
												Original Ticker: {ticker.originalTicker}
											</p>
											<p class="text-md font-semibold">
												Replaced Ticker: {ticker.replacementTicker}
											</p>
										</div>
										<p>Correlation (1Y): {ticker.correlation}</p>
									</div>
								</div>
								{/if}
							{/each}
						</div>
					</div>
				</div>
			</div>
		{/if}

		{#if error}
			<div class="alert alert-error mt-8">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>{error}</span>
			</div>
		{/if}
		<div class="mb-8 mt-12 flex gap-4">
			<a
				href="https://tally.so/r/3NYOLj"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-lg btn-neutral"
			>
				<i class="fas fa-comment-alt mr-2"></i> Give Feedback
			</a>
		</div>
	</main>
	<footer class="footer bg-base-300 text-base-content flex items-center justify-between p-4 px-8">
		<div>
			<p>Seth M.</p>
		</div>
		<div class="flex gap-4">
			<a
				href="https://github.com/sethmorton"
				target="_blank"
				rel="noopener noreferrer"
				class="link link-hover"
			>
				<i class="fab fa-github"></i> GitHub
			</a>
			<a href="mailto:sethmorton05@gmail.com" class="link link-hover">
				<i class="far fa-envelope"></i> Email
			</a>
			<span class="link link-hover">
				<i class="fab fa-discord"></i> sethmorton
			</span>
		</div>
	</footer>
</div>

<style>
	@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
