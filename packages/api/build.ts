import { $ } from 'bun';

try {
	await $`bun build --compile ./lib/index.ts --sourcemap --outfile ../../dist/server`;
} catch (e) {
	const err = e as $.ShellError;
	if ('stderr' in err) console.error(err.stderr.toString());
	process.exit(1);
}
