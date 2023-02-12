import { writable } from 'svelte/store';

const players: string[] = []
const activePlayers: string[] = [];
const options = {
  isInactiveOpen: true,
  isActiveOpen: true,
  playTimeLimit: '05:00',
  maxActivePlayers: 7
}

export const playerStore = writable(players);
export const activePlayerStore = writable(activePlayers);
export const optionsStore = writable(options);
