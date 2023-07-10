import { useState } from "react";

interface UnitCountManagerProps {
  champion: any;
  setEnemyUnitPool: any;
}

const UnitCountManager: React.FC<UnitCountManagerProps> = ({
  champion,
  setEnemyUnitPool,
}) => {
  const { name } = champion;
  const [filterActive, setFilterActive] = useState(false);

  const handleFilter = () => {
    if (filterActive) {
      setEnemyUnitPool((prevUnitPool: string[]) =>
        prevUnitPool.filter((unit: string) => unit !== name)
      );
    } else {
      setEnemyUnitPool((prevUnitPool: string[]) => [...prevUnitPool, name]);
    }

    setFilterActive((prevFilterActive) => !prevFilterActive);
  };

  return (
    <div className="rounded-md border-[4px] border-white ">
      <div
        className={`flex h-[64px] w-[64px] items-center justify-center  font-bold sm:h-12 sm:w-12 ${
          filterActive ? "bg-green-400 text-xs" : "bg-red-400 text-sm"
        }`}
        onClick={handleFilter}
      >
        {filterActive ? "Include" : "Filter"}
      </div>
    </div>
  );
};

export default UnitCountManager;
