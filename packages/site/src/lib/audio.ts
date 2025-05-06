import { route_link } from './routing';

let audio: HTMLAudioElement;

function get_audio() {
	if (audio) return audio;
	audio = new Audio(route_link('/success.mp3'));
	return audio;
}

export async function audio_success() {
	const audio = get_audio();
	audio.currentTime = 0;
	await audio.play();
}
