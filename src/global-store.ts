import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { PlayerType } from './global-types';

const players: PlayerType[] = browser && JSON.parse(localStorage.getItem('players') || '[]');
const activePlayers: PlayerType[] = browser && JSON.parse(localStorage.getItem('activePlayers') || '[]');
const options = {
  isInactiveOpen: true,
  isActiveOpen: true,
  playTimeLimit: '05:00',
  maxActivePlayers: 7
}

export const playerStore = writable(players);
export const activePlayerStore = writable(activePlayers);
export const optionsStore = writable(options);
