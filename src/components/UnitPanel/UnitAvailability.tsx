import { season9ChampionList } from "../../season9/season9Comp";
import ChampionProfileDisplay from "./ChampionProfileDisplay";
import UnitCountManager from "./UnitCountManager";

interface UnitAvailabilityProps {
  myUnitPool: any;
  setMyUnitPool: any;
}

function UnitAvailability({
  myUnitPool,
  setMyUnitPool,
}: UnitAvailabilityProps): JSX.Element {
  const rows: any[][] = [];

  // Group champions by cost
  for (let cost = 5; cost >= 2; cost--) {
    const championsWithCost = season9ChampionList.filter(
      (champion) => champion.cost === cost
    );
    rows.push(championsWithCost);
  }

  return (
    <div className="flex h-full flex-col border-2 border-red-500">
      {rows.map((row, index) => (
        <div key={index} className="my-3 grid grid-cols-6 gap-2">
          {row.map((champion) => (
            <div key={champion.name} className="flex flex-row">
              <ChampionProfileDisplay
                champion={champion}
                buildName={null}
                count={true}
              />
              <UnitCountManager
                champion={champion}
                myUnitPool={myUnitPool}
                setMyUnitPool={setMyUnitPool}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UnitAvailability;
