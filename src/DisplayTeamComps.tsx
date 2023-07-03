import React from "react";
import { sortOrder, Season9TeamComp } from "./type";

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
    <div className="w-4/6">
      {sortedMatchedTeamComps.map((comp) => (
        <div
          key={comp.name}
          className={`flex flex-col mt-5 ${
            comp.speed === "Roll at 6 (Early Game Comp)"
              ? "bg-green-400"
              : comp.speed === "Roll at 7 (Mid Game Comp)"
              ? "bg-blue-400"
              : comp.speed === "Roll at 8 (Late Game Comp)"
              ? "bg-purple-400"
              : ""
          } p-4`}
        >
          {" "}
          <div className="flex flex-row space-x-2 mb-2 font-black text-2xl">
            <h2 className="">{comp.name}</h2>
            {/* <p>Tier: {comp.tier}</p> */}
            <p> [{comp.speed}]</p>
            {/* <p>Win: {comp.win}</p>
        <p>Loss: {comp.loss}</p>
        <p>Win Rate: {comp.win / (comp.win + comp.loss)}</p> */}
          </div>
          <div className="flex flex-row justify-center">
            {comp.champions.map((champion) => (
              <div key={champion.name} className="relative">
                <img
                  className="w-20 h-20"
                  src={`/champions/${champion.name}.png`}
                  alt={champion.name}
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayTeamComps;
