import { useEffect, useState } from "react";
import { Season9TeamComp, EarlyOptions, EarlyTeamComp } from "./type";
import HelpfulTool from "./components/Helper/HelpfulTool";
import axios from "axios";
import UnitAvailability from "./components/UnitPanel/UnitAvailability";
import DisplayTeamComps from "./components/TeamCompPanel/DisplayTeamComps";
import "./App.css";

const App: React.FC = () => {
  const [clusterId, setClusterId] = useState<number | null>(null);
  const [teamCompIDS, setTeamCompIDS] = useState<number[]>([]);
  const [earlyOptions, setEarlyOptions] = useState<EarlyOptions>({
    4: [],
    5: [],
    6: [],
    7: [],
  });
  const [myUnitPool, setMyUnitPool] = useState<String[]>([]);

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

  useEffect(() => {
    fetchEarlyOptions();
  }, [teamCompIDS, clusterId]);

  const fetchEarlyOptions = async () => {
    if (teamCompIDS.length > 0 && clusterId) {
      try {
        const earlyOptions: EarlyOptions = {
          4: [],
          5: [],
          6: [],
          7: [],
        };

        for (const compID of teamCompIDS) {
          const response = await axios.get(
            `https://api2.metatft.com/tft-comps-api/comp_details?comp=${compID}&cluster_id=${clusterId}`
          );
          const { results } = response.data;
          const earlyOptionsData = results?.early_options;

          if (earlyOptionsData) {
            earlyOptions[4].push(...(earlyOptionsData[4]?.slice(0, 3) || []));
            earlyOptions[5].push(...(earlyOptionsData[5]?.slice(0, 3) || []));
            earlyOptions[6].push(...(earlyOptionsData[6]?.slice(0, 3) || []));
            earlyOptions[7].push(...(earlyOptionsData[7]?.slice(0, 3) || []));
          }
        }

        setEarlyOptions(earlyOptions);
      } catch (error) {
        console.log("Error fetching early options:", error);
      }
    }
  };

  return (
    <div className="grid w-full grid-cols-2 justify-center p-2 text-center">
      <UnitAvailability myUnitPool={myUnitPool} setMyUnitPool={setMyUnitPool} />
      <DisplayTeamComps
        myUnitPool={myUnitPool}
        setMyUnitPool={setMyUnitPool}
        earlyOptions={earlyOptions}
      />

      {/* <HelpfulTool /> */}
    </div>
  );
};

export default App;
