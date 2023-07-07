import React from "react";
import ChampionProfileDisplay from "./championProfileDisplay";
import { season9ChampionList } from "../season9/season9Comp";

interface DisplayLateTeamCompProps {
  filteredComps: any[] | undefined;
}

const DisplayLateTeamComp: React.FC<DisplayLateTeamCompProps> = ({
  filteredComps,
}) => {
  console.log(filteredComps);
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row">
        <div className="w-30  px-4 py-2 text-lg font-bold">AVG</div>
        <div className="px-4 py-2 text-lg font-bold">Late Game Champions</div>
      </div>
      <div className="bg-[#f9f4ac]">
        {filteredComps?.map((comp, index: number) => (
          <div key={index} className="flex flex-row">
            <div className="w-30 flex items-center justify-center  px-4 py-2 text-lg font-bold ">
              {comp[0].overall.avg.toFixed(2)}{" "}
            </div>
            <div className="flex items-center px-4 py-2 pt-2">
              <div>{comp[0].suggested_legends}</div>
              <div className="flex flex-row space-x-2">
                {comp[0].unit_stats
                  .slice(0, 8)
                  .sort((a: any, b: any) => {
                    const nameA = a.unit.slice(5).toLowerCase();
                    const nameB = b.unit.slice(5).toLowerCase();
                    const championA = season9ChampionList.find(
                      (champ) => champ.name.toLowerCase() === nameA
                    );
                    const championB = season9ChampionList.find(
                      (champ) => champ.name.toLowerCase() === nameB
                    );

                    if (championA?.cost !== championB?.cost) {
                      return (championA?.cost || 0) - (championB?.cost || 0);
                    } else {
                      return nameA.localeCompare(nameB);
                    }
                  })
                  .map((unit: any, index: number) => {
                    const { unit: unitName } = unit;
                    const build = comp[0].builds.find(
                      (build: any) =>
                        build.unit === unitName && !build.unit_buildNames
                    );
                    const buildName = build ? build.buildName : "";

                    return (
                      <ChampionProfileDisplay
                        key={index}
                        champion={{ name: unit.unit.slice(5) }}
                        buildName={buildName}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayLateTeamComp;
