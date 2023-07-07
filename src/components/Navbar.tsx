import { useState, ChangeEvent, KeyboardEvent } from "react";
import { season9ChampionList } from "../season9/season9Comp";
import { Season9TeamComp } from "../type";

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setMatchedTeamComps: React.Dispatch<React.SetStateAction<Season9TeamComp[]>>;
  setSelectedFromDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

const Navbar: React.FC<NavbarProps> = ({
  searchTerm,
  setSearchTerm,
  setMatchedTeamComps,
  setSelectedFromDropdown,
  searchInputRef,
}) => {
  const [selectedChampions, setSelectedChampions] = useState<string[]>([]);
  const [recommendedChampions, setRecommendedChampions] = useState<string[]>(
    []
  );
  const MAX_CHAMPIONS = 3;

  // const getMatchedTeamComps = (
  //   selectedChampions: string[]
  // ): Season9TeamComp[] => {
  //   const matchedComps: Season9TeamComp[] = season9LateGameTeamCompData.filter(
  //     (comp) =>
  //       selectedChampions.every((champion) =>
  //         comp.champions.some((c) => c.name === champion)
  //       )
  //   );
  //   return matchedComps;
  // };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchTerm(value);

    // Filter the champion list based on the search term
    const filteredChampions = season9ChampionList.filter((champion) =>
      champion.name.toLowerCase().startsWith(value.toLowerCase())
    );

    // Convert filtered champions to an array of strings
    const recommendedChampions = filteredChampions
      .slice(0, 5)
      .map((champion) => champion.name);

    // Set the recommended champions
    setRecommendedChampions(recommendedChampions); // Show up to 5 recommended champions
    // setMatchedTeamComps(getMatchedTeamComps(selectedChampions)); // Update matched team comps based on search term
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
      // setMatchedTeamComps(
      //   getMatchedTeamComps([...selectedChampions, champion])
      // );
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
    }
    // else {
    //   setMatchedTeamComps(getMatchedTeamComps(updatedChampions)); // Update matched team comps based on remaining selected champions
    // }
  };

  return (
    <div>
      <div className="absolute right-8 top-5 flex flex-row items-center">
        <div className="mr-4 text-3xl font-bold text-green-500">
          SEASON 9 TFT CHEATSHEET
        </div>
        <img src="/icons/Penguin.png" className="h-16 w-16 "></img>
      </div>
      {/* <div className="flex flex-row items-center text-center">
        <input
          ref={searchInputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Enter champion name"
          className="border-2 border-black p-2"
        />
        <button
          className="ml-2 rounded-lg bg-green-500 p-2 text-green-50 hover:bg-green-700"
          onClick={() => handleAddChampion(recommendedChampions[0])}
        >
          Add
        </button>
        <div className="ml-4 space-x-2 text-white ">
          {selectedChampions.map((champion) => (
            <span
              key={champion}
              className="champion-badge rounded-lg bg-gray-600 px-2 py-1 hover:bg-red-500"
              onClick={() => handleRemoveChampion(champion)}
            >
              {champion}
              <span className="remove-icon ml-2">&#x2715;</span>
            </span>
          ))}
        </div>
      </div> */}
      <div className="relative">
        {searchTerm.length > 0 && (
          <div className="absolute z-10 mt-4 rounded-lg bg-white px-4 py-2 shadow-md">
            {recommendedChampions.map((champion) => (
              <div
                className="rounded-lg hover:bg-slate-600 hover:text-white"
                key={champion}
                onClick={() => handleAddChampion(champion)}
              >
                {champion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
