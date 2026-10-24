<script lang="ts">
	export let id: string;
	export let checked: boolean | undefined = undefined;
	export let tooltip: string;
	export let disabled: boolean = false;

	$: tooltipId = `${id}-tip`;
</script>

<div class="form-control">
	<label class="option-label" for={id}>
		<span class="label-text">
			<span id={`${id}-label`}><slot name="label"></slot></span>
			<span id={tooltipId} class="option-description">{tooltip}</span>
		</span>
		<input
			{id}
			type="checkbox"
			class="checkbox-primary checkbox"
			{disabled}
			aria-describedby={tooltipId}
			aria-labelledby={`${id}-label`}
			bind:checked
		/>
	</label>
</div>

<style>
	.form-control {
		padding: 12px 0;
		border-top: 1px solid var(--line);
	}
	.option-label {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		cursor: pointer;
		align-items: flex-start;
	}
	.label-text {
		color: var(--ink);
		font-size: 14px;
		font-weight: 600;
		line-height: 1.5;
	}
	.option-description {
		display: block;
		margin-top: 4px;
		color: var(--muted);
		font-size: 12px;
		font-weight: 400;
		line-height: 1.6;
	}
	.checkbox {
		appearance: auto;
		flex-shrink: 0;
		accent-color: var(--yellow);
		width: 18px;
		height: 18px;
		border-radius: 4px;
		margin-top: 2px;
	}
	.checkbox:focus-visible {
		outline: 3px solid var(--focus);
		outline-offset: 3px;
	}
</style>
