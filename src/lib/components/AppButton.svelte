<script lang="ts">
  type ButtonVariant =
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'ghost'
    | 'link'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';

  type ButtonSize = 'sm' | 'md' | 'lg';

  export let variant: ButtonVariant = 'primary';
  export let size: ButtonSize = 'md';
  export let disabled: boolean = false;
  export let fullWidth: boolean = false;
  export let type: 'button' | 'submit' = 'button';
  export let className: string = '';

  // class builders
  $: variantClass =
    variant === 'primary' ? 'btn-primary' :
    variant === 'secondary' ? 'btn-secondary' :
    variant === 'accent' ? 'btn-accent' :
    variant === 'neutral' ? 'btn-neutral' :
    variant === 'ghost' ? 'btn-ghost' :
    variant === 'link' ? 'btn-link' :
    variant === 'info' ? 'btn-info' :
    variant === 'success' ? 'btn-success' :
    variant === 'warning' ? 'btn-warning' :
    'btn-error';

  $: sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : 'btn-md';
  $: widthClass = fullWidth ? 'w-full' : '';
  $: stateClasses = disabled ? 'btn-disabled' : '';
  $: focusClasses = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
</script>

<button
  class={`btn ${variantClass} ${sizeClass} ${widthClass} ${stateClasses} ${focusClasses} ${className}`}
  {type}
  disabled={disabled}
>
  <slot name="icon"></slot>
  <slot></slot>
 </button>


