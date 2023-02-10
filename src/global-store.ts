import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const people: string[] = browser && JSON.parse(localStorage.getItem('people') || '[]');
const activePlayers: string[] = browser && JSON.parse(localStorage.getItem('activePlayers') || '[]');
const isInactiveOpen = true;
const isActiveOpen = true;
const timeLimit = '05:00';
const activePlayerLimit = 7;

const globalStore = writable({players: people, activePlayers: activePlayers, isInactiveOpen, isActiveOpen, timeLimit, activePlayerLimit});

export default globalStore;