<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { fade } from "svelte/transition";
	import { overlay_count } from "$lib/stores";

	interface Props {
		title: string;
		icon?: string;
		showing: boolean;
		children?: Snippet;
		heading?: Snippet;
	}

	let {
		title,
		icon,
		showing = $bindable(),
		children,
		heading,
	}: Props = $props();

	let modal: HTMLDivElement | undefined = $state(undefined);
	function onclick(evt: MouseEvent) {
		if (evt.target !== modal) return;
		close_modal();
	}

	const close_modal = () => (showing = false);

	let mounted = false;
	onMount(() => (mounted = true));
	$effect(() => handle_modal(showing));
	let has_shown_once = $state(false);

	function handle_modal(showing: boolean) {
		if (!mounted) return;
		if (showing && !has_shown_once) {
			lockScrolling();
			has_shown_once = true;
		} else if (!showing && has_shown_once) {
			unlockScrolling();
			has_shown_once = false;
		}
	}

	function lockScrolling() {
		$overlay_count = $overlay_count + 1;
		if (document.body.style.position === "fixed") return;
		const scrollY =
			document.documentElement.style.getPropertyValue("--scroll-y");
		document.body.style.position = "fixed";
		document.body.style.width = "100%";
		document.body.style.top = `-${scrollY}`;
	}

	function unlockScrolling() {
		let count = $overlay_count;
		if (count <= 0) return;
		count = Math.max(0, count - 1);
		$overlay_count = count;
		if (count > 0) return;
		if (document.body.style.position !== "fixed") return;

		const scrollY = document.body.style.top;
		document.body.style.position = "";
		document.body.style.width = "";
		document.body.style.top = "";
		window.scrollTo(0, Number.parseInt(scrollY || "0") * -1);
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if showing}
	<div
		class="modal"
		in:fade={{ duration: 200 }}
		out:fade={{ duration: 200 }}
		{onclick}
		bind:this={modal}
	>
		<div class="view">
			<div class="heading">
				<div class="main">
					<div class="title">
						{#if icon}
							<picture>
								<source srcset={icon} />
								<img alt="" />
							</picture>
						{/if}
						<div class="name">{title}</div>
					</div>
					<i class="f7-icons link" onclick={close_modal}>xmark</i>
				</div>
				{@render heading?.()}
			</div>
			<div class="content">{@render children?.()}</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@use "../styles/theme.scss";
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		z-index: 10;

		display: flex;
		align-items: center;
		justify-content: center;
		> .view {
			background: theme.$mantle;
			border: 1px solid rgba(theme.$text, 0.05);
			border-radius: 1rem;
			max-height: calc(100vh - 30rem);

			overflow: hidden;
			overflow-y: scroll;
			> .heading {
				position: sticky;
				top: 0;
				left: 0;
				right: 0;
				z-index: 1;
				background: theme.$mantle;

				padding: 1.5rem 1.5rem 1rem;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 1rem;
				> .main {
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: space-between;
					gap: 1rem;
					> .title {
						display: flex;
						align-items: center;
						gap: 0.5rem;
						> picture {
							width: 2rem;
							overflow: hidden;
							> img {
								width: 100%;
								height: 100%;
								object-fit: contain;
							}
						}
						> .name {
							font-weight: 600;
							opacity: 0.8;
						}
					}
					> i {
						font-size: 1.2rem;
						color: theme.$red;
					}
				}
			}
			> .content {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>
