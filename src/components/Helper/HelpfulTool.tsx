import { useState, useEffect, useRef } from "react";
import ItemTierList from "./ItemTierList";

function HelpfulTool() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleMouseClick = (event: MouseEvent) => {
      if (isModalOpen) {
        handleModalClose();
      }
    };

    document.addEventListener("mousedown", handleMouseClick);

    return () => {
      document.removeEventListener("mousedown", handleMouseClick);
    };
  }, [isModalOpen]);

  return (
    <div>
      <div className="fixed bottom-4 right-4">
        <img
          onClick={handleModalOpen}
          src="/icons/HelperIcon.png"
          className="h-16 w-16 hover:scale-[1.1]"
          alt="Helper Icon"
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
}

export default HelpfulTool;
