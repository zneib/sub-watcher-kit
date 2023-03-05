export type PlayerType = {
  id: number;
  playerName: string,
  playerNumber: number,
  time?: number,
  points?: number,
  assists?: number,
  fouls?: number
}

export type TeamType = {
  id: number;
  teamName: string,
  players: PlayerType[],
  rosterSize: number,
  sport: string
}

export type GameType = {
  id: number;
  players: PlayerType[],
  date: string
}

export type OptionsType = {
  isInactiveOpen: boolean,
  isActiveOpen: boolean,
  playTimeLimit: string,
  maxActivePlayers: number,
  numOfQuarters: number,
  mode: string,
  playerToEdit: PlayerType,
  showEditDialog: boolean,
  showDeleteDialog: boolean,
  showOptionsDialog: boolean
}