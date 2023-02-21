export type PlayerType = {
  playerName: string,
  playerNumber: number
}

export type TeamType = {
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
  showEditDialog: boolean
}