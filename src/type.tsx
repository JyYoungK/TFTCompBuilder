export interface ChampionDetails {
  name: string;
  item: string[];
}

export interface Season9TeamComp {
  name: string;
  tier: string;
  speed: string;
  position: string;
  win: number;
  loss: number;
  champions: ChampionDetails[];
}
