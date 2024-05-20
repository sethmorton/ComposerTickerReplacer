<script>
import { DateInput } from "date-picker-svelte";
  import { Jumper } from 'svelte-loading-spinners';
  import GuidingScreenshot from '$lib/images/guiding_screenshot.png';

  /** @type {Date} */
  let date = new Date();

  /** @type {boolean} */
  let allowK1 = false;

  /** @type {string} */
  let inputtedComposerCode = "";

  /** @type {boolean} */
  let shouldReplaceStocks = false;

  /** @type {string} */
  let replacementTicker = "";

  /** @type {boolean} */
  let isDataLoading = false;

  /** @type {string | null} */
  let error = null;

  /** @type {boolean} */
  let manualApprove = false;

  /** @type {boolean} */
  let replaceConditions = false;

  /** @type {ReplacedTicker[]} */
  let potentialReplacements = [];
  

  /** @type {ReplacedTicker[]} */
  let selectedReplacements = [];

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

/** @type {ComposerData | null} */
let data = null;

  /** @type {boolean} */
  let copied = false;

  /** @type {boolean} */
  let allReplacementsProcessed = false;

  $: {
  /**
   * @param {ReplacedTicker} replacement - The replaced ticker object
   * @returns {boolean} - Indicates if the replacement has been approved or denied
   */
  allReplacementsProcessed = potentialReplacements.every(
    (replacement) => replacement.approved !== undefined
  );
}

