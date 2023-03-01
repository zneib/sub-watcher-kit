export type PlayerType = {
  id: number;
  playerName: string,
  playerNumber: number,
  points?: number,
  assists?: number,
  fouls?: number
}

export type TeamType = {
  id: number;
  teamName: string,
  rosterSize: number,
  sport: string
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