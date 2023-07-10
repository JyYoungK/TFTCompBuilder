import { season9ChampionList } from "../../season9/season9Comp";
import { useState } from "react";
import { getMaximumCardCount } from "../Helper/HelperFunctions";
import { Modal } from "antd";
import DisplayItems from "../Items/DisplayItems";

interface ChampionProfileDisplayProps {
  champion: any;
  count: boolean;
  myUnitPool: any;
  setMyUnitPool: any;
  enemyUnitPool: any;
  displayType: string;
}

const ChampionProfileDisplay: React.FC<ChampionProfileDisplayProps> = ({
  champion,
  count,
  myUnitPool,
  setMyUnitPool,
  enemyUnitPool,
  displayType,
}) => {
  const getBorderColorClass = (championName: string, isModal: boolean) => {
    if (championName) {
      const championData = season9ChampionList.find(
        (champ) => champ.name.toLowerCase() === championName.toLowerCase()
      );

      if (championData) {
        if (isModal) {
          switch (championData.cost) {
            case 5:
              return "rgb(234 179 8)";
            case 4:
              return "rgb(168 85 247)";
            case 3:
              return "rgb(59 130 246)";
            case 2:
              return "rgb(34 197 94)";
            case 1:
              return "rgb(107 114 128)";
            default:
              return "";
          }
        } else {
          switch (championData.cost) {
            case 5:
              return "border-yellow-500";
            case 4:
              return "border-purple-500";
            case 3:
              return "border-blue-500";
            case 2:
              return "border-green-500";
            case 1:
              return "border-gray-500";
            default:
              return "";
          }
        }
      }
    }
  };

  const { name, cost } = champion;
  const maximumCount = getMaximumCardCount(cost);
  const myCount = myUnitPool?.filter((unit: string) => unit === name).length;

  const handleMyCountIncrement = () => {
    if (myCount < maximumCount) {
      setMyUnitPool((prevUnitPool: string[]) => [...prevUnitPool, name]);
    }
  };

  const borderColorClass = getBorderColorClass(name, false);
  const championProfileImageURL = (name: string) => {
    return `https://cdn.metatft.com/file/metatft/champions/tft9_${name.toLowerCase()}.png`;
  };

  const myUnitCount = myUnitPool
    ? myUnitPool.filter((unit: string) => unit === name).length
    : 0;
  const enemyUnitCount = enemyUnitPool
    ? enemyUnitPool.filter((unit: string) => unit === name).length
    : 0;
  const [modalVisible, setModalVisible] = useState(false);

  let imageBlendModeClass = ""; // Default image blend mode class

  if (enemyUnitCount === 1) {
    imageBlendModeClass = "blend-orange"; // Apply orangish color
  }

  return (
    <div key={name} className="relative">
      <div className="flex flex-row items-center">
        <div
          className={`relative ${imageBlendModeClass} rounded-md border-[5px] ${borderColorClass} `}
        >
          <img
            src={
              champion.name !== ""
                ? championProfileImageURL(name)
                : "/icons/NoChampion.png"
            }
            alt={name}
            className={`h-[64px] w-[64px] sm:h-12 sm:w-12 `}
            onClick={() => {
              if (displayType === "TeamCompDisplay") {
                setModalVisible(true);
              } else if (displayType === "LayoutUnitAvailability") {
                handleMyCountIncrement();
              }
            }}
            title={name}
          />
          {count && (
            <div className="absolute bottom-0.5 right-0.5 flex items-center justify-center rounded-md bg-black px-1 text-white">
              <span className="3xl:text-md text-xs font-bold">
                {myUnitCount}/{getMaximumCardCount(cost)}
              </span>
            </div>
          )}
        </div>
      </div>
      <Modal
        className="modalStyle"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        // title={name}
        footer={null} // Remove the footer buttons
        style={{
          backgroundColor: getBorderColorClass(name, true),
        }}
      >
        <DisplayItems
          name={name}
          championProfileImageURL={championProfileImageURL}
        />
      </Modal>
    </div>
  );
};

export default ChampionProfileDisplay;
