import { Octokit } from '@octokit/rest';

const octokit = new Octokit();

export const github_user_by_token = (token: string) =>
	octokit.users
		.getAuthenticated({ headers: { authorization: `token ${token}` } })
		.then((r) => (r.status === 200 ? r.data : null));
