import React from "react";
import ChampionProfileDisplay from "./championProfileDisplay";
import { season9ChampionList, TFTLegendMap } from "../season9/season9Comp";
import { formatAugmentedString } from "./HelperFunctions";

interface DisplayLateTeamCompProps {
  filteredComps: any[] | undefined;
}

const DisplayLateTeamComp: React.FC<DisplayLateTeamCompProps> = ({
  filteredComps,
}) => {
  return (
    <div className="mt-4 flex w-full flex-col">
      <div className="grid grid-cols-10 py-2 text-lg font-bold">
        <div className="col-span-1">AVG</div>
        <div className="col-span-1">PICK</div>
        <div className="col-span-4">Best Late Comp Transition</div>
        <div className="col-span-2">Augment Suggestion</div>
        <div className="col-span-2">Legend Suggestion</div>
      </div>
      <div className="">
        {filteredComps?.map((comp, index: number) => (
          <div
            key={index}
            className="mt-2 grid grid-cols-10 items-center rounded-md border-4 border-[#ffffee] bg-[#fafae5] py-4"
          >
            {/* AVG */}
            <div className="col-span-1 justify-center text-lg font-bold ">
              {(
                comp[0].overall.avg -
                (4.4 - comp[0].overall.avg.toFixed(2)) * 8
              ).toFixed(2)}
            </div>
            {/* PICK */}
            <div className="col-span-1 justify-center text-lg font-bold ">
              {(comp[0].trends[comp[0].trends.length - 1].pick * 100).toFixed(
                2
              )}
              %
            </div>
            {/* LATE GAME */}
            <div className="col-span-4 justify-center  ">
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
            {/* AUGMENT */}
            <div className="col-span-2 text-sm font-bold 2xl:text-xl">
              {comp[0].augments.slice(1, 4).map((item: any, index: number) => (
                <div className="flex flex-col" key={index}>
                  <div>{formatAugmentedString(item.aug)}</div>
                </div>
              ))}
            </div>
            {/* LEGEND */}
            <div className="col-span-2 flex flex-row justify-center space-x-2">
              {comp[0].suggested_legends
                .sort((a: number, b: number) => a - b)
                .slice(1, 4)
                .map((item: any, index: number) => {
                  const championName = TFTLegendMap[item];
                  const imageUrl = `https://cdn.metatft.com/file/metatft/legends/legend_largecircle_${championName.toLowerCase()}.png`;

                  return (
                    <div className="flex flex-row" key={index}>
                      {/* <div>{championName}</div> */}
                      <img
                        className="h-10 w-10 2xl:h-12 2xl:w-12"
                        src={imageUrl}
                        alt={championName}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayLateTeamComp;
