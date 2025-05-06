import { get_env, try_prom } from '@suru/utils';
import Elysia, { type CookieOptions, error, t } from 'elysia';
import { oauth2 } from 'elysia-oauth2';
import { suru_auth_jwt, suru_auth_member } from '../auth';

const cookie_opts: CookieOptions & { sign: ['redirect_to'] } = {
	secrets: get_env('COOKIE_SECRET', 'string'),
	domain: get_env('COOKIE_DOMAIN', 'string'),
	sign: ['redirect_to'],
};

const schema_auth_cookie = t.Cookie({
	redirect_to: t.Optional(t.String()),
});

export default new Elysia({ prefix: '/auth', tags: ['Auth'], cookie: cookie_opts })
	.use(
		oauth2({
			GitHub: [
				get_env('GITHUB_CLIENT_ID', 'string'),
				get_env('GITHUB_CLIENT_SECRET', 'string'),
				get_env('GITHUB_REDIRECT_URI', 'string'),
			],
		}),
	)
	.get(
		'/login',
		async ({ query, oauth2, cookie, redirect }) => {
			const redirect_to = query.redirect_to;
			if (!redirect_to) return error(400, { error: 'Redirect URL is required' });
			cookie.redirect_to.set({ value: redirect_to });
			return redirect(oauth2.createURL('GitHub', []).toString(), 302);
		},
		{
			detail: { summary: 'Login to Suru with GitHub' },
			query: t.Object({ redirect_to: t.String() }),
			cookie: schema_auth_cookie,
		},
	)
	.get(
		'/callback',
		async ({ cookie, oauth2, redirect }) => {
			const _token = await oauth2.authorize('GitHub');
			const member = await try_prom(suru_auth_member(_token));
			if (!member) throw error(401, { error: 'Unauthorized' });
			const token = await suru_auth_jwt(_token);
			if (!token) throw error(401, { error: 'Unauthorized' });
			const redirect_to = cookie.redirect_to.value;
			if (!redirect_to) return error(400, { error: 'Redirect URL is required' });
			cookie.redirect_to.remove();
			const url = new URL(redirect_to);
			url.searchParams.set('token', token);
			return redirect(url.toString(), 302);
		},
		{
			detail: { summary: 'Callback from GitHub OAuth' },
			cookie: schema_auth_cookie,
		},
	);
