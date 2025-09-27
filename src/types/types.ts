export interface League {
  idLeague: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate?: string | null;
}

export interface Season {
  strSeason: string;
  strBadge?: string | null;
}
