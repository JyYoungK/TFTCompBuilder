import React from "react";
import { sortOrder, Season9TeamComp } from "../type";
import { season9ChampionList } from "../season9/season9Comp";

interface DisplayTeamCompsProps {
  matchedTeamComps: Season9TeamComp[];
}

const DisplayTeamComps: React.FC<DisplayTeamCompsProps> = ({
  matchedTeamComps,
}) => {
  const sortedMatchedTeamComps = matchedTeamComps
    .slice()
    .sort((compA, compB) => {
      const orderA = sortOrder[compA.speed] || Infinity;
      const orderB = sortOrder[compB.speed] || Infinity;
      return orderA - orderB;
    });

  return (
    <div className="w-2/6">
      {sortedMatchedTeamComps.map((comp) => (
        <div
          key={comp.name}
          className={`flex flex-col  ${
            comp.speed === "Roll at 6 (Early Game Comp)"
              ? "bg-gradient-to-r from-green-300 to-green-200"
              : comp.speed === "Roll at 7 (Mid Game Comp)"
              ? "bg-gradient-to-r from-blue-300 to-blue-200"
              : comp.speed === "Roll at 8 (Late Game Comp)"
              ? "bg-gradient-to-r from-purple-300 to-purple-200"
              : ""
          } p-4`}
        >
          <div className="flex flex-row space-x-2 mb-2 font-black text-2xl">
            <h2 className="">{comp.name}</h2>
            {/* <p>Tier: {comp.tier}</p> */}
            <p> [{comp.speed}]</p>
            {/* <p>Win: {comp.win}</p>
        <p>Loss: {comp.loss}</p>
        <p>Win Rate: {comp.win / (comp.win + comp.loss)}</p> */}
          </div>
          <div className="flex flex-row justify-center space-x-1 ">
            {comp.champions.map((champion) => {
              const { name } = champion;
              const championData = season9ChampionList.find(
                (champ) => champ.name === name
              );

              let borderColorClass = "";
              switch (championData?.cost) {
                case 5:
                  borderColorClass = "border-yellow-500";
                  break;
                case 4:
                  borderColorClass = "border-purple-500";
                  break;
                case 3:
                  borderColorClass = "border-blue-500";
                  break;
                case 2:
                  borderColorClass = "border-green-500";
                  break;
                case 1:
                  borderColorClass = "border-gray-500";
                  break;
                default:
                  borderColorClass = "";
              }
              return (
                <div key={name} className={`relative`}>
                  <img
                    className={`w-20 h-20 ${borderColorClass} border-4 `}
                    src={`/champions/${name}.png`}
                    alt={name}
                  />
                  {champion.item.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                      {champion.item.map((item, index) => (
                        <img
                          className="w-6 h-6"
                          key={index}
                          src={`/normalItems/${item}.png`}
                          alt={item}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayTeamComps;
