import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { PlayerType } from './global-types';

const players: PlayerType[] = browser && JSON.parse(localStorage.getItem('players') || '[]');
const activePlayers: PlayerType[] = browser && JSON.parse(localStorage.getItem('activePlayers') || '[]');
const teamInfo = {
  id: 0,
  teamName: browser && localStorage.getItem('team') || '',
  rosterSize: 7,
  sport: ''
}
const options = {
  isInactiveOpen: true,
  isActiveOpen: true,
  playTimeLimit: '05:00',
  maxActivePlayers: 7,
  numOfQuarters: 4,
  mode: 'action',
  playerToEdit: { id: 0, playerName: '', playerNumber: 0, points: 0},
  showEditDialog: false,
  showDeleteDialog: false,
  showOptionsDialog: false
}

export const playerStore = writable(players);
export const activePlayerStore = writable(activePlayers);
export const optionsStore = writable(options);
export const teamStore = writable(teamInfo);
