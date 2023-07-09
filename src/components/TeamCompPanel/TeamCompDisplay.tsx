import { useState } from "react";
import { season9ChampionList } from "../../season9/season9Comp";
import ChampionProfileDisplay from "../UnitPanel/ChampionProfileDisplay";
import { Tabs } from "antd";
import type { TabsProps } from "antd";

interface TeamCompDisplayProps {
  nonFilteredTeamComps: any;
  filteredTeamComps: any;
  title: string;
  lowLevel: boolean;
}

const TeamCompDisplay: React.FC<TeamCompDisplayProps> = ({
  nonFilteredTeamComps,
  filteredTeamComps,
  title,
  lowLevel,
}) => {
  const [activeKey, setActiveKey] = useState<string>("1");

  const handleTabChange = (key: string) => {
    setActiveKey(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: title + " that fits your pool",
    },
    {
      key: "2",
      label: title + " in general",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-12 items-center py-2 font-bold ">
        <div className="col-span-2 mb-4 text-2xl">Win Rate</div>
        <div className="custom-tabs col-span-10 flex justify-start text-2xl">
          <Tabs
            items={items}
            activeKey={activeKey}
            onChange={handleTabChange}
            className="custom-tabs"
          />
        </div>
      </div>

      {activeKey === "1" ? (
        // Page 1 content
        filteredTeamComps.length > 0 ? (
          filteredTeamComps
            .filter(
              (comp: any, index: number, self: any[]) =>
                index ===
                self.findIndex(
                  (c: any) =>
                    (lowLevel ? c.unit_list : c.units_list) ===
                    (lowLevel ? comp.unit_list : comp.units_list)
                )
            )
            .filter((comp: any) => comp.count >= 20)
            .sort((a: any, b: any) =>
              lowLevel ? b.win - a.win : a.avg - b.avg
            )
            .slice(0, 7)
            .map((comp: any, index: number) => {
              const unitList = lowLevel
                ? comp.unit_list.split("&")
                : comp.units_list.split("&");

              const extra_unit_list = [
                "voideggherald",
                "voideggremora",
                "voideggbaron",
                "heimerdingerturret",
              ];

              const championNames = unitList.map((champion: string) =>
                champion.slice(5)
              );

              const filteredChampionNames = championNames.filter(
                (championName: string) =>
                  !extra_unit_list.includes(championName.toLowerCase())
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
                <div key={index} className="grid grid-cols-12 ">
                  <div className="col-span-2 flex items-center justify-center text-lg font-bold 2xl:text-2xl">
                    {lowLevel
                      ? `${(comp.win * 100).toFixed(2)}%`
                      : `${((1 - comp.avg / 8) * 100).toFixed(2)}%`}
                  </div>
                  <div className="col-span-10 flex flex-row space-x-2">
                    {filteredChampionNames.map(
                      (championName: string, subIndex: number) => (
                        <div className="my-2" key={`${index}-${subIndex}`}>
                          <ChampionProfileDisplay
                            champion={{ name: championName }}
                            count={false}
                            buildName={null}
                            myUnitPool={null}
                            enemyUnitPool={null}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              );
            })
        ) : (
          <div className="text-md grid grid-cols-12 py-2 font-bold 2xl:text-xl">
            <div className="col-span-2">?</div>
            <div className="col-span-10 flex justify-start">
              Sorry, no data is available
            </div>
          </div>
        )
      ) : // Page 2 content
      nonFilteredTeamComps.length > 0 ? (
        nonFilteredTeamComps
          .filter(
            (comp: any, index: number, self: any[]) =>
              index ===
              self.findIndex(
                (c: any) =>
                  (lowLevel ? c.unit_list : c.units_list) ===
                  (lowLevel ? comp.unit_list : comp.units_list)
              )
          )
          .filter((comp: any) => comp.count >= 20)
          .sort((a: any, b: any) => (lowLevel ? b.win - a.win : a.avg - b.avg))
          .slice(0, 7)
          .map((comp: any, index: number) => {
            const unitList = lowLevel
              ? comp.unit_list.split("&")
              : comp.units_list.split("&");

            const extra_unit_list = [
              "voideggherald",
              "voideggremora",
              "voideggbaron",
              "heimerdingerturret",
            ];

            const championNames = unitList.map((champion: string) =>
              champion.slice(5)
            );

            const filteredChampionNames = championNames.filter(
              (championName: string) =>
                !extra_unit_list.includes(championName.toLowerCase())
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
              <div key={index} className="grid grid-cols-12 ">
                <div className="col-span-2 flex items-center justify-center text-lg font-bold 2xl:text-2xl">
                  {lowLevel
                    ? `${(comp.win * 100).toFixed(2)}%`
                    : `${((1 - comp.avg / 8) * 100).toFixed(2)}%`}
                </div>
                <div className="col-span-10 flex flex-row space-x-2">
                  {filteredChampionNames.map(
                    (championName: string, subIndex: number) => (
                      <div className="my-2" key={`${index}-${subIndex}`}>
                        <ChampionProfileDisplay
                          champion={{ name: championName }}
                          count={false}
                          buildName={null}
                          myUnitPool={null}
                          enemyUnitPool={null}
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })
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
