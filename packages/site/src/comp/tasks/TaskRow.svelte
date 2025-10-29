<script lang="ts">
	import type { SuruTask } from "@suru/core";
	import { suru_tasks_create } from "$lib/api";
	import { audio_success } from "$lib/audio";
	import {
		_tasks_delete,
		_tasks_toggle,
		_tasks_update,
		suru_init_tasks,
	} from "$lib/suru";

	interface Props {
		task: SuruTask;
	}

	const { task }: Props = $props();

	function init(el: HTMLInputElement) {
		if (!task.id.startsWith("new-")) return;
		el.focus();
	}

	$effect(() => {
		done = task.done;
	});

	$effect(() => {
		value = task.text;
	});

	let done = $state(task.done);
	let value = $state(task.text);

	async function update(text: string, done: boolean) {
		if (!task.id.startsWith("new-"))
			return _tasks_update(task.id, text, done);
		let data = await suru_tasks_create({ text, done });
		await suru_init_tasks(data);
	}

	const toggle = () => {
		done = !done;
		if (done) audio_success();
		if (value !== task.text) return update(value, done);
		_tasks_toggle(task.id, done);
	};

	const remove = (id: string) => _tasks_delete(id);

	function onkeyup(e: KeyboardEvent) {
		if (e.key !== "Enter") return;
		if (!value.length) return remove(task.id);
		update(value, done);
	}

	async function onblur(e: FocusEvent) {
		if (task.id.startsWith("new-") && !value.length) return remove(task.id);

		console.log("onblur", task.id, value, done);
		if (!value.length) return remove(task.id);
		if (value === task.text) return;
		return update(value, done);
	}

	// let showing = $state(false);
	// let show_popup = () => (showing = true);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id={task.id} class="task" class:done>
	<i class="f7-icons link" onpointerdown={toggle}
		>{done ? "circle_fill" : "circle"}</i
	>
	<input type="text" bind:value {onkeyup} {onblur} use:init />
	<!-- <i class="f7-icons link hover" onclick={show_popup}>info_circle</i> -->
</div>

<style lang="scss">
	@use "../../styles/theme.scss";
	.task {
		width: 100%;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(theme.$text, 0.05);
		padding: 0 0 0.5rem;

		&.done {
			opacity: 0.5;
			cursor: not-allowed;
			> input {
				pointer-events: none;
				font-weight: 600;
				text-decoration: line-through;
				color: theme.$mauve;
			}
		}

		> input {
			height: 3rem;
			width: 100%;
			color: theme.$text;
			border: unset;
			box-shadow: unset;
			background: unset;
			border-radius: unset;
		}
		> i {
			font-size: 1.5rem;
			color: theme.$mauve;
		}
	}
</style>
