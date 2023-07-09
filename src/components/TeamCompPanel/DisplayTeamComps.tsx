import { useState } from "react";
import { EarlyOptions, EarlyTeamComp } from "../../type";
import { season9ChampionList } from "../../season9/season9Comp";
import DisplayLateTeamComp from "./DisplayLateTeamComp";
import ChampionProfileDisplay from "../UnitPanel/ChampionProfileDisplay";
import ItemTierList from "../Helper/ItemTierList";
import MyChampPool from "./MyChampPool";
import TeamCompDisplay from "./TeamCompDisplay";

interface DisplayEarlyTeamCompsProps {
  myUnitPool: any;
  setMyUnitPool: any;
  earlyOptions: EarlyOptions;
}

const DisplayEarlyTeamComps: React.FC<DisplayEarlyTeamCompsProps> = ({
  myUnitPool,
  setMyUnitPool,
  earlyOptions,
}) => {
  const [expandedRow, setExpandedRow] = useState<number[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [selectedFilteredComps, setSelectedFilteredComps] = useState<
    EarlyTeamComp[]
  >([]);
  const [highestWinRateComps, setHighestWinRateComps] = useState<
    EarlyTeamComp[]
  >([]);

  const handleLevelToggle = (level: number) => {
    if (level === selectedLevel) {
      setSelectedLevel(null);
      setSelectedFilteredComps([]);
      setHighestWinRateComps([]);
    } else {
      setSelectedLevel(level);
      setSelectedFilteredComps(
        filteredOptions.filter((comp: any) => comp.level === level)
      );
      // setHighestWinRateComps(
      //   highestWinRateOptions.filter((comp: any) => comp.level === level)
      // );
    }
  };

  const filteredOptions = Object.keys(earlyOptions).reduce(
    (result: any[], property: any) => {
      const teamComps = earlyOptions[property];
      const matchingComps = teamComps.filter((teamComp: any) => {
        const unitList = teamComp.unit_list.split("&");
        console.log(property);
        console.log(teamComp.level);
        const matchingUnits = unitList.filter((unit: string) =>
          myUnitPool.includes(unit.slice(5))
        );
        return matchingUnits.length >= 2;

        // return matchingUnits.length >= Math.floor(property / 2);
      });
      if (matchingComps.length > 0) {
        return [...result, ...matchingComps];
      }
      return result;
    },
    []
  );

  console.log(filteredOptions);

  // const highestWinRateOptions = Object.keys(earlyOptions).flatMap(
  //   (property: any) => {
  //     const teamComps = earlyOptions[property];

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
      <div className="row-span-1 space-x-2 ">
        {/* <button onClick={() => handleLevelToggle(4)}>Lv4</button> */}
        <button
          className="rounded-xl border-2 border-gray-400 p-2"
          onClick={() => handleLevelToggle(5)}
        >
          Lv5
        </button>
        <button
          className="rounded-xl border-2 border-gray-400 p-2"
          onClick={() => handleLevelToggle(6)}
        >
          Lv6
        </button>
        <button
          className="rounded-xl border-2 border-gray-400 p-2"
          onClick={() => handleLevelToggle(7)}
        >
          Lv7
        </button>
      </div>
      <div className="row-span-4 flex flex-col justify-center border-2 border-green-400 p-2">
        <div className="mt-4 flex w-full flex-col">
          <TeamCompDisplay
            teamComps={selectedFilteredComps}
            title="Best Comp that fits your pool"
          />
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
