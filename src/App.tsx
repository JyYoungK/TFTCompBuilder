import React, { useState, useEffect, useRef } from "react";
import { Season9TeamComp } from "./type";
import "./App.css";
import Navbar from "./components/Navbar";
import ItemTierList from "./components/ItemTierList";
import AugmentTierList from "./components/AugmentTierList";
import DisplayEarlyTeamComps from "./components/DisplayEarlyTeamComps";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  return (
    <div className="flex w-full flex-col justify-center text-center ">
      {/* <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setMatchedTeamComps={setMatchedTeamComps}
        setSelectedFromDropdown={setSelectedFromDropdown}
        searchInputRef={searchInputRef}
      /> */}
      <div className="mt-5 flex flex-row">
        <DisplayEarlyTeamComps />
        {/* <DisplayTeamComps matchedTeamComps={matchedTeamComps} />
        <AugmentTierList />
        <ItemTierList /> */}
      </div>
    </div>
  );
};

export default App;
