<script>
  import { DateInput } from "date-picker-svelte";
  import { Jumper } from 'svelte-loading-spinners';

  let date = new Date();
  let allowK1 = false;
  let inputtedComposerCode = "";
  let shouldReplaceStocks = false;
  let replacementTicker = "";
  $: console.log(inputtedComposerCode);
  let isDataLoading = false;
  let error = null;
  /**
   * @type {{ NEW_COMPOSER_CODE: string; INDIVIDUAL_TICKERS: string[]; REPLACED_TIKCERS : {}[] } | null}
   */
  let data = null;
  let copied = false;
  async function handleSubmit() {
  isDataLoading = true;
  copied = false;
  error = null; // Reset the error state
  if (inputtedComposerCode === "") {
    alert("Please input Composer Code");
    isDataLoading = false;
    return;
  }
  try {
    const response = await fetch('/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date, allowK1, inputtedComposerCode, shouldReplaceStocks, replacementTicker}),
    });
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    data = await response.json();
    console.log(data);
  } catch (err) {
    error = err.message; // Set the error message
    console.error(err);
  }
  isDataLoading = false;
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
    <label for="composerCode" class="block text-sm font-medium text-gray-900 mb-1">Insert Composer Code:</label>
    <textarea id="composerCode" rows="6" class="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500" bind:value={inputtedComposerCode} placeholder="Insert Composer Code here"></textarea>
  </div>
  
  <div class="flex items-center gap-4 mb-8">
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" on:click={handleSubmit} disabled={isDataLoading}>
      Submit
    </button>
    {#if isDataLoading}
      <div class="ml-4">
        <Jumper size="40" color="#3B82F6" unit="px" duration="1s" />
      </div>
    {/if}
    {#if data !== null}
      <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" on:click={copyToClipboard}>
        {#if copied}
          Copied!
        {:else}
          Copy New Composer Code
        {/if}
      </button>
    {/if}
  </div>

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
          {#each data.INDIVIDUAL_TICKERS as ticker}
            <div class="bg-gray-100 p-4 rounded-lg">
              <p class="text-md font-semibold">{ticker}</p>
            </div>
          {/each}
        </div>
      </div>

      <!-- Column 2 -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Replaced Ticker and Correlation</h2>
        <div class="space-y-4">
          {#each data.REPLACED_TICKERS as item}
            <div class="bg-gray-100 p-4 rounded-lg">
              <div class="flex justify-between items-center mb-2">
                <p class="text-md font-semibold">Original Ticker: {item.originalTicker}</p>
                <p class="text-md font-semibold">Replaced Ticker: {item.replacementTicker}</p>
              </div>
              <p class="text-gray-600">Correlation (1Y): {item.correlation}</p>
            </div>
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