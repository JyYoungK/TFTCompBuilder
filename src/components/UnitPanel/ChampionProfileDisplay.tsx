import { season9ChampionList } from "../../season9/season9Comp";
import { useState } from "react";
import { getMaximumCardCount } from "../Helper/HelperFunctions";

interface ChampionProfileDisplayProps {
  champion: any;
  buildName: any;
  count: boolean;
  myUnitPool: any;
  enemyUnitPool: any;
}

const ChampionProfileDisplay: React.FC<ChampionProfileDisplayProps> = ({
  champion,
  buildName,
  count,
  myUnitPool,
  enemyUnitPool,
}) => {
  const getBorderColorClass = (championName: string) => {
    if (championName) {
      const championData = season9ChampionList.find(
        (champ) => champ.name.toLowerCase() === championName.toLowerCase()
      );

      if (championData) {
        switch (championData.cost) {
          case 5:
            return "border-yellow-500";
          case 4:
            return "border-purple-500";
          case 3:
            return "border-blue-500";
          case 2:
            return "border-green-500";
          case 1:
            return "border-gray-500";
          default:
            return "";
        }
      }
    }

    // Return a default border color class when championName is null or empty
    return "border-gray-500";
  };

  const { name, cost } = champion;
  const borderColorClass = getBorderColorClass(name);
  const championProfileURL = `https://cdn.metatft.com/file/metatft/champions/tft9_${name.toLowerCase()}.png`;
  const myUnitCount = myUnitPool
    ? myUnitPool.filter((unit: string) => unit === name).length
    : 0;
  const enemyUnitCount = enemyUnitPool
    ? enemyUnitPool.filter((unit: string) => unit === name).length
    : 0;
  const totalCount = myUnitCount + enemyUnitCount;
  let imageBlendModeClass = ""; // Default image blend mode class

  if (enemyUnitCount >= 4 && enemyUnitCount <= 5) {
    imageBlendModeClass = "blend-orange"; // Apply orangish color
  } else if (enemyUnitCount >= 6) {
    imageBlendModeClass = "blend-red"; // Apply red color
  }

  return (
    <div key={name} className="relative">
      <div className="flex flex-row items-center">
        <div
          className={`relative ${imageBlendModeClass} rounded-md border-[5px] ${borderColorClass} `}
        >
          <img
            src={
              champion.name !== ""
                ? championProfileURL
                : "/icons/NoChampion.png"
            }
            alt={name}
            className={`3xl:h-[64px] 3xl:w-[64px] h-12 w-12 `}
          />
          {count && (
            <div className="absolute bottom-0.5 right-0.5 flex items-center justify-center rounded-md bg-black px-1 text-white">
              <span className="3xl:text-md text-xs font-bold">
                {totalCount}/{getMaximumCardCount(cost)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* <div className="absolute bottom-0.5 left-0 right-0 flex items-end justify-center ">
          {buildName &&
            buildName.map((itemName: string, index: number) => (
              <img
                key={index}
                src={`https://cdn.metatft.com/file/metatft/items/${itemName.toLowerCase()}.png`}
                alt={itemName}
                className="h-3 w-3 2xl:h-4 2xl:w-4"
              />
            ))}
        </div> */}
      {/* <div
        className={`flex h-6 items-center justify-center text-center ${textSizeClass}`}
      >
        {name}
      </div> */}
    </div>
  );
};

export default ChampionProfileDisplay;
