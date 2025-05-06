<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { route_link } from "$lib/routing";
	import { token } from "$lib/stores";
	import { onMount } from "svelte";

	onMount(() => {
		let res = page.url.searchParams.get("token");
		if (res) token.set(res);
		return goto(route_link("/"));
	});
</script>
