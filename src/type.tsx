export interface ChampionDetails {
  name: string;
  item: string[];
}

export interface Season9TeamComp {
  name: string;
  tier: string;
  speed: string;
  date: string;
  augments: string[];
  win: number;
  loss: number;
  champions: ChampionDetails[];
}

type SortOrder = { [key: string]: number };

export const sortOrder: SortOrder = {
  "Roll at 6 (Early Game Comp)": 1,
  "Roll at 7 (Mid Game Comp)": 2,
  "Roll at 8 (Late Game Comp)": 3,
};

export interface Item {
  itemName: string;
  count: number;
  place: number;
}

export interface ItemCategory {
  categoryName: string;
  items: Item[];
}

export interface ItemCategoryRow {
  rowName: string;
  categories: ItemCategory[];
}

export type AugmentData = {
  augment: string;
  unit: string;
  places: {
    avg_place: number;
    count: number;
    avg_place_change: number;
    unit_count: number;
  };
};

export type AugmentUnit = {
  augment: string;
  units: string[];
  avgPlace: number;
};
