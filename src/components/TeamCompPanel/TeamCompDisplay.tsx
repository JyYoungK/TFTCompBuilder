import React from "react";
import { season9ChampionList } from "../../season9/season9Comp";
import ChampionProfileDisplay from "../UnitPanel/ChampionProfileDisplay";

interface TeamCompDisplayProps {
  teamComps: any;
  title: string;
  lowLevel: boolean;
}

const TeamCompDisplay: React.FC<TeamCompDisplayProps> = ({
  teamComps,
  title,
  lowLevel,
}) => {
  return (
    <div>
      <div className="grid grid-cols-12 py-2 text-lg font-bold 2xl:text-2xl">
        <div className="col-span-2">Win Rate</div>
        <div className="col-span-10 flex justify-start ">{title}</div>
      </div>
      {teamComps.length > 0 ? (
        teamComps
          .filter(
            (comp: any, index: number, self: any[]) =>
              index ===
              self.findIndex(
                (c: any) =>
                  (lowLevel ? c.unit_list : c.units_list) ===
                  (lowLevel ? comp.unit_list : comp.units_list)
              )
          )
          //remove ones that are played low
          .filter((comp: any) => comp.count >= 15)
          .sort((a: any, b: any) => (lowLevel ? b.win - a.win : a.avg - b.avg))
          .slice(0, 7)
          .map((comp: any, index: number) => {
            const unitList = lowLevel
              ? comp.unit_list.split("&")
              : comp.units_list.split("&");
            const championNames = unitList.map((champion: string) =>
              champion.slice(5)
            );

            championNames.sort((a: string, b: string) => {
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
                  {championNames.map(
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
          <div className="col-span-10 flex justify-start ">
            Sorry, no data is available
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamCompDisplay;
