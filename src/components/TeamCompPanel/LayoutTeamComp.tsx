import { useState, useEffect } from "react";
import { EarlyOptions, EarlyTeamComp } from "../../type";
import MyChampPool from "./MyChampPool";
import TeamCompDisplay from "./TeamCompDisplay";
import { extraUnitList } from "../../season9/season9Comp";

interface LayoutTeamCompProps {
  myUnitPool: any;
  setMyUnitPool: any;
  enemyUnitPool: any;
  earlyTeamCompOptions: EarlyOptions;
  lateTeamCompOptions: EarlyOptions;
}

const LayoutTeamComp: React.FC<LayoutTeamCompProps> = ({
  myUnitPool,
  setMyUnitPool,
  enemyUnitPool,
  earlyTeamCompOptions,
  lateTeamCompOptions,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<number>(5);
  const [selectedFilteredEarlyComps, setSelectedFilteredEarlyComps] = useState<
    EarlyTeamComp[]
  >([]);
  const [selectedFilteredLateComps, setSelectedFilteredLateComps] = useState<
    EarlyTeamComp[]
  >([]);
  const [nonFilteredEarlyComps, setNonFilteredEarlyComps] = useState<
    EarlyTeamComp[]
  >([]);
  const [nonFilteredLateComps, setNonFilteredLateComps] = useState<
    EarlyTeamComp[]
  >([]);

  const filteredEnemyUnitPool = enemyUnitPool.reduce((acc: any, unit: any) => {
    const champCount = enemyUnitPool.filter((x: any) => x === unit).length;
    if (champCount >= 1 && !acc.includes(unit)) {
      acc.push(unit);
    }
    return acc;
  }, []);

  const [myCompWinRate, setMyCompWinRate] = useState<any>();

  useEffect(() => {
    handleUnitSuggestion();

    const winRate =
      selectedLevel <= 7
        ? matchedEarlyOptions[0]?.win
        : matchedLateOptions[0]?.win;

    setMyCompWinRate(winRate);
  }, [
    myUnitPool,
    enemyUnitPool,
    earlyTeamCompOptions,
    lateTeamCompOptions,
    selectedLevel,
  ]);

  const handleLevelToggle = (level: number) => {
    setSelectedLevel(level);
    handleUnitSuggestion();
  };

  const handleUnitSuggestion = () => {
    setNonFilteredEarlyComps(
      EarlyOptions.filter((comp: any) => {
        const unitList = comp.unit_list.split("&");

        const shouldFilter = unitList.some((unit: any) =>
          filteredEnemyUnitPool.some((enemyUnit: string) => {
            unit.includes(enemyUnit);
          })
        );
        return (
          !shouldFilter &&
          unitList.length === selectedLevel &&
          Math.floor(comp.level) === selectedLevel
        );
      })
    );

    setNonFilteredLateComps(
      LateOptions.filter((comp: any) => {
        const unitList = comp.units_list.split("&");
        const shouldFilter = unitList.some((unit: any) =>
          filteredEnemyUnitPool.some((enemyUnit: string) =>
            unit.includes(enemyUnit)
          )
        );

        return (
          !shouldFilter &&
          unitList.length === selectedLevel &&
          comp.num_units === selectedLevel
        );
      })
    );

    setSelectedFilteredEarlyComps(
      FilteredEarlyOptions.filter((comp: any) => {
        const unitList = comp.unit_list.split("&");
        const shouldFilter = unitList.some((unit: any) =>
          filteredEnemyUnitPool.some((enemyUnit: string) =>
            unit.includes(enemyUnit)
          )
        );

        return (
          !shouldFilter &&
          unitList.length === selectedLevel &&
          Math.floor(comp.level) === selectedLevel
        );
      })
    );

    setSelectedFilteredLateComps(
      FilteredLateOptions.filter((comp: any) => {
        const unitList = comp.units_list.split("&");
        const shouldFilter = unitList.some((unit: any) =>
          filteredEnemyUnitPool.some((enemyUnit: string) =>
            unit.includes(enemyUnit)
          )
        );
        return (
          !shouldFilter &&
          unitList.length === selectedLevel &&
          comp.num_units === selectedLevel
        );
      })
    );
  };

  const EarlyOptions = Object.keys(earlyTeamCompOptions).reduce(
    (result: any[], property: any) => {
      const teamComps = earlyTeamCompOptions[property];
      const matchingComps = teamComps.filter((teamComp: any) => {
        if (teamComp.unit_list) {
          return true;
        }
        return false;
      });

      if (matchingComps.length > 0) {
        return [...result, ...matchingComps];
      }
      return result;
    },
    []
  );

  const LateOptions = Object.keys(lateTeamCompOptions).reduce(
    (result: any[], property: any) => {
      const teamComps = lateTeamCompOptions[property];
      const matchingComps = teamComps.filter((teamComp: any) => {
        if (teamComp.units_list) {
          return true;
        }
        return false;
      });

      if (matchingComps.length > 0) {
        return [...result, ...matchingComps];
      }
      return result;
    },
    []
  );

  const matchedEarlyOptions = Object.keys(earlyTeamCompOptions).reduce(
    (result: any[]) => {
      const teamComps = earlyTeamCompOptions[selectedLevel];
      let matchingComps: any[] = [];

      if (teamComps) {
        matchingComps = teamComps.filter((teamComp: any) => {
          let unitList: any;
          if (teamComp.unit_list) {
            unitList = teamComp.unit_list.split("&");
            const filteredUnitList = unitList
              .filter((unit: string) => !extraUnitList.includes(unit))
              .map((unit: string) => unit.split("_")[1]);

            return (
              filteredUnitList.sort().toString() ===
              myUnitPool.sort().toString()
            );
          }
          return false;
        });
      }

      return [...result, ...matchingComps];
    },
    []
  );

  const matchedLateOptions = Object.keys(lateTeamCompOptions).reduce(
    (result: any[]) => {
      const teamComps = lateTeamCompOptions[selectedLevel];
      let matchingComps: any[] = [];

      if (teamComps) {
        matchingComps = teamComps.filter((teamComp: any) => {
          let unitList: any;

          if (teamComp.units_list) {
            unitList = teamComp.units_list.split("&");
            const filteredUnitList = unitList
              .filter((unit: string) => !extraUnitList.includes(unit))
              .map((unit: string) => unit.split("_")[1]);

            return (
              filteredUnitList.sort().toString() ===
              myUnitPool.sort().toString()
            );
          }

          return false;
        });
      }

      return [...result, ...matchingComps];
    },
    []
  );

  const FilteredEarlyOptions = Object.keys(earlyTeamCompOptions).reduce(
    (result: any[], property: any) => {
      const teamComps = earlyTeamCompOptions[property];

      const matchingComps = teamComps.filter((teamComp: any) => {
        let unitList: any;
        if (teamComp.unit_list) {
          unitList = teamComp.unit_list.split("&");
          const matchingUnits = unitList.filter((unit: string) =>
            myUnitPool.includes(unit.split("_")[1])
          );

          const uniqueMatchingUnits = Array.from(new Set(matchingUnits)); // Remove duplicates from matching units
          return uniqueMatchingUnits.length >= selectedLevel - 2; // Update the condition to check for 2 or more unique matching units
        }
      });

      if (matchingComps.length > 0) {
        return [...result, ...matchingComps];
      }
      return result;
    },
    []
  );

  const FilteredLateOptions = Object.keys(lateTeamCompOptions).reduce(
    (result: any[], property: any) => {
      const teamComps = lateTeamCompOptions[property];
      const matchingComps = teamComps.filter((teamComp: any) => {
        let unitList;
        if (teamComp.units_list) {
          unitList = teamComp.units_list.split("&");
          const matchingUnits = unitList.filter((unit: string) =>
            myUnitPool.includes(unit.split("_")[1])
          );

          const uniqueMatchingUnits = Array.from(new Set(matchingUnits)); // Remove duplicates from matching units
          return uniqueMatchingUnits.length >= selectedLevel - 3; // Update the condition to check for 3 or more unique matching units
        }
      });

      if (matchingComps.length > 0) {
        return [...result, ...matchingComps];
      }
      return result;
    },
    []
  );

  return (
    <div>
      <MyChampPool
        myUnitPool={myUnitPool}
        setMyUnitPool={setMyUnitPool}
        winRate={myCompWinRate}
      />
      <div className="grid grid-cols-12 items-center font-bold">
        <div className="col-span-2 flex"></div>
        <div className="col-span-10 flex justify-start space-x-2 ">
          {[5, 6, 7, 8, 9, 10].map((level: number) => (
            <button
              key={level}
              className={`rounded-xl border-2 border-green-500 px-4 py-2 hover:bg-emerald-500 ${
                selectedLevel === level ? "bg-emerald-500" : "bg-green-200"
              }`}
              onClick={() => handleLevelToggle(level)}
            >
              Lv{level}
            </button>
          ))}
        </div>
      </div>
      <div className=" flex flex-col justify-center p-2">
        <div className="flex w-full flex-col">
          {selectedLevel <= 7 ? (
            <TeamCompDisplay
              nonFilteredTeamComps={nonFilteredEarlyComps}
              filteredTeamComps={selectedFilteredEarlyComps}
              lowLevel={true}
              compLevel={selectedLevel}
            />
          ) : (
            <TeamCompDisplay
              nonFilteredTeamComps={nonFilteredLateComps}
              filteredTeamComps={selectedFilteredLateComps}
              lowLevel={false}
              compLevel={selectedLevel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LayoutTeamComp;
