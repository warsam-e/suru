import { github_user_by_token, type SuruUser, suru_user } from '@suru/core';
import { get_env, try_prom } from '@suru/utils';
import { error } from 'elysia';
import type { OAuth2Tokens } from 'elysia-oauth2';
import { sign, verify } from 'jsonwebtoken';

export async function suru_auth_member(tokens: OAuth2Tokens): Promise<SuruUser> {
	const token = tokens.accessToken();
	const user_info = await try_prom(github_user_by_token(token));
	if (!user_info) throw error(401, { error: 'Unauthorized' });
	const user = await suru_user(token);
	if (!user) throw error(401, { error: 'Unauthorized' });
	return user;
}

export async function validate_jwt(jwt?: string): Promise<SuruUser> {
	if (!jwt) throw error(401, { error: 'Unauthorized' });
	const secret = get_env('JWT_SECRET', 'string');
	const val = await try_prom(verify(jwt, secret));
	if (!val) throw error(401, { error: 'Unauthorized' });
	if (typeof val === 'string') throw error(401, { error: 'Unauthorized' });
	const { token } = val;
	const user = await try_prom(suru_user(token));
	if (!user) throw error(401, { error: 'Unauthorized' });
	return user;
}

export async function suru_auth_jwt(tokens: OAuth2Tokens) {
	const secret = get_env('JWT_SECRET', 'string');
	return try_prom(
		sign({ token: tokens.accessToken() }, secret, {
			issuer: 'suru-api',
			audience: 'suru-app',
			expiresIn: '1year',
			algorithm: 'HS256',
		}),
	);
}
