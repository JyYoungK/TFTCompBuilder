import { season9ChampionList } from "../../season9/season9Comp";
import { useState } from "react";
import { getMaximumCardCount } from "../Helper/HelperFunctions";

interface ChampionProfileDisplayProps {
  champion: any;
  buildName: any;
  count: boolean;
}

const ChampionProfileDisplay: React.FC<ChampionProfileDisplayProps> = ({
  champion,
  buildName,
  count,
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
  const [myCount, setMyCount] = useState(champion.myCount);
  const [enemyCount, setEnemyCount] = useState(champion.enemyCount);
  const totalCount = myCount + enemyCount;
  const borderColorClass = getBorderColorClass(name);
  const championProfileURL = `https://cdn.metatft.com/file/metatft/champions/tft9_${name.toLowerCase()}.png`;
  return (
    <div key={name} className="relative">
      <div className="flex flex-row items-center">
        <div className="relative">
          <img
            src={
              champion.name !== ""
                ? championProfileURL
                : "/icons/NoChampion.png"
            }
            alt={name}
            className={`h-10 w-10 rounded-md border-[3.5px] 2xl:h-[69px] 2xl:w-[69px] ${borderColorClass}`}
          />
          {count && (
            <div className="absolute bottom-0.5 right-0.5 flex items-center justify-center rounded-md bg-black px-1 text-white">
              <span className="2xl:text-md text-xs font-bold">
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
