import React from "react";
import { season9ChampionList } from "../../season9/season9Comp";
import ChampionProfileDisplay from "../UnitPanel/ChampionProfileDisplay";

interface TeamCompDisplayProps {
  teamComps: any;
  title: string;
}

const TeamCompDisplay: React.FC<TeamCompDisplayProps> = ({
  teamComps,
  title,
}) => {
  return (
    <div>
      <div className="grid grid-cols-10 py-2 text-lg font-bold 2xl:text-2xl">
        <div className="col-span-2">Win Rate</div>
        <div className="col-span-8 flex justify-start ">{title}</div>
      </div>
      {teamComps
        .slice(0, 6)
        .sort((a: any, b: any) => b.win - a.win)
        .map((comp: any, index: number) => {
          const unitList = comp.unit_list.split("&");
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
            <div key={index} className="grid grid-cols-10 ">
              <div className="col-span-2 flex items-center justify-center text-lg font-bold 2xl:text-2xl">
                {(comp.win * 100).toFixed(2)}%
              </div>
              <div className="col-span-8 flex flex-row space-x-2">
                {championNames.map((championName: string, subIndex: number) => (
                  <div className="my-2">
                    <ChampionProfileDisplay
                      key={`${index}-${subIndex}`}
                      champion={{ name: championName }}
                      count={false}
                      buildName={null}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default TeamCompDisplay;
