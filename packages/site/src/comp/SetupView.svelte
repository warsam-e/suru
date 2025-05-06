<script lang="ts">
	import { suru_auth } from "$lib/api";

	const auth_link = $derived(suru_auth());
</script>

<div class="setup_view">
	<div class="title">Suru</div>
	<div class="subtitle">Suru is a simple and fast to-do list app.</div>
	<a href={auth_link} class="button link">
		<i class="f7-icons">logo_github</i>
		Log In with GitHub</a
	>
</div>

<style lang="scss">
	@use "../styles/theme.scss";
	.setup_view {
		height: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
		> .title {
			font-size: 3rem;
		}
		> .subtitle {
			font-size: 1.2rem;
			opacity: 0.6;
		}
		> .button {
			margin-top: 1.2rem;
			background: #24292e;
			box-shadow: inset 0 0 0 1px rgba(theme.$text, 0.05);
			color: theme.$text;
			> i {
				font-size: 1rem;
			}
		}
	}
</style>
