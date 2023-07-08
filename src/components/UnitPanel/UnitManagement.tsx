import React from "react";
import UnitDisplay from "./UnitDisplay";
import EnemyUnits from "./EnemyUnits";
import MyUnits from "./MyUnits";

function UnitManagement() {
  return (
    <div className="h-full w-full border-2 border-red-400">
      <div className="h-1/2 w-full">
        <UnitDisplay />
      </div>
      <div className="h-1/4 w-full">
        <EnemyUnits />
      </div>
      <div className="h-1/4 w-full">
        <MyUnits />
      </div>
    </div>
  );
}

export default UnitManagement;
