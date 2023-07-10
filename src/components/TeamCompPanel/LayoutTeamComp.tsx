import { useState, useEffect } from "react";
import { EarlyOptions, EarlyTeamComp } from "../../type";
import MyChampPool from "./MyChampPool";
import TeamCompDisplay from "./TeamCompDisplay";

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
    const count = enemyUnitPool.filter((x: any) => x === unit).length;
    if (count >= 6 && !acc.includes(unit)) {
      acc.push(unit);
    }
    return acc;
  }, []);

  useEffect(() => {
    handleUnitSuggestion();
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

  const FilteredEarlyOptions = Object.keys(earlyTeamCompOptions).reduce(
    (result: any[], property: any) => {
      const teamComps = earlyTeamCompOptions[property];

      const matchingComps = teamComps.filter((teamComp: any) => {
        let unitList;
        if (teamComp.unit_list) {
          unitList = teamComp.unit_list.split("&");
          const matchingUnits = unitList.filter((unit: string) =>
            myUnitPool.includes(unit.slice(5))
          );
          const uniqueMatchingUnits = Array.from(new Set(matchingUnits)); // Remove duplicates from matching units
          if (property > 6) {
            return uniqueMatchingUnits.length >= 2; // Update the condition to check for 2 or more unique matching units
          } else {
            return uniqueMatchingUnits.length >= 1; // Update the condition to check for 1 or more unique matching units
          }
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
            myUnitPool.includes(unit.slice(5))
          );
          const uniqueMatchingUnits = Array.from(new Set(matchingUnits)); // Remove duplicates from matching units
          return uniqueMatchingUnits.length >= 2; // Update the condition to check for 2 or more unique matching units
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
    <div className="container mx-auto grid-rows-6">
      <div className="row-span-2 h-40">
        <MyChampPool myUnitPool={myUnitPool} setMyUnitPool={setMyUnitPool} />
      </div>
      <div className="row-span-1 space-x-2">
        {[4, 5, 6, 7, 8, 9, 10].map((level: number) => (
          <button
            key={level}
            className={`rounded-xl border-2 border-gray-500 px-4 py-2 hover:bg-gray-400 ${
              selectedLevel === level ? "bg-gray-400" : "bg-gray-200"
            }`}
            onClick={() => handleLevelToggle(level)}
          >
            Lv{level}
          </button>
        ))}
      </div>
      <div className="row-span-4 flex flex-col justify-center border-2 border-green-400 p-2">
        <div className="mt-4 flex w-full flex-col">
          {selectedLevel <= 7 ? (
            <TeamCompDisplay
              nonFilteredTeamComps={nonFilteredEarlyComps}
              filteredTeamComps={selectedFilteredEarlyComps}
              title="Best Early Comp"
              lowLevel={true}
            />
          ) : (
            <TeamCompDisplay
              nonFilteredTeamComps={nonFilteredLateComps}
              filteredTeamComps={selectedFilteredLateComps}
              title="Best Late Comp"
              lowLevel={false}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LayoutTeamComp;
