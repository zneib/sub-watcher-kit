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
  id: number;
  name: string;
  players: PlayerType[],
  date: string
}

export type OptionsType = {
  isInactiveOpen: boolean,
  isActiveOpen: boolean,
  playTimeLimit: string,
  maxActivePlayers: number,
  playerToEdit: PlayerType,
  showEditDialog: boolean,
  showDeleteDialog: boolean,
  showOptionsDialog: boolean
}