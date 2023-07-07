import { useState, useEffect } from "react";
import { Season9TeamComp } from "../type";
import { season9EarlyGameTeamCompData } from "../season9/season9Comp";
import axios from "axios";
import DisplayLateTeamComp from "./DisplayLateTeamComp";
import ChampionProfileDisplay from "./championProfileDisplay";

const DisplayEarlyTeamComps: React.FC = () => {
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
  const [clusterId, setClusterId] = useState(null);
  const [teamCompIDS, setTeamCompIDS] = useState<number[]>([]);
  const [filteredComps, setFilteredComps] = useState<any>();

  const toggleRowExpansion = async (index: any, comp: Season9TeamComp) => {
    if (expandedRow === index) {
      setExpandedRow(null);
    } else {
      setExpandedRow(index);

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
                results.overall.avg < 4.3
              ) {
                const earlyOptions = results.early_options[5] || [];
                const topThreeEarlyComps = earlyOptions.slice(0, 3);

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
        <div className="flex flex-row">
          <div className="w-24 px-4 py-2 text-2xl font-bold">Rank</div>
          <div className="px-4 py-2 text-2xl font-bold">
            Early Game Champions
          </div>
        </div>
        <div className="bg-[#f9f4ac]">
          {season9EarlyGameTeamCompData.map((comp, index) => (
            <div key={comp.name} className="border border-[#ffe187]">
              <div
                className="flex flex-row"
                onClick={() => toggleRowExpansion(index, comp)}
              >
                <div className="flex w-24 items-center justify-center px-4 py-2 text-2xl font-bold ">
                  {comp.name}
                </div>
                <div className="flex items-center px-4 py-2 pt-2">
                  <div className="flex flex-row space-x-2">
                    {comp.champions.map((champion, index) => (
                      <ChampionProfileDisplay
                        key={index}
                        champion={champion}
                        buildName={null}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {expandedRow === index && (
                <div>
                  <div className="border border-[#ffe187] p-4">
                    <DisplayLateTeamComp filteredComps={filteredComps} />
                  </div>
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
