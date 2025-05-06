<script lang="ts">
	import { suru_logout } from "$lib/api";
	import { user } from "$lib/stores";

	let name = $derived($user?.name);
	let username = $derived($user?.username);
	let avatar = $derived($user?.avatar);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="user_chip">
	<div class="user">
		<picture>
			<source srcset={avatar} />
			<img alt="" />
		</picture>
		<div class="meta">
			<div class="name">{name ?? username}</div>
			<div class="username">@{username}</div>
		</div>
	</div>
	<i class="f7-icons link hover" onclick={suru_logout}
		>arrow_right_to_line_alt</i
	>
</div>

<style lang="scss">
	@use "../../styles/theme.scss";
	.user_chip {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		> .user {
			gap: 0.8rem;
			display: flex;
			align-items: center;
			> picture {
				width: 2.5rem;
				height: 2.5rem;
				overflow: hidden;
				border-radius: 100%;
				> img {
					width: 100%;
					height: 100%;
					object-fit: contain;
				}
			}
			> .meta {
				> .name {
					font-weight: 600;
				}
				> .username {
					font-size: 0.8rem;
					opacity: 0.6;
				}
			}
		}
		> i {
			font-size: 1.3rem;
			color: theme.$red;
		}
	}
</style>
