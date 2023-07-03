import { useState, useEffect } from "react";
import { Item, ItemCategory, ItemCategoryRow } from "../type";

function ItemTierList() {
  const [itemCategoryRows, setItemCategoryRows] = useState<ItemCategoryRow[]>(
    []
  );

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(
          "https://api2.metatft.com/tft-comps-api/unit_items"
        );
        const data = await response.json();
        const normalItems: Item[] = [];
        const radiantItems: Item[] = [];
        const ornnItems: Item[] = [];
        const heimerUpgrade: Item[] = [];

        console.log(data);

        data.results.slice(0, 140).forEach((item: Item) => {
          if (
            item.hasOwnProperty("itemName") &&
            !item.itemName.includes("Emblem") &&
            !item.itemName.includes("Piltover")
          ) {
            if (item.itemName.includes("Radiant")) {
              radiantItems.push(item);
            } else if (item.itemName.includes("Ornn")) {
              ornnItems.push(item);
            } else if (item.itemName.includes("HeimerUpgrade")) {
              heimerUpgrade.push(item);
            } else {
              normalItems.push(item);
            }
          }
        });

        normalItems.sort((a, b) => b.place - a.place);
        normalItems.splice(-10); // Remove the unnecessray last 10 items
        radiantItems.sort((a, b) => b.place - a.place);
        ornnItems.sort((a, b) => b.place - a.place);

        const categoryRowsData: ItemCategoryRow[] = [
          {
            rowName: "Normal Items",
            categories: [
              {
                categoryName: "Good",
                items: normalItems.slice(0, Math.floor(normalItems.length / 3)),
              },
              {
                categoryName: "Normal",
                items: normalItems.slice(
                  Math.floor(normalItems.length / 3),
                  2 * Math.floor(normalItems.length / 3)
                ),
              },
              {
                categoryName: "Bad",
                items: normalItems.slice(
                  2 * Math.floor(normalItems.length / 3)
                ),
              },
              {
                categoryName: "Heimer Upgrade",
                items: heimerUpgrade,
              },
            ],
          },
          {
            rowName: "Radiant Items",
            categories: [
              {
                categoryName: "Good",
                items: radiantItems.slice(
                  0,
                  Math.floor(radiantItems.length / 3)
                ),
              },
              {
                categoryName: "Normal",
                items: radiantItems.slice(
                  Math.floor(radiantItems.length / 3),
                  2 * Math.floor(radiantItems.length / 3)
                ),
              },
              {
                categoryName: "Bad",
                items: radiantItems.slice(
                  2 * Math.floor(radiantItems.length / 3)
                ),
              },
            ],
          },
          {
            rowName: "Ornn Items",
            categories: [
              {
                categoryName: "Good",
                items: ornnItems.slice(0, Math.floor(ornnItems.length / 3)),
              },
              {
                categoryName: "Normal",
                items: ornnItems.slice(
                  Math.floor(ornnItems.length / 3),
                  2 * Math.floor(ornnItems.length / 3)
                ),
              },
              {
                categoryName: "Bad",
                items: ornnItems.slice(2 * Math.floor(ornnItems.length / 3)),
              },
            ],
          },
        ];

        setItemCategoryRows(categoryRowsData);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchItemData();
  }, []);

  const getImageUrl = (itemName: string) => {
    return `https://cdn.metatft.com/file/metatft/items/${itemName.toLowerCase()}.png`;
  };

  return (
    <div className="ml-4 w-2/6 h-full">
      {itemCategoryRows.map((row: ItemCategoryRow) => (
        <div
          key={row.rowName}
          className={
            row.rowName === "Radiant Items"
              ? "bg-orange-500 text-yellow-300 p-4 text-2xl font-black border-yellow-300 border-4"
              : row.rowName === "Ornn Items"
              ? "bg-blue-950 text-red-400 p-4 text-2xl font-black border-red-400 border-4"
              : "bg-gray-500 text-white p-4 text-2xl font-black border-black border-4"
          }
        >
          <h2 className="mb-8 text-3xl underline">{row.rowName}</h2>
          {row.categories.map((category: ItemCategory) => (
            <div key={category.categoryName}>
              <h3 className="flex justify-start pl-2">
                {category.categoryName}
              </h3>
              <ul className="grid 2xl:grid-cols-9 grid-cols-5">
                {category.items.map((item: Item) => (
                  <li key={item.itemName} className="p-2">
                    <img
                      src={getImageUrl(item.itemName)}
                      alt={item.itemName}
                      className="w-12 h-12"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ItemTierList;
