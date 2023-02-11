import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const players: string[] = browser && JSON.parse(localStorage.getItem('people') || '[]');
const activePlayers: string[] = browser && JSON.parse(localStorage.getItem('activePlayers') || '[]');
const isInactiveOpen = true;
const isActiveOpen = true;
const playTimeLimit = '05:00';
const maxActivePlayers = 7;

const globalStore = writable({players, activePlayers, isInactiveOpen, isActiveOpen, playTimeLimit, maxActivePlayers});

export default globalStore;