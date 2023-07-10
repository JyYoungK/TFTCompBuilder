import { useState } from "react";
import { season9ChampionList } from "../../season9/season9Comp";
import ChampionProfileDisplay from "../UnitPanel/ChampionProfileDisplay";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { extraUnitList } from "../../season9/season9Comp";
import { getWinRateColor } from "../Helper/HelperFunctions";

export interface Item {
  id: number;
  text: string;
}

export interface ContainerState {
  cards: Item[];
}

interface TeamCompDisplayProps {
  nonFilteredTeamComps: any;
  filteredTeamComps: any;
  lowLevel: boolean;
  compLevel: number;
}

const TeamCompDisplay: React.FC<TeamCompDisplayProps> = ({
  nonFilteredTeamComps,
  filteredTeamComps,
  lowLevel,
  compLevel,
}) => {
  const [activeKey, setActiveKey] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Best Level " + compLevel + " comp that fits your pool",
    },
    {
      key: "2",
      label: "Best Level " + compLevel + " comp in general",
    },
  ];

  const [cardSelected, setCardSelected] = useState(0);

  const filteredComps = (comps: any[]) =>
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
      .filter((comp: any) => comp.count >= 20) //must be played more than 20 times
      .sort((a: any, b: any) => (lowLevel ? b.win - a.win : a.avg - b.avg))
      .slice(0, 10)
      .map((comp: any, index: number) => {
        const isSelected = index === cardSelected; // Check if the current row is selected

        const unitList = lowLevel
          ? comp.unit_list.split("&")
          : comp.units_list.split("&");

        const championNames = unitList.map((champion: string) =>
          champion.slice(5)
        );

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
                        myUnitPool={null}
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

  return (
    <div>
      <div className="grid grid-cols-12 items-center font-bold">
        <div className="col-span-2 mb-4 text-lg 2xl:text-2xl"></div>
        <div className="col-span-10 flex justify-start">
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={handleTabChange}
            className="custom-tabs"
            size="large"
          />
        </div>
      </div>
      {activeKey === "1" ? (
        // Page 1 content
        filteredTeamComps.length > 0 ? (
          filteredComps(filteredTeamComps)
        ) : (
          <div className="text-md grid grid-cols-12 py-2 font-bold 2xl:text-xl">
            <div className="col-span-2">?</div>
            <div className="col-span-10 flex flex-col ">
              <div className="text-start">
                Sorry, either no data is available or
              </div>
              <div className="text-start">
                You must select more champions to your pool
              </div>
            </div>
          </div>
        )
      ) : // Page 2 content
      nonFilteredTeamComps.length > 0 ? (
        filteredComps(nonFilteredTeamComps)
      ) : (
        <div className="text-md grid grid-cols-12 py-2 font-bold 2xl:text-xl">
          <div className="col-span-2">?</div>
          <div className="col-span-10 flex justify-start">
            Sorry, no data is available
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCompDisplay;
