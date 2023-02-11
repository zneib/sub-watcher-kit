import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const players: string[] = []
const activePlayers: string[] = [];
// const isInactiveOpen = true;
// const isActiveOpen = true;
// const playTimeLimit = '05:00';
// const maxActivePlayers = 7;

// const globalStore = writable({players, activePlayers, isInactiveOpen, isActiveOpen, playTimeLimit, maxActivePlayers});
export const playerStore = writable(players);
export const activePlayerStore = writable(activePlayers);
