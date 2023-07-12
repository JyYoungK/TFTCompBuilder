export const getImageUrl = (itemName: string) => {
  return `https://cdn.metatft.com/file/metatft/items/${itemName.toLowerCase()}.png`;
};

export const getTraitsUrl = (trait: string) => {
  return `https://cdn.metatft.com/file/metatft/traits/${trait
    .toLowerCase()
    .replace(/\s/g, "")}.png`;
};

export const getChampionProfileImageURL = (name: string) => {
  return `https://cdn.metatft.com/file/metatft/champions/tft9_${name.toLowerCase()}.png`;
};

export const getChampionProfileImageEnlargedURL = (name: string) => {
  if (name === "JarvanIV") {
    return `https://www.mobafire.com/images/champion/card/jarvan-iv.jpg`;
  } else {
    return `https://www.mobafire.com/images/champion/card/${name.toLocaleLowerCase()}.jpg`;
  }
};

export const getItemDataURL = (name: string) => {
  return `https://api2.metatft.com/tft-stat-api/unit_detail?unit=TFT9_${name}&queue=1100&patch=current&days=2&rank=CHALLENGER,DIAMOND,GRANDMASTER,MASTER&permit_filter_adjustment=true`;
};

export const getChampionItemDataURL = (itemName: string) => {
  return `https://cdn.metatft.com/file/metatft/champions/${itemName.toLowerCase()}.png`;
};

export const getAugmentsDataUrl = () => {
  return `https://api2.metatft.com/tft-stat-api/augment_units`;
};

export const getTopAugmentsDataURL = () => {
  return `"https://api2.metatft.com/tft-stat-api/augments_full?queue=1100&patch=current&days=2&rank=CHALLENGER,DIAMOND,GRANDMASTER,MASTER&permit_filter_adjustment=true"`;
};

export const getAllItemURL = () => {
  return `"https://api2.metatft.com/tft-comps-api/unit_items"`;
};
