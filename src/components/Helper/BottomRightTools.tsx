import { useState, useEffect, useRef } from "react";
import ItemTierList from "./ItemTierList";

interface BottomRightToolsProps {
  setMyUnitPool: any;
  setEnemyUnitPool: any;
}

const BottomRightTools: React.FC<BottomRightToolsProps> = ({
  setMyUnitPool,
  setEnemyUnitPool,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleMouseClick = () => {
      if (isModalOpen) {
        handleModalClose();
      }
    };

    document.addEventListener("mousedown", handleMouseClick);

    return () => {
      document.removeEventListener("mousedown", handleMouseClick);
    };
  }, [isModalOpen]);

  const resetPool = () => {
    setMyUnitPool([]);
    setEnemyUnitPool([]);
  };

  return (
    <div>
      <div className="fixed bottom-4 right-20">
        <img
          onClick={resetPool}
          src="/icons/ResetIcon.png"
          className="mb-1 h-14 w-14 hover:scale-[1.1]"
          alt="Reset Icon"
          title="Reset All Choices"
        />
      </div>
      <div className="fixed bottom-4 right-4">
        <img
          onClick={handleModalOpen}
          src="/icons/HelperIcon.png"
          className="h-16 w-16 hover:scale-[1.1]"
          alt="Helper Icon"
          title="Item/Augment Tips"
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg" ref={modalRef}>
            <ItemTierList />
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomRightTools;
