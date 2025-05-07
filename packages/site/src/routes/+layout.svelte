<script lang="ts">
	import { page } from "$app/state";
	import { Nav } from "$comp/nav";
	import SetupView from "$comp/SetupView.svelte";
	import { loggedIn, token } from "$lib/stores";
	import { suru_init_account } from "$lib/suru";
	import "$styles/global.scss";
	import "framework7-icons/css/framework7-icons.css";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	const { children } = $props();

	let mounted = $state(false);
	onMount(() => (mounted = true));

	$effect(() => {
		if (!mounted) return;
		suru_init_account($token);
	});

	let loaded = $derived($token ? $loggedIn : true);

	let showing = $derived($loggedIn || page.url.pathname.endsWith("/auth"));
</script>

{#if mounted}
	{#if loaded}
		<main in:fade={{ duration: 200 }}>
			{#if showing}
				<Nav />
				<div class="content">{@render children?.()}</div>
			{:else}
				<SetupView />
			{/if}
		</main>
	{/if}
{/if}

<style lang="scss">
	main {
		height: 100dvh;
		position: relative;
		> .content {
			padding: 6rem 5rem 0;
			height: 100%;
		}
	}

	@media only screen and (max-width: 820px) {
		main {
			> .content {
				padding: 6rem 2rem 0;
			}
		}
	}
</style>
