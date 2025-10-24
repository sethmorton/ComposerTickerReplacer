<script lang="ts">
  export let id: string;
  export let checked: boolean | undefined = undefined;
  export let tooltip: string;
  export let placement: 'top' | 'right' | 'bottom' | 'left' = 'top';
  export let className: string = '';
  export let disabled: boolean = false;

  // generate placement class
  $: placementClass = placement === 'top'
    ? 'tooltip-top'
    : placement === 'right'
    ? 'tooltip-right'
    : placement === 'bottom'
    ? 'tooltip-bottom'
    : 'tooltip-left';
  
  // accessible id for tooltip content
  $: tooltipId = `${id}-tip`;
</script>

<div class={`form-control ${className}`}>
  <label class="label cursor-pointer gap-3">
    <span class="label-text">
      <slot name="label"></slot>
    </span>
    <span class={`tooltip ${placementClass}`} data-tip={tooltip}>
      <input
        id={id}
        type="checkbox"
        class="checkbox checkbox-primary"
        disabled={disabled}
        aria-describedby={tooltipId}
        bind:checked={checked}
      />
    </span>
  </label>
  <span id={tooltipId} class="sr-only">{tooltip}</span>
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>


