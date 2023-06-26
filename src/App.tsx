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

  const getMatchedTeamComps = (champions: string[]): Season9TeamComp[] => {
    const matchedComps: Season9TeamComp[] = season9TeamCompData.filter((comp) =>
      champions.every((champion) =>
        comp.champions.some(
          (c) => c.name.toLowerCase() === champion.toLowerCase()
        )
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
    setRecommendedChampions(filteredChampions.slice(0, 5)); // Show up to 2 recommended champions
    setMatchedTeamComps(getMatchedTeamComps(filteredChampions));
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
    if (recommendedChampions.length === 0) {
      setMatchedTeamComps([]);
    } else {
      setMatchedTeamComps(getMatchedTeamComps(updatedChampions));
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
        />
        <button onClick={() => handleAddChampion(recommendedChampions[0])}>
          Add
        </button>
      </div>
      <div>
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
            <div className="flex flex-row space-x-2 justify-center">
              <h2>{comp.name}</h2>
              <p>Tier: {comp.tier}</p>
              <p>Speed: {comp.speed}</p>
              <p>Win: {comp.win}</p>
              <p>Loss: {comp.loss}</p>
              <p>Win Rate: {comp.win / (comp.win + comp.loss)}</p>
            </div>
            <ul className="flex flex-row space-x-2 justify-center">
              {comp.champions.map((champion) => (
                <li key={champion.name}>{champion.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
