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
<main class="bg-white min-h-screen flex flex-col items-center justify-center p-8">
  <h1 class="text-4xl font-bold mb-8">Historical Ticker Replacer</h1>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-8 flex flex-col items-center justify-center">
    <div class="flex items-center mb-4">
      <input id="allowK1" type="checkbox" bind:checked={allowK1} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
      <label for="allowK1" class="ml-2 text-sm font-medium text-gray-900">Allow K1</label>
    </div>
    
    <div class="flex items-center mb-4">
      <input id="replaceStocks" type="checkbox" bind:checked={shouldReplaceStocks} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2">
      <label for="replaceStocks" class="ml-2 text-sm font-medium text-gray-900">Replace individual stocks</label>
    </div>
    
    {#if shouldReplaceStocks}
      <div class="mb-4">
        <label for="replaceTicker" class="text-sm font-medium text-gray-900 mb-2">Replace with ticker:</label>
        <input id="replaceTicker" type="text" bind:value={replacementTicker} class="border border-gray-300 rounded px-2 py-1 text-sm" placeholder="Eg. QQQ">
      </div>
    {/if}
    
    <label for="date" class="text-sm font-medium text-gray-900 mb-2">Backtest to:</label>
    <DateInput bind:value={date}  timePrecision={null}/>
  </div>
  <textarea rows="4" class="w-full max-w-md p-2 border border-gray-300 rounded mb-4" bind:value={inputtedComposerCode} placeholder="Insert Composer Code here "></textarea>
  <div class="flex items-center gap-3">
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={handleSubmit} disabled={isDataLoading}>
      Submit
    </button>
    {#if isDataLoading}
      <div class="ml-4">
        <Jumper size="60" color="#000000" unit="px" duration="1s" />
      </div>
    {/if}
    {#if data !== null}
    <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click={copyToClipboard}>
      {#if copied}
        Copied!
      {:else}
        Copy New Composer Code
      {/if}
    </button>
    {/if}
  </div>

  {#if data !== null}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Column 1 -->
    <div>
      <!-- Card 1: Individual Tickers -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">
          Individual Stocks
          {#if shouldReplaceStocks}
            <span class="text-sm text-gray-500">Replaced with {replacementTicker}</span>
          {/if}
        </h2>
        {#each data.INDIVIDUAL_TICKERS as ticker}
          <div class="bg-white p-4 rounded-lg shadow-md mb-4">
            <p class="text-md font-semibold">{ticker}</p>
          </div>
        {/each}
      </div>
    </div>
    <!-- Column 2 -->
    <div>
      <!-- Card 2: Replaced Ticker and 1Y Correlation -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold mb-4">Replaced Ticker and Correlation</h2>
        {#each data.REPLACED_TICKERS as item}
          <div class="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <div class="flex justify-">
              <p class="text-md font-semibold">Original Ticker: {item.originalTicker}</p>
              <p class="text-md font-semibold">Replaced Ticker: {item.replacementTicker}</p>
            </div>
            <p class="text-gray-600 mt-2">Correlation (1Y): {item.correlation}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
    {/if}

    {#if error}
    <div class="mt-4 text-red-500">
      <p>{error}</p>
    </div>
  {/if}
</main>