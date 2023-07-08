import React, { useState, useEffect, useRef } from "react";
import { Season9TeamComp } from "./type";
import HelpfulTool from "./components/HelpfulTool";
import AugmentRecommend from "./components/AugmentPanel/AugmentRecommend";
import UnitManagement from "./components/UnitPanel/UnitManagement";
import TeamSuggestion from "./components/TeamCompPanel/TeamSuggestion";
import "./App.css";

const App: React.FC = () => {
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault(); // Prevent the default context menu from showing up
    // Perform your custom right-click logic here
    console.log("Right-clicked!");
  };

  return (
    <div
      className="grid w-full grid-cols-3 grid-rows-5 justify-center text-center"
      onContextMenu={handleContextMenu}
    >
      <div className="row-span-5">
        <AugmentRecommend />
      </div>
      <div className="row-span-5">
        <UnitManagement />{" "}
      </div>

      <div className="row-span-5">
        <TeamSuggestion />{" "}
      </div>

      {/* <HelpfulTool /> */}
    </div>
  );
};

export default App;