async function fetchPotentialReplacements() {
  isDataLoading = true;
  error = null;
  const maxDelay = 15000; // 15 seconds

  try {
    const response = await fetch('/potential-replacements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        allowK1,
        inputtedComposerCode,
        shouldReplaceStocks,
        replacementTicker,
      }),
    });

    if (response.status === 502) {
      // Wait for the specified delay before throwing the error
      await new Promise((resolve) => setTimeout(resolve, maxDelay));
      throw new Error('Bad Gateway');
    }

    if (!response.ok) {
      throw new Error('Error fetching potential replacements');
    }

    const data = await response.json();
    console.log(data);
    isDataLoading = false;
    return data;
  } catch (err) {
    error = err.message;
    console.error(err);
    isDataLoading = false;
    return null;
  }
}

  async function handleSubmit() {
    if (shouldReplaceStocks && replacementTicker === "") {
      error = "Please enter a replacement ticker";
      isDataLoading = false;
      return;
    }
    if (inputtedComposerCode === "") {
      error = "Please enter a composer code";
      isDataLoading = false;
      return;
    }
    if (manualApprove) {
      potentialReplacements = await fetchPotentialReplacements();
      isDataLoading = false;
      data = null;
     
    } else {
      await fetchNewComposerCode();
    }
  }
  function copyToClipboard() {
    const el = document.createElement('textarea');
    if (data === null) return;
    el.value = data.NEW_COMPOSER_CODE;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    copied = true;
  }
  async function fetchNewComposerCode() {
    isDataLoading = true;
    error = null; 
    let replacements = null;
    if (manualApprove == false  && potentialReplacements.length === 0) {
      replacements = await fetchPotentialReplacements();
    }
    else {
      replacements = selectedReplacements;
    }
    console.log(date, allowK1, inputtedComposerCode, shouldReplaceStocks, replacementTicker, data);
    console.log("fetching new composer code")
    try {
      const response = await fetch('/new-composer-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ date, allowK1, inputtedComposerCode, shouldReplaceStocks, replacementTicker, replacements, replaceConditions }),
      });

      if (!response.ok) {
        throw new Error('Error fetching new composer code');
      }
      
      data = await response.json();
      potentialReplacements = [];
      copied = false;
      console.log(data);
    } catch (err) {
      error = err.message;
      console.error(err);
    }

    isDataLoading = false;
  }

  /**
   * @param {boolean} approve
   * @param {ReplacedTicker} replacement
   */
   function handleReplacement(approve, replacement) {
  if (approve) {
    replacement.approved = true;
    replacement.denied = false;
  } else {
    replacement.approved = false;
    replacement.denied = true;
  }

  potentialReplacements = potentialReplacements.map((r) => {
    if (r === replacement) {
      return replacement;
    }
    return r;
  });

  selectedReplacements = selectedReplacements.filter((r) => r !== replacement);
  if (approve) {
    selectedReplacements = [...selectedReplacements, replacement];
  }
}
</script>
<div class="bg-white min-h-screen flex flex-col">
<main class="flex-grow flex flex-col items-center justify-center p-8">
  
  <h1 class="text-4xl font-bold mb-8">Composer Backtest Extender</h1>
  
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-8">
    <div class="mb-6">
      <label for="allowK1" class="flex items-center">
        <input id="allowK1" type="checkbox" bind:checked={allowK1} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
        <span class="ml-2 text-sm font-medium text-gray-900">Allow K1</span>
      </label>
    </div>
    
    <div class="mb-6">
      <label for="replaceStocks" class="flex items-center">
        <input id="replaceStocks" type="checkbox" bind:checked={shouldReplaceStocks} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
        <span class="ml-2 text-sm font-medium text-gray-900">Replace individual stocks</span>
      </label>
    </div>
    
  <div class="mb-6">
    <label for="manualApprove" class="flex items-center">
      <input id="manualApprove" type="checkbox" bind:checked={manualApprove} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
      <span class="ml-2 text-sm font-medium text-gray-900">Manually Approve Replacements</span>
    </label>
  </div>

  <div class="mb-6">
    <label for="manualApprove" class="flex items-center">
      <input id="manualApprove" type="checkbox" bind:checked={replaceConditions} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
      <span class="ml-2 text-sm font-medium text-gray-900">Replace Conditionals</span>
    </label>
  </div>


    
    {#if shouldReplaceStocks}
      <div class="mb-6">
        <label for="replaceTicker" class="block text-sm font-medium text-gray-900 mb-1">Replace with ticker:</label>
        <input id="replaceTicker" type="text" bind:value={replacementTicker} class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Eg. QQQ">
      </div>
    {/if}
    
    <div class="mb-6">
      <label for="date" class="block text-sm font-medium text-gray-900 mb-1">Extend Backtest to:</label>
      <DateInput --date-picker-highlight-border={'blue'} format={'yyyy-MM-dd'} --date-input-width={'100%'} bind:value={date} timePrecision={null} class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
    </div>
  </div>
  
  <div class="w-full max-w-md mb-6">
    <div class="flex items-center mb-4">
      <label for="composerCode" class="block text-sm font-medium text-gray-900 mb-1 mr-4 ">Insert Composer Code:</label>
      <img src={GuidingScreenshot} width="200" height="100" alt="guiding composer code">
    </div>
    <textarea id="composerCode" rows="6" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" bind:value={inputtedComposerCode} placeholder="Insert Clojure style Composer Code here, I.E. (defsymphony ...)"></textarea>
  </div>
  
  <div class="flex items-center gap-4 mb-8">
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      on:click={handleSubmit}
    >
      {#if manualApprove}
        Fetch Potential Replacements
      {:else}
        Fetch New Composer Code
      {/if}
    </button>
  
    {#if isDataLoading}
      <div class="ml-4">
        <Jumper size="40" color="#3B82F6" unit="px" duration="1s" />
      </div>
    {/if}
  
    {#if data !== null}
      <button
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        on:click={copyToClipboard}
      >
        {#if copied}
          Copied!
        {:else}
          Copy New Composer Code
        {/if}
      </button>
    {/if}
  </div>

  {#if potentialReplacements.length > 0}
  <div class="mt-8">
    <h2 class="text-xl font-bold mb-4">Potential Replacements</h2>
    <div class="space-y-6">
      {#each potentialReplacements as replacement, index}
      <div class="bg-gray-100 p-6 rounded-lg">
        <div class="flex justify-between items-center mb-4">
          <div>
            <p class="text-sm font-semibold">Original Ticker:</p>
            <p class="text-lg">{replacement.originalTicker}</p>
          </div>
          <div class="ml-8 flex items-center">
            <p class="text-sm font-semibold">Replacement Ticker:</p>
            {#if replacement.editing}
              <input
                type="text"
                class="text-lg ml-2 border border-gray-300 rounded px-2 py-1"
                bind:value={replacement.replacementTicker}
                on:blur={() => (replacement.editing = false)}
                on:keydown={(e) => {
                  if (e.key === 'Enter') {
                    replacement.editing = false}
                }}
              />
            {:else}
              <p class="text-lg ml-2">{replacement.replacementTicker}</p>
              <button
                class="ml-2 focus:outline-none"
                on:click={() => (replacement.editing = true)}
              >
              <i class="fas fa-pencil-alt"></i>
              </button>
            {/if}
          </div>
        </div>
        {#if replacement.correlation !== undefined}
          <p class="text-gray-600 text-sm mb-4">Correlation (1Y): {replacement.correlation}</p>
        {/if}
          <!-- <p class="text-gray-600 text-sm mb-4">Correlation (1Y): {replacement.correlation}</p> -->
          <button
          class="mt-2 py-2 px-4 rounded font-semibold text-white"
          class:bg-blue-500={!replacement.approved}
          class:hover:bg-blue-600={!replacement.approved}
          class:bg-green-500={replacement.approved}
          class:hover:bg-green-600={replacement.approved}
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
          class="mt-2 py-2 px-4 rounded font-semibold text-white"
          class:bg-gray-500={!replacement.denied}
          class:hover:bg-gray-600={!replacement.denied}
          class:bg-red-500={replacement.denied}
          class:hover:bg-red-600={replacement.denied}
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
      {/each}
    </div>
    {#if data === null}
    <button
    class="py-2 my-4 px-4 rounded font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
    class:bg-blue-500={allReplacementsProcessed}
    class:hover:bg-blue-600={allReplacementsProcessed}
    class:focus:ring-blue-500={allReplacementsProcessed}
    class:bg-gray-400={!allReplacementsProcessed}
    class:cursor-not-allowed={!allReplacementsProcessed}
    on:click={fetchNewComposerCode}
    disabled={!allReplacementsProcessed || isDataLoading}
  >
    Submit
  </button>
    {/if}
    {#if data !== null}
      <button
        class="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
        on:click={copyToClipboard}
      >
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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <!-- Column 1 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">
          Individual Stocks
          {#if shouldReplaceStocks}
            <span class="text-sm text-gray-500">Replaced with {replacementTicker}</span>
          {/if}
        </h2>
        <div class="space-y-4">
          {#each data.REPLACED_TICKERS as ticker}
          {#if ticker.correlation === undefined}
            <div class="bg-gray-100 p-4 rounded-lg">
              <p class="text-md font-semibold">{ticker.originalTicker}</p>
            </div>
          {/if}
          {/each}
        </div>
      </div>

      <!-- Column 2 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Replaced Ticker and Correlation</h2>
        <div class="space-y-4">
          {#each data.REPLACED_TICKERS as ticker}
          {#if ticker.correlation !== undefined}
            <div class="bg-gray-100 p-4 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <p class="text-md font-semibold">Original Ticker: {ticker.originalTicker}</p>
                <p class="text-md font-semibold">Replaced Ticker: {ticker.replacementTicker}</p>
              </div>
              <p class="text-gray-600">Correlation (1Y): {ticker.correlation}</p>
            </div>
          {/if}
          {#if ticker.correlation === undefined && ticker.replacementTicker !== replacementTicker}
          <div class="bg-gray-100 p-4 rounded-lg">
            <div class="flex justify-between items-center mb-2">
              <p class="text-md font-semibold">Original Ticker: {ticker.originalTicker}</p>
              <p class="text-md font-semibold">Replaced Ticker: {ticker.replacementTicker}</p>
            </div>
            <p class="text-gray-600">Correlation (1Y): {ticker.correlation}</p>
          </div>
        {/if}
          {/each}
        </div>
      </div>
    </div>
  {/if}

  {#if error}
    <div class="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <p>{error}</p>
    </div>
  {/if}
  
</main>
<footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800">
  <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
      Seth M.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
      <li>
        <a href="https://github.com/sethmorton" target="_blank" rel="noopener noreferrer" class="hover:underline me-4 md:me-6">
          <i class="fab fa-github"></i> GitHub
        </a>
      </li>
      <li>
        <a href="mailto:sethmorton05@gmail.com" class="hover:underline me-4 md:me-6">
          <i class="far fa-envelope"></i> Email
        </a>
      </li>
      <li>
        <span class="hover:underline me-4 md:me-6">
          <i class="fab fa-discord"></i> sethmorton
        </span>
      </li>
    </ul>
  </div>
</footer>
</div>


<style>
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>