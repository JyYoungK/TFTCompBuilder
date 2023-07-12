import { useEffect, useState } from "react";
import axios from "axios";
import { formatString } from "../Helper/HelperFunctions";
import { season9ChampionList } from "../../season9/season9Comp";
import { getTraitsUrl, getItemDataURL, getImageUrl } from "../Helper/apiFetch";

interface Item {
  itemName: string;
  places: number[];
}

interface ProcessedItems {
  topNormalItems: Item[];
  topRadiantItems: Item[];
  topOrnnItems: Item[];
  topShimmerscaleItems: Item[];
  topEmblemItems: Item[];
}

interface DisplayDetailsProps {
  name: string;
  championProfileImageURL: any;
}

const DisplayDetails: React.FC<DisplayDetailsProps> = ({
  name,
  championProfileImageURL,
}) => {
  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get<{
          items: Item[];
        }>(getItemDataURL(name));

        const { items } = response.data;
        const processedItems = processItems(items);
        setItemData(processedItems);
      } catch (error) {
        console.error("Failed to fetch item data:", error);
      }
    };

    fetchItemData();
  }, []);

  const [itemData, setItemData] = useState<ProcessedItems>({
    topNormalItems: [],
    topRadiantItems: [],
    topOrnnItems: [],
    topShimmerscaleItems: [],
    topEmblemItems: [],
  });

  const processItems = (items: Item[]): ProcessedItems => {
    const categorizedItems: Record<string, Item[]> = {
      Normal: [],
      Radiant: [],
      Ornn: [],
      Shimmerscale: [],
      Emblem: [],
    };

    items.forEach((item) => {
      const { itemName, places } = item;

      const category = itemName.includes("Radiant")
        ? "Radiant"
        : itemName.includes("Ornn")
        ? "Ornn"
        : itemName.includes("Shimmerscale")
        ? "Shimmerscale"
        : itemName.includes("Emblem")
        ? "Emblem"
        : "Normal";

      categorizedItems[category].push({ itemName, places });
    });

    const sortItemsByAverage = (items: Item[]) => {
      return items.sort((a, b) => {
        const avgA =
          a.places.reduce((sum, value) => sum + value, 0) / a.places.length;
        const avgB =
          b.places.reduce((sum, value) => sum + value, 0) / b.places.length;
        return avgB - avgA;
      });
    };

    const topNormalItems = sortItemsByAverage(categorizedItems.Normal).slice(
      0,
      5
    );
    const topRadiantItems = sortItemsByAverage(categorizedItems.Radiant).slice(
      0,
      5
    );
    const topOrnnItems = sortItemsByAverage(categorizedItems.Ornn).slice(0, 5);
    const topShimmerscaleItems = sortItemsByAverage(
      categorizedItems.Shimmerscale
    ).slice(0, 5);
    const topEmblemItems = sortItemsByAverage(categorizedItems.Emblem).slice(
      0,
      5
    );

    return {
      topNormalItems,
      topRadiantItems,
      topOrnnItems,
      topShimmerscaleItems,
      topEmblemItems,
    };
  };

  const findTraitsByName = (championName: string) => {
    const champion = season9ChampionList.find(
      (champion) => champion.name === championName
    );
    return champion ? champion.traits : [];
  };

  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-4  sm:grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <img
            src={
              name !== ""
                ? championProfileImageURL(name)
                : "/icons/NoChampion.png"
            }
            alt={name}
            className="h-48 w-48 rounded-md object-cover brightness-125 sm:h-80 sm:w-80	"
          />
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
        <div className="flex flex-col">
          {Object.entries(itemData).map(([category, items]) => {
            if (items.length > 0) {
              let categoryName = "";

              switch (category) {
                case "topNormalItems":
                  categoryName = "Top Normal";
                  break;
                case "topRadiantItems":
                  categoryName = "Top Radiant";
                  break;
                case "topOrnnItems":
                  categoryName = "Top Ornn";
                  break;
                case "topShimmerscaleItems":
                  categoryName = "Top Shimmerscale";
                  break;
                case "topEmblemItems":
                  categoryName = "Top Emblem";
                  break;
                default:
                  categoryName = category;
              }

              return (
                <div key={category} className="my-2 text-center">
                  <h2 className="text-md mb-1 font-bold">
                    {categoryName} Item Choices
                  </h2>
                  <ul className="flex flex-row justify-center space-x-2 ">
                    {items.map((item: any, index: number) => (
                      <li key={index}>
                        <img
                          src={getImageUrl(item.itemName)}
                          alt={item.itemName}
                          className="h-8 w-8 2xl:h-10 2xl:w-10"
                          title={formatString(item.itemName, 9)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="mt-1 flex flex-row items-center space-x-2">
          {findTraitsByName(name).map((trait, index) => (
            <div key={index} className="flex flex-row space-x-1">
              <img
                src={getTraitsUrl(trait)}
                alt={trait}
                className="h-8 w-8 bg-gray-700 p-1"
              />
              <div className="text-md flex items-center font-bold">{trait}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayDetails;
