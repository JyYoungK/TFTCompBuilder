import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { season9TeamCompData, season9ChampionList } from "./season9Comp";
import { Season9TeamComp, ChampionDetails } from "./type";
import "./App.css";

const MAX_CHAMPIONS = 8;

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedChampions, setSelectedChampions] = useState<string[]>([]);
  const [recommendedChampions, setRecommendedChampions] = useState<string[]>(
    []
  );
  const [matchedTeamComps, setMatchedTeamComps] = useState<Season9TeamComp[]>(
    []
  );

  const getMatchedTeamComps = (championName: string): Season9TeamComp[] => {
    const lowercasedChampionName = championName.toLowerCase();
    const matchedComps: Season9TeamComp[] = season9TeamCompData.filter((comp) =>
      comp.champions.some((champion) =>
        champion.name.toLowerCase().includes(lowercasedChampionName)
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
    setMatchedTeamComps(getMatchedTeamComps(value)); // Update matched team comps based on search term
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
    if (selectedChampions.length < MAX_CHAMPIONS) {
      setSelectedChampions([...selectedChampions, champion]);
      setSearchTerm("");
      setRecommendedChampions([]);
    }
  };

  const handleRemoveChampion = (champion: string) => {
    const updatedChampions = selectedChampions.filter((c) => c !== champion);
    setSelectedChampions(updatedChampions);
    if (updatedChampions.length === 0) {
      setMatchedTeamComps([]); // Clear matched team comps if no champions selected
    } else {
      setMatchedTeamComps(getMatchedTeamComps(searchTerm)); // Update matched team comps based on remaining selected champions
    }
  };

  return (
    <div className="flex flex-col justify-center text-center">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Enter champion name"
          className="p-2 border-black border-2"
        />
        <button
          className="ml-2 text-green-50 bg-green-500 p-2 rounded-lg"
          onClick={() => handleAddChampion(recommendedChampions[0])}
        >
          Add
        </button>
      </div>
      <div className="mt-1 space-x-2">
        {selectedChampions.map((champion) => (
          <span
            key={champion}
            className="champion-badge"
            onClick={() => handleRemoveChampion(champion)}
          >
            {champion}
            <span className="remove-icon">&#x2715;</span>
          </span>
        ))}
      </div>
      <div>
        {searchTerm.length > 0 &&
          recommendedChampions.map((champion) => (
            <div key={champion} onClick={() => handleAddChampion(champion)}>
              {champion}
            </div>
          ))}
      </div>
      <div>
        {matchedTeamComps.map((comp) => (
          <div key={comp.name} className="flex flex-col mt-5">
            <div className="flex flex-row space-x-2 justify-between mb-2 font-black text-2xl">
              <h2 className="">{comp.name}</h2>
              {/* <p>Tier: {comp.tier}</p> */}
              <p>{comp.speed}</p>
              {/* <p>Win: {comp.win}</p>
              <p>Loss: {comp.loss}</p>
              <p>Win Rate: {comp.win / (comp.win + comp.loss)}</p> */}
            </div>
            <ul className="flex flex-row space-x-2 justify-center">
              {comp.champions.map((champion) => (
                // <li key={champion.name}>{champion.name}</li>
                <img
                  className="w-16 h-16"
                  key={champion.name}
                  src={champion.imageUrl}
                  alt={champion.name}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
