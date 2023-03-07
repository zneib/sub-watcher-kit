import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { OptionsType, PlayerType } from './global-types';

const players: PlayerType[] = browser && JSON.parse(localStorage.getItem('players') || '[]');
const activePlayers: PlayerType[] = browser && JSON.parse(localStorage.getItem('activePlayers') || '[]');
const savedOptions: OptionsType = browser && JSON.parse(localStorage.getItem('options') || '[]');
const teamInfo = {
  id: 0,
  teamName: browser && localStorage.getItem('team') || '',
  players,
  rosterSize: 7,
  sport: '',
  image: ''
}
const options = {
  isInactiveOpen: true,
  isActiveOpen: true,
  playTimeLimit: savedOptions.playTimeLimit ?? '05:00',
  maxActivePlayers: savedOptions.maxActivePlayers ?? 5,
  playerToEdit: { 
    id: 0, 
    playerName: '', 
    playerNumber: 0,
    points: 0,
    assists: 0,
    fouls: 0
  },
  showEditDialog: false,
  showDeleteDialog: false,
  showOptionsDialog: false
}
// const appState = {
//   isInactiveOpen: true,
//   isActiveOpen: true,
//   playerToEdit: { 
//     id: 0, 
//     playerName: '', 
//     playerNumber: 0,
//     points: 0,
//     assists: 0,
//     fouls: 0
//   },
//   showEditDialog: false,
//   showDeleteDialog: false,
//   showOptionsDialog: false
// }

export const playerStore = writable(players);
export const activePlayerStore = writable(activePlayers);
export const optionsStore = writable(options);
export const teamStore = writable(teamInfo);
