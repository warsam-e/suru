<script>
	import UserChip from "./UserChip.svelte";
</script>

<nav>
	<div class="brand">Suru</div>
	<UserChip />
</nav>

<style lang="scss">
	@use "../../styles/theme.scss";
	nav {
		padding: 0 5rem;
		height: 5rem;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: rgba(theme.$mantle, 0.6);
		backdrop-filter: blur(1rem);
		> .brand {
			font-size: 1.5rem;
			font-weight: 600;
		}
	}
</style>
