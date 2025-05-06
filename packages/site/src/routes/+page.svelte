<script lang="ts">
	import { TaskRow } from "$comp/tasks";
	import { has_new_tasks, show_completed, tasks } from "$lib/stores";

	function create_task() {
		if ($has_new_tasks) return;
		let time = new Date().toISOString();
		$tasks = [
			...$tasks,
			{
				id: `new-${Date.now()}`,
				text: "",
				done: false,
				created_at: time,
				updated_at: time,
			},
		];
		has_new_tasks.set(true);
	}

	let toggle_completed = () => show_completed.set(!$show_completed);

	let list = $derived(
		$tasks.filter((t) => {
			if (t.id.startsWith("new-")) return true;
			if (!$show_completed) return !t.done;
			return true;
		}),
	);

	const has_completed = $derived(!!$tasks.filter((t) => t.done).length);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="tasks_page">
	<div class="options">
		<div
			class="option link hover"
			class:selected={$show_completed}
			onclick={toggle_completed}
		>
			<i class="f7-icons"
				>{$show_completed ? "checkmark_alt_circle_fill" : "circle"}</i
			>
			<span>Show Completed</span>
		</div>
	</div>
	<div class="list">
		{#each list as task (task.id)}
			<TaskRow {task} />
		{:else}
			<div class="info">
				{#if has_completed}
					<i class="f7-icons">checkmark_alt_circle</i>
					<span>All tasks completed, great job!</span>
				{:else}
					<i class="f7-icons">info_circle</i>
					<span
						>No tasks, <span class="link" onclick={create_task}>
							create one!
						</span></span
					>
				{/if}
			</div>
		{/each}
	</div>
	<div
		class="button"
		class:link={!$has_new_tasks}
		class:hover={!$has_new_tasks}
		class:disabled={$has_new_tasks}
		onclick={create_task}
	>
		<i class="f7-icons">plus</i>
	</div>
</div>

<style lang="scss">
	@use "../styles/theme.scss";

	.tasks_page {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		> .options {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 1rem;
			> .option {
				display: flex;
				align-items: flex-end;
				gap: 0.8rem;
				cursor: pointer;

				> i {
					font-size: 1.5rem;
				}
				> span {
					font-size: 1.2rem;
				}

				> i,
				span {
					color: theme.$text;
					opacity: 0.6;
				}

				&.selected {
					> i,
					span {
						color: theme.$mauve;
						opacity: unset;
					}
				}
			}
		}
		> .list {
			height: 100%;
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			> .info {
				height: 10rem;
				background: theme.$base;
				box-shadow: inset 0 0 0 1px rgba(theme.$text, 0.05);
				border-radius: calc(10rem / 4.4);
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: center;
				gap: 1rem;
				> i {
					font-size: 2rem;
					opacity: 0.4;
				}
				> span {
					opacity: 0.8;
				}
			}
		}
		> .button {
			&.disabled {
				cursor: not-allowed;
				opacity: 0.5;
			}
			position: absolute;
			right: 3rem;
			bottom: 3rem;
			width: 3rem;
			height: 3rem;
			> i {
				font-size: 1.5rem;
				color: theme.$base;
			}
		}
	}
</style>
