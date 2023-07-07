import { season9ChampionList } from "../season9/season9Comp";

interface ChampionProfileDisplayProps {
  champion: any;
  buildName: any;
}

const ChampionProfileDisplay: React.FC<ChampionProfileDisplayProps> = ({
  champion,
  buildName,
}) => {
  const getBorderColorClass = (championName: string) => {
    const championData = season9ChampionList.find(
      (champ) => champ.name.toLowerCase() === championName.toLowerCase()
    );

    switch (championData?.cost) {
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
  };

  const { name } = champion;
  const borderColorClass = getBorderColorClass(name);
  const championProfileURL = `https://cdn.metatft.com/file/metatft/champions/tft9_${name.toLowerCase()}.png`;
  //   const getTextSizeClass = (name: string) => {
  //     return name.length >= 8 ? "text-sm" : "";
  //   };
  //   const textSizeClass = getTextSizeClass(name);

  return (
    <div>
      <div key={name} className="relative">
        <img
          src={championProfileURL}
          alt={name}
          className={`h-10 w-10 rounded-md border-[3.5px] 2xl:h-[69px] 2xl:w-[69px] ${borderColorClass}`}
        />
        <div className="absolute bottom-0.5 left-0 right-0 flex items-end justify-center ">
          {buildName &&
            buildName.map((itemName: string, index: number) => (
              <img
                key={index}
                src={`https://cdn.metatft.com/file/metatft/items/${itemName.toLowerCase()}.png`}
                alt={itemName}
                className="h-3 w-3 2xl:h-4 2xl:w-4"
              />
            ))}
        </div>
      </div>
      {/* <div
        className={`flex h-6 items-center justify-center text-center ${textSizeClass}`}
      >
        {name}
      </div> */}
    </div>
  );
};

export default ChampionProfileDisplay;
