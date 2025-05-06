import { goto } from '$app/navigation';
import { base } from '$app/paths';

const home_path = () => (base.endsWith('/') ? base.slice(0, -1) : base);
export const route_path = (_path: string) => {
	let path = _path.replace(base, '');
	if (path === '/') return home_path();
	if (path.startsWith('/')) path = path.slice(1);
	const home = home_path();
	if (home.endsWith('/')) return `${home}${path}`;
	return `${home_path()}/${path}`;
};

export const back_to_home = async () => await goto(home_path());

export const route_link = (_path: string, query?: Record<string, string>) => {
	const path = route_path(_path);
	const url = new URL(path, window.location.origin);
	url.pathname = path;
	if (query) {
		for (const key in query) {
			url.searchParams.set(key, query[key]);
		}
	}
	return url.toString();
};
