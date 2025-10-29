<script lang="ts">
	import type { SuruTask } from "@suru/core";
	import PopupView from "$comp/PopupView.svelte";

	interface Props {
		showing: boolean;
		task: SuruTask;
	}

	let { showing = $bindable(), task }: Props = $props();
</script>

<PopupView title="Manage Task" bind:showing>
	<div class="task_popup"></div>
</PopupView>

<style lang="scss">
	.task_popup {
		display: flex;
	}
</style>
