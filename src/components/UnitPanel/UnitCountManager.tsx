import { useState } from "react";
import { getMaximumCardCount } from "../Helper/HelperFunctions";
import { season9ChampionList } from "../../season9/season9Comp";

interface UnitCountManagerProps {
  champion: any;
  myUnitPool: any;
  setMyUnitPool: any;
}

const UnitCountManager: React.FC<UnitCountManagerProps> = ({
  champion,
  myUnitPool,
  setMyUnitPool,
}) => {
  const { name, cost } = champion;
  const maxPoolSize = 10;
  const [myCount, setMyCount] = useState(champion.myCount);
  const [enemyCount, setEnemyCount] = useState(champion.enemyCount);
  const maximumCount = getMaximumCardCount(cost);

  const handleMyCountIncrement = () => {
    if (myCount < maximumCount && myUnitPool.length <= maxPoolSize) {
      const championToAdd = season9ChampionList.find(
        (champion) => champion.myCount < maximumCount
      );
      if (championToAdd) {
        championToAdd.myCount += 1;
        setMyCount(myCount + 1);
        setMyUnitPool((prevUnitPool: any) => [...prevUnitPool, champion.name]);
      }
    }
  };

  const handleMyCountDecrement = () => {
    if (myCount > 0) {
      const championToRemove = season9ChampionList.find(
        (champion) => champion.myCount > 0
      );
      if (championToRemove) {
        championToRemove.myCount -= 1;
        setMyCount(myCount - 1);
        setMyUnitPool((prevUnitPool: any) => {
          const indexOfChampion = prevUnitPool.indexOf(champion.name);
          if (indexOfChampion !== -1) {
            const updatedUnitPool = [...prevUnitPool];
            updatedUnitPool.splice(indexOfChampion, 1);
            return updatedUnitPool;
          }
          return prevUnitPool;
        });
      }
    }
  };

  const handleEnemyCountIncrement = () => {
    if (enemyCount < maximumCount) {
      champion.enemyCount += 1;
      setEnemyCount(enemyCount + 1);
    }
  };

  const handleEnemyCountDecrement = () => {
    if (enemyCount > 0) {
      champion.enemyCount -= 1;
      setEnemyCount(enemyCount - 1);
    }
  };

  return (
    <div className="2xl:text-md ml-1 grid h-10 w-12 grid-cols-1 justify-center border-[3.5px] border-white text-sm font-extrabold 2xl:h-[69px] 2xl:w-[69px]">
      <div className="grid grid-cols-3 items-center bg-green-400 text-center ">
        <button
          onClick={handleMyCountIncrement}
          disabled={
            myCount >= maximumCount - enemyCount || myCount >= maximumCount
          }
        >
          +
        </button>
        <span className=" text-green-600">{myCount}</span>
        <button onClick={handleMyCountDecrement} disabled={myCount <= 0}>
          -
        </button>
      </div>
      <div className="grid grid-cols-3 items-center bg-red-400 text-center">
        <button
          onClick={handleEnemyCountIncrement}
          disabled={
            enemyCount >= maximumCount - myCount || enemyCount >= maximumCount
          }
        >
          +
        </button>
        <span className="text-red-600">{enemyCount}</span>
        <button onClick={handleEnemyCountDecrement} disabled={enemyCount <= 0}>
          -
        </button>
      </div>
    </div>
  );
};

export default UnitCountManager;
