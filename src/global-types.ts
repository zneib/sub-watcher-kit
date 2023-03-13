export type PlayerType = {
  id: number;
  playerName: string,
  playerNumber: number,
  points?: number | undefined,
  assists?: number | undefined,
  fouls?: number | undefined
}

export type TeamType = {
  id: number;
  teamName: string,
  players: PlayerType[],
  rosterSize: number,
  sport: string,
  image: string
}

export type GameType = {
  name: string;
  players: PlayerType[],
  date: string
}

export type OptionsType = {
  playTimeLimit: string,
  maxActivePlayers: number,
}

export type AppStateType = {
  isInactiveOpen: boolean,
  isActiveOpen: boolean,
  playerToEdit?: PlayerType | undefined,
  showEditDialog: boolean,
  showDeleteDialog: boolean,
  showOptionsDialog: boolean
}