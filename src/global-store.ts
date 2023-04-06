import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { OptionsType, PlayerType } from './global-types';

const players: PlayerType[] = browser && JSON.parse(localStorage.getItem('players') || '[]');
const activePlayers: PlayerType[] = browser && JSON.parse(localStorage.getItem('activePlayers') || '[]');
const savedOptions: OptionsType = browser && JSON.parse(localStorage.getItem('options') || '[]');
const teamInfo = {
  id: 0,
  teamName: browser && localStorage.getItem('team') || '',
  teamPicture: '',
  players,
  rosterSize: 7,
  sport: '',
  image: ''
}
const options = {
  playTimeLimit: savedOptions.playTimeLimit ?? '05:00',
  maxActivePlayers: savedOptions.maxActivePlayers ?? 5,
}
const appState = {
  isInactiveOpen: true,
  isActiveOpen: true,
  playerToEdit: undefined,
  showEditDialog: false,
  showDeleteDialog: false,
  showOptionsDialog: false
}

export const playerStore = writable(players);
export const activePlayerStore = writable(activePlayers);
export const optionsStore = writable(options);
export const teamStore = writable(teamInfo);
export const appStateStore = writable(appState);
