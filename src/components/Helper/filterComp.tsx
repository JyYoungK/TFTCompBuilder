import { useState } from "react";
import { extraUnitList } from "../../season9/season9Comp";
import { season9ChampionList } from "../../season9/season9Comp";
import ChampionProfileDisplay from "../UnitPanel/ChampionProfileDisplay";
import { getWinRateColor } from "../Helper/HelperFunctions";

export const filterComps = (comps: any[], lowLevel: boolean) =>
  comps
    .filter(
      (comp: any, index: number, self: any[]) =>
        index ===
        self.findIndex(
          (c: any) =>
            (lowLevel ? c.unit_list : c.units_list) ===
            (lowLevel ? comp.unit_list : comp.units_list)
        )
    )
    .filter((comp: any) => comp.count >= 20) // must be played more than 20 times
    .sort((a: any, b: any) => (lowLevel ? b.win - a.win : a.avg - b.avg))
    .slice(0, 10);

const getMismatchCounts = (filteredComps: any, myUnitPool: any) => {
  return filteredComps.map((comp: any) => {
    const unitList = comp.unit_list
      .split("&")
      .map((unit: any) => unit.split("_")[1]);
    console.log(unitList);
    let difference = unitList.filter((x: any) => !myUnitPool.includes(x));
    return difference.length;
  });
};

export const renderFilteredComps = (
  comps: any[],
  lowLevel: boolean,
  compLevel: number,
  myUnitPool: any,
  setCardSelected: React.Dispatch<React.SetStateAction<number>>
) => {
  const mismatchCounts = getMismatchCounts(
    filterComps(comps, lowLevel),
    myUnitPool
  );
  const lowestCountIndex = mismatchCounts.indexOf(Math.min(...mismatchCounts));

  return filterComps(comps, lowLevel).map((comp: any, index: number) => {
    const unitList = lowLevel
      ? comp.unit_list.split("&")
      : comp.units_list.split("&");

    const championNames = unitList.map((champion: string) => champion.slice(5));

    const filteredChampionNames = championNames.filter(
      (championName: string) =>
        !extraUnitList.includes(championName.toLowerCase())
    );

    filteredChampionNames.sort((a: string, b: string) => {
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
    });

    const isSelected = index === lowestCountIndex;

    return (
      filteredChampionNames.length === compLevel && (
        <div
          key={index}
          className={`grid grid-cols-12 rounded-3xl ${
            isSelected ? "bg-fuchsia-200" : ""
          }`}
          onClick={() => setCardSelected(index)}
        >
          <div
            className={`col-span-2 flex items-center justify-center text-lg font-bold 2xl:text-2xl ${getWinRateColor(
              lowLevel ? comp.win : 1 - comp.avg / 8
            )}`}
          >
            {lowLevel
              ? `${(comp.win * 100).toFixed(2)}%`
              : `${((1 - comp.avg / 8) * 100).toFixed(1)}%`}
          </div>
          <div className="col-span-10 flex flex-row space-x-1">
            {filteredChampionNames.map(
              (championName: string, subIndex: number) => (
                <div className="my-2" key={`${index}-${subIndex}`}>
                  <ChampionProfileDisplay
                    champion={{ name: championName }}
                    count={false}
                    myUnitPool={myUnitPool}
                    setMyUnitPool={null}
                    enemyUnitPool={null}
                    displayType="TeamCompDisplay"
                  />
                </div>
              )
            )}
          </div>
        </div>
      )
    );
  });
};
