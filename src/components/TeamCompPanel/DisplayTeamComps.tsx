import { useState } from "react";
import { EarlyOptions, EarlyTeamComp } from "../../type";
import MyChampPool from "./MyChampPool";
import TeamCompDisplay from "./TeamCompDisplay";

interface DisplayEarlyTeamCompsProps {
  myUnitPool: any;
  setMyUnitPool: any;
  enemyUnitPool: any;
  earlyTeamCompOptions: EarlyOptions;
  lateTeamCompOptions: EarlyOptions;
}

const DisplayEarlyTeamComps: React.FC<DisplayEarlyTeamCompsProps> = ({
  myUnitPool,
  setMyUnitPool,
  enemyUnitPool,
  earlyTeamCompOptions,
  lateTeamCompOptions,
}) => {
  const [expandedRow, setExpandedRow] = useState<number[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedFilteredEarlyComps, setSelectedFilteredEarlyComps] = useState<
    EarlyTeamComp[]
  >([]);
  const [selectedFilteredLateComps, setSelectedFilteredLateComps] = useState<
    EarlyTeamComp[]
  >([]);
  const [highestWinRateComps, setHighestWinRateComps] = useState<
    EarlyTeamComp[]
  >([]);
  const [level, setLevel] = useState(0);

  const handleLevelToggle = (level: number) => {
    setLevel(level);
    if (level === selectedLevel) {
      setSelectedLevel(null);
      setSelectedFilteredEarlyComps([]);
      setHighestWinRateComps([]);
    } else {
      setSelectedLevel(level);
      setSelectedFilteredEarlyComps(
        filteredEarlyOptions.filter((comp: any) => comp.level === level)
      );
      setSelectedFilteredLateComps(
        filteredLateOptions.filter((comp: any) => comp.num_units === level)
      );
      // setHighestWinRateComps(
      //   highestWinRateOptions.filter((comp: any) => comp.level === level)
      // );
    }
  };

  const filteredEarlyOptions = Object.keys(earlyTeamCompOptions).reduce(
    (result: any[], property: any) => {
      const teamComps = earlyTeamCompOptions[property];
      const matchingComps = teamComps.filter((teamComp: any) => {
        let unitList;
        if (teamComp.unit_list) {
          unitList = teamComp.unit_list.split("&");
          const shouldInclude = !unitList.some((unit: string) => {
            const unitCountInEnemy = enemyUnitPool.filter(
              (enemyUnit: string) => enemyUnit === unit
            ).length;
            return unitCountInEnemy >= 6;
          });
          if (shouldInclude) {
            const matchingUnits = unitList.filter((unit: string) =>
              myUnitPool.includes(unit.slice(5))
            );
            return (
              matchingUnits.length >= 1 &&
              unitList.length === parseInt(property)
            );
          } else {
            return false;
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

  const filteredLateOptions = Object.keys(lateTeamCompOptions).reduce(
    (result: any[], property: any) => {
      const teamComps = lateTeamCompOptions[property];
      const matchingComps = teamComps.filter((teamComp: any) => {
        let unitList;
        if (teamComp.units_list) {
          unitList = teamComp.units_list.split("&");
          const shouldInclude = !unitList.some((unit: string) => {
            const unitCountInEnemy = enemyUnitPool.filter(
              (enemyUnit: string) => enemyUnit === unit
            ).length;
            return unitCountInEnemy >= 6;
          });
          if (shouldInclude) {
            const matchingUnits = unitList.filter((unit: string) =>
              myUnitPool.includes(unit.slice(5))
            );
            return (
              matchingUnits.length >= 1 &&
              unitList.length === parseInt(property)
            );
          } else {
            return false;
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

  // const highestWinRateOptions = Object.keys(teamCompOptions).flatMap(
  //   (property: any) => {
  //     const teamComps = teamCompOptions[property];

  //     const sortedComps = teamComps.sort((a: any, b: any) => b.win - a.win);

  //     return sortedComps.slice(0, 5);
  //   }
  // );

  // console.log(highestWinRateOptions);

  return (
    <div className="container mx-auto grid-rows-6">
      <div className="row-span-2 h-40">
        <MyChampPool myUnitPool={myUnitPool} setMyUnitPool={setMyUnitPool} />
      </div>
      <div className="row-span-1 space-x-2">
        {[4, 5, 6, 7, 8, 9, 10].map((level: number) => (
          <button
            key={level}
            className={`rounded-xl border-2 border-gray-500 px-4 py-2 ${
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
          {level <= 7 ? (
            <TeamCompDisplay
              teamComps={selectedFilteredEarlyComps}
              title="Best Comp that fits your pool"
              lowLevel={true}
            />
          ) : (
            <TeamCompDisplay
              teamComps={selectedFilteredLateComps}
              title="Best Comp that fits your pool"
              lowLevel={false}
            />
          )}
          {/* <TeamCompDisplay
            teamComps={highestWinRateComps}
            title="Highest Win Rate Comp"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default DisplayEarlyTeamComps;

{
  /* <div className="flex w-full flex-col">
  <div className="grid grid-cols-6 text-2xl font-bold">
    <div className="col-span-1 pl-8 text-start">Rank</div>
    <div className="col-span-4 text-start">Recommended Comps</div>
    {expanded && <div className="col-span-1 text-center"></div>}
  </div>
  <div className="">
    {season9EarlyGameTeamCompData.map((comp, index) => (
      <div
        key={comp.name}
        className="my-2 rounded-lg border-[3px] border-[#9ef65f] bg-[#d8ffcb] p-3"
      >
        <div
          className="grid grid-cols-6"
          onClick={() => toggleRowExpansion(index, comp)}
        >
          <div className="col-span-1 flex items-center pl-8 text-start text-2xl font-bold">
            {comp.name}
          </div>
          <div className="col-span-4 text-start">
            <div className="flex flex-row space-x-2">
              {comp.champions.map((champion, index) => (
                <ChampionProfileDisplay
                  key={index}
                  champion={champion}
                  buildName={null}
                  count={false}
                />
              ))}
            </div>
          </div>
          <div className="col-span-1 mr-3 flex items-center justify-end">
            {expandedRow.includes(index) ? (
              <img
                className="arrow-icon rotate h-10 w-10 2xl:h-16 2xl:w-16"
                src="/icons/ArrowIcon.png"
                alt="Arrow Icon"
              />
            ) : (
              <img
                className="arrow-icon h-10 w-10 2xl:h-16 2xl:w-16"
                src="/icons/ArrowIcon.png"
                alt="Arrow Icon"
              />
            )}
          </div>
        </div>
        {expandedRow.includes(index) && (
          <div className="mt-2 border-2 border-[#ffe187] bg-[#f3ffc9] p-4">
            <DisplayLateTeamComp filteredComps={filteredComps} />
          </div>
        )}
      </div>
    ))}
  </div>
</div> */
}
