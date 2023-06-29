import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
} from "react";
import { season9TeamCompData, season9ChampionList } from "./season9Comp";
import { Season9TeamComp, sortOrder } from "./type";
import "./App.css";

const MAX_CHAMPIONS = 3;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedChampions, setSelectedChampions] = useState<string[]>([]);
  const [recommendedChampions, setRecommendedChampions] = useState<string[]>(
    []
  );
  const [matchedTeamComps, setMatchedTeamComps] = useState<Season9TeamComp[]>(
    []
  );
  const [selectedFromDropdown, setSelectedFromDropdown] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        !selectedFromDropdown
      ) {
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [selectedFromDropdown]);

  useEffect(() => {
    const handleDropdownItemClick = () => {
      setSelectedFromDropdown(true);
    };

    document.addEventListener("mousedown", handleDropdownItemClick);

    return () => {
      document.removeEventListener("mousedown", handleDropdownItemClick);
    };
  }, []);

  const sortedMatchedTeamComps = matchedTeamComps
    .slice()
    .sort((compA, compB) => {
      const orderA = sortOrder[compA.speed] || Infinity;
      const orderB = sortOrder[compB.speed] || Infinity;
      return orderA - orderB;
    });

  const getMatchedTeamComps = (
    selectedChampions: string[]
  ): Season9TeamComp[] => {
    const matchedComps: Season9TeamComp[] = season9TeamCompData.filter((comp) =>
      selectedChampions.every((champion) =>
        comp.champions.some((c) => c.name === champion)
      )
    );
    return matchedComps;
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Filter the champion list based on the search term
    const filteredChampions = season9ChampionList.filter((champion) =>
      champion.toLowerCase().startsWith(value.toLowerCase())
    );

    // Set the recommended champions
    setRecommendedChampions(filteredChampions.slice(0, 5)); // Show up to 5 recommended champions
    setMatchedTeamComps(getMatchedTeamComps(selectedChampions)); // Update matched team comps based on search term
    setSelectedFromDropdown(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission

      if (recommendedChampions.length > 0) {
        handleAddChampion(recommendedChampions[0]);
      }
    }
  };

  const handleAddChampion = (champion: string) => {
    if (selectedChampions.length < MAX_CHAMPIONS && champion) {
      setSelectedChampions([...selectedChampions, champion]);
      setSearchTerm("");
      setRecommendedChampions([]);
      setMatchedTeamComps(
        getMatchedTeamComps([...selectedChampions, champion])
      );
    } else {
      alert("Cannot Add Anymore Champions");
    }
  };

  const handleRemoveChampion = (champion: string) => {
    const updatedChampions = selectedChampions.filter((c) => c !== champion);
    setSelectedChampions(updatedChampions);
    setSelectedFromDropdown(true);
    if (updatedChampions.length === 0) {
      setMatchedTeamComps([]); // Clear matched team comps if no champions selected
    } else {
      setMatchedTeamComps(getMatchedTeamComps(updatedChampions)); // Update matched team comps based on remaining selected champions
    }
  };

  return (
    <div className="flex flex-col justify-center text-center ">
      <div className="absolute right-8 top-5 flex flex-row items-center">
        <div className="text-3xl mr-4 font-bold"> SEASON 9 TFT BUILD GUIDE</div>
        <img src="/icons/Penguin.png" className="w-16 h-16 "></img>
      </div>
      <div className="flex flex-row text-center items-center">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Enter champion name"
          className="p-2 border-black border-2"
        />
        <button
          className="ml-2 text-green-50 bg-green-500 p-2 rounded-lg hover:bg-green-700"
          onClick={() => handleAddChampion(recommendedChampions[0])}
        >
          Add
        </button>
        <div className="ml-4 space-x-2 text-white ">
          {selectedChampions.map((champion) => (
            <span
              key={champion}
              className="champion-badge bg-gray-600 px-2 py-1 rounded-lg hover:bg-red-500"
              onClick={() => handleRemoveChampion(champion)}
            >
              {champion}
              <span className="ml-2 remove-icon">&#x2715;</span>
            </span>
          ))}
        </div>
      </div>
      <div className="relative">
        {searchTerm.length > 0 && (
          <div className="mt-4 absolute z-10 bg-white rounded-lg shadow-md py-2 px-4">
            {recommendedChampions.map((champion) => (
              <div
                className="hover:bg-slate-600 hover:text-white rounded-lg"
                key={champion}
                onClick={() => handleAddChampion(champion)}
              >
                {champion}
              </div>
            ))}
          </div>
        )}
      </div>
      <div>
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
                          src={`/items/${item}.png`}
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
    </div>
  );
};

export default App;
