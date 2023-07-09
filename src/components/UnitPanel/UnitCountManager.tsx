import { useState } from "react";
import { getMaximumCardCount } from "../Helper/HelperFunctions";
import { season9ChampionList } from "../../season9/season9Comp";

interface UnitCountManagerProps {
  champion: any;
  myUnitPool: any;
  setMyUnitPool: any;
  enemyUnitPool: any;
  setEnemyUnitPool: any;
}

const UnitCountManager: React.FC<UnitCountManagerProps> = ({
  champion,
  myUnitPool,
  setMyUnitPool,
  enemyUnitPool,
  setEnemyUnitPool,
}) => {
  const { name, cost } = champion;
  const maxPoolSize = 10;

  const maximumCount = getMaximumCardCount(cost);
  const myCount = myUnitPool.filter((unit: string) => unit === name).length;
  const enemyCount = enemyUnitPool.filter(
    (unit: string) => unit === name
  ).length;

  const handleMyCountIncrement = () => {
    if (myCount < maximumCount) {
      setMyUnitPool((prevUnitPool: string[]) => [...prevUnitPool, name]);
    }
  };

  const handleMyCountDecrement = () => {
    const indexOfChampion = myUnitPool.lastIndexOf(name);
    if (myCount > 0 && indexOfChampion !== -1) {
      const updatedUnitPool = [...myUnitPool];
      updatedUnitPool.splice(indexOfChampion, 1);
      setMyUnitPool(updatedUnitPool);
    }
  };

  const handleEnemyCountIncrement = () => {
    if (enemyCount < maximumCount) {
      setEnemyUnitPool((prevUnitPool: string[]) => [...prevUnitPool, name]);
    }
  };

  const handleEnemyCountDecrement = () => {
    const indexOfChampion = enemyUnitPool.lastIndexOf(name);
    if (enemyCount > 0 && indexOfChampion !== -1) {
      const updatedUnitPool = [...enemyUnitPool];
      updatedUnitPool.splice(indexOfChampion, 1);
      setEnemyUnitPool(updatedUnitPool);
    }
  };

  return (
    <div className="border-[4px] border-white">
      <div className="3xl:text-md 3xl:h-[64px] 3xl:w-[64px] ml-1 grid h-12 w-12 grid-cols-1 justify-center text-sm font-extrabold">
        <div className="grid grid-cols-3 items-center bg-green-400 text-center">
          <button
            onClick={handleMyCountIncrement}
            disabled={
              myCount >= maximumCount - enemyCount || myCount >= maximumCount
            }
          >
            +
          </button>
          <span className="text-green-600">{myCount}</span>
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
          <button
            onClick={handleEnemyCountDecrement}
            disabled={enemyCount <= 0}
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitCountManager;
