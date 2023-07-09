import React from "react";
import ChampionProfileDisplay from "../UnitPanel/ChampionProfileDisplay";
import { season9ChampionList } from "../../season9/season9Comp";

interface MyChampPoolProps {
  myUnitPool: any;
  setMyUnitPool: any;
}

const MyChampPool: React.FC<MyChampPoolProps> = ({
  myUnitPool,
  setMyUnitPool,
}) => {
  const handleRemoveChampion = (championName: string) => {
    setMyUnitPool((prevUnitPool: any) => {
      const indexOfChampion = prevUnitPool.indexOf(championName);
      if (indexOfChampion !== -1) {
        const updatedUnitPool = [...prevUnitPool];
        updatedUnitPool.splice(indexOfChampion, 1);
        return updatedUnitPool;
      }
      return prevUnitPool;
    });
  };
  return (
    <div className="border-2 border-blue-400">
      <div className="my-4 text-xl font-extrabold 2xl:text-3xl">
        Champions In Your Pool
      </div>
      <div className="flex flex-row justify-center space-x-1">
        {[...Array(10)]
          .map((_, index) => {
            const championName = myUnitPool[index] || "";
            return championName;
          })
          .sort((a, b) => {
            const championA = season9ChampionList.find(
              (champion) => champion.name === a
            );
            const championB = season9ChampionList.find(
              (champion) => champion.name === b
            );

            if (championA && championB) {
              return championA.cost - championB.cost;
            }

            return 0;
          })
          .map((championName, index) => (
            <div
              key={index}
              onClick={() => handleRemoveChampion(championName)}
              className="clickable-wrapper"
            >
              <ChampionProfileDisplay
                champion={{ name: championName }}
                count={false}
                buildName={null}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyChampPool;
