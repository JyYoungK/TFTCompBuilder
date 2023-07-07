import { useState, useEffect } from "react";
import { Season9TeamComp } from "../type";
import { season9EarlyGameTeamCompData } from "../season9/season9Comp";
import axios from "axios";
import DisplayLateTeamComp from "./DisplayLateTeamComp";
import ChampionProfileDisplay from "./championProfileDisplay";
import ItemTierList from "./ItemTierList";

interface DisplayTeamCompsProps {
  matchedTeamComps: Season9TeamComp[];
}

const DisplayEarlyTeamComps: React.FC<DisplayTeamCompsProps> = ({
  matchedTeamComps,
}) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api2.metatft.com/tft-comps-api/comps_data"
        );
        const { cluster_id, cluster_details } = response.data.results.data;
        setClusterId(cluster_id);

        const clusterArray = Object.values(cluster_details);
        const teamCompID = clusterArray.map((cluster: any) => cluster.Cluster);

        setTeamCompIDS(teamCompID);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [expandedRow, setExpandedRow] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [clusterId, setClusterId] = useState(null);
  const [teamCompIDS, setTeamCompIDS] = useState<number[]>([]);
  const [filteredComps, setFilteredComps] = useState<any>();

  const toggleRowExpansion = async (index: any, comp: Season9TeamComp) => {
    if (expandedRow === index) {
      setExpandedRow(null);
      setExpanded(false);
    } else {
      setExpandedRow(index);
      setExpanded(true);

      if (typeof comp === "object") {
        const compValues = Object.values(comp);
        const names = compValues[1].map((item: any) => item.name);
        try {
          const compDetailsPromises = teamCompIDS.map(
            async (compID: number) => {
              const response = await axios.get(
                `https://api2.metatft.com/tft-comps-api/comp_details?comp=${compID}&cluster_id=${clusterId}`
              );

              const { results } = response.data;
              const matchedComps: any[] = [];

              if (
                results &&
                results.early_options &&
                results.overall.avg < 4.4
              ) {
                const earlyOptions = results.early_options[5] || [];
                const topThreeEarlyComps = earlyOptions.slice(0, 4);

                topThreeEarlyComps.forEach((findComp: any) => {
                  const unitList = findComp.unit_list || "";
                  const matched = names.some((name: string) =>
                    unitList.includes(name)
                  );

                  if (matched) {
                    matchedComps.push(results);
                    return;
                  }
                });
              }

              return matchedComps.length > 0 ? matchedComps : null;
            }
          );

          const compDetails = await Promise.all(compDetailsPromises);
          const filteredCompDetails = compDetails.filter(
            (comp) => comp !== null
          );
          setFilteredComps(filteredCompDetails);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  return (
    <div className="container mx-auto my-4">
      <div className="flex w-full flex-col">
        <div className="grid grid-cols-6 text-2xl font-bold">
          <div className="col-span-1 pl-8 text-start ">Rank</div>
          <div className="col-span-4 text-start ">Early Game Champions</div>
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
                {/* RANK */}
                <div className="col-span-1 flex items-center pl-8 text-start text-2xl font-bold ">
                  {comp.name}
                </div>
                {/* EARLY COMP */}
                <div className="col-span-4 text-start">
                  <div className=" flex flex-row space-x-2">
                    {comp.champions.map((champion, index) => (
                      <ChampionProfileDisplay
                        key={index}
                        champion={champion}
                        buildName={null}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-1 flex items-center text-end">
                  Show
                </div>
              </div>
              {expandedRow === index && (
                <div className="mt-2 border-2 border-[#ffe187] bg-[#f3ffc9] p-4">
                  <DisplayLateTeamComp filteredComps={filteredComps} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayEarlyTeamComps;
