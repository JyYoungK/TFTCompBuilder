import React, { useEffect, useState } from "react";
import { AugmentData, AugmentUnit } from "../type";

function AugmentTierList() {
  const [augmentUnits, setAugmentUnits] = useState<AugmentData[]>([]);

  useEffect(() => {
    const fetchAugmentUnits = async () => {
      try {
        const response = await fetch(
          "https://api2.metatft.com/tft-stat-api/augment_units"
        );
        const responseData: { results: AugmentData[] } = await response.json();
        const data: AugmentData[] = responseData.results.slice(0, 400);
        setAugmentUnits(data);
      } catch (error) {
        console.error("Error fetching augment units:", error);
      }
    };

    fetchAugmentUnits();
  }, []);

  const getTopAugments = (data: AugmentData[]): AugmentUnit[] => {
    const augmentMap: { [key: string]: string[] } = {};

    data.forEach((item) => {
      if (augmentMap[item.augment]) {
        augmentMap[item.augment].push(item.unit);
      } else {
        augmentMap[item.augment] = [item.unit];
      }
    });

    const augmentUnits: AugmentUnit[] = Object.entries(augmentMap).map(
      ([augment, units]) => {
        const avgPlace =
          units
            .map(
              (unit) =>
                data.find((item) => item.unit === unit)?.places.avg_place || 0
            )
            .reduce((sum, avgPlace) => sum + avgPlace, 0) / units.length;

        return { augment, units, avgPlace };
      }
    );

    augmentUnits.sort((a, b) => a.avgPlace - b.avgPlace);

    return augmentUnits.slice(0, 20);
  };

  const topAugments = getTopAugments(augmentUnits);

  const getImageUrl = (itemName: string) => {
    console.log(itemName);
    return `https://cdn.metatft.com/file/metatft/champions/${itemName.toLowerCase()}.png`;
  };

  return (
    <div className="w-2/6 h-full ml-4 bg-amber-950 p-4">
      <h1 className="mb-8 text-3xl underline font-black text-blue-300">
        Top Augments
      </h1>
      <ul>
        {topAugments.map(
          (augment, index) =>
            augment.units.length > 5 && (
              <li key={index} className="text-xl text-white">
                <strong>Augment:</strong> {augment.augment}
                <br />
                <div className="grid 2xl:grid-cols-9 grid-cols-5">
                  {augment.units.map((championUrl) => (
                    <img
                      key={championUrl}
                      src={getImageUrl(championUrl)}
                      className="w-12 h-12"
                    />
                  ))}
                </div>
                <br />
                {/* <strong>Average Place:</strong> {augment.avgPlace} */}
              </li>
            )
        )}
      </ul>
    </div>
  );
}

export default AugmentTierList;
