import { season9ChampionList } from "../season9/season9Comp";

interface ChampionProfileDisplayProps {
  champion: any;
  buildName: any;
}

const ChampionProfileDisplay: React.FC<ChampionProfileDisplayProps> = ({
  champion,
  buildName,
}) => {
  console.log(champion);
  console.log(buildName);
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

  const getTextSizeClass = (name: string) => {
    return name.length >= 8 ? "text-sm" : "";
  };

  const { name } = champion;
  const borderColorClass = getBorderColorClass(name);
  const textSizeClass = getTextSizeClass(name);
  const championProfileURL = `https://cdn.metatft.com/file/metatft/champions/tft9_${name.toLowerCase()}.png`;

  return (
    <div key={name} className="relative flex flex-col">
      {buildName && (
        <div className="absolute bottom-0 left-0 flex">
          {buildName.map((itemName: string, index: number) => (
            <img
              key={index}
              src={`https://cdn.metatft.com/file/metatft/items/${itemName.toLowerCase()}.png`}
              alt={itemName}
              className="h-6 w-6"
            />
          ))}
        </div>
      )}
      <div
        className={`flex flex-col items-center border-2 ${borderColorClass}`}
      >
        <img src={championProfileURL} alt={name} className="h-16 w-16" />
      </div>
      <div className={`whitespace-nowrap ${textSizeClass}`}>{name}</div>
    </div>
  );
};

export default ChampionProfileDisplay;
