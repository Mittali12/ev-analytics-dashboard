import { EVData } from "@/components/interface";

interface AggregatedEVData {
  city: string;
  totalEVCount: number;
  averagePrice: number;
  totalValue: number;
  topModel: string;
}

export const aggregateEVData = (data: EVData[]): AggregatedEVData[] => {
  const cityData: Record<string, { totalEVCount: number; totalPrice: number; models: Record<string, number> }> = {};

  data.forEach((ev) => {
    if (!cityData[ev.City]) {
      cityData[ev.City] = { totalEVCount: 0, totalPrice: 0, models: {} };
    }
    cityData[ev.City].totalEVCount += 1; 
    cityData[ev.City].totalPrice += ev.BaseMSRP;

    if (!cityData[ev.City].models[ev.Model]) {
      cityData[ev.City].models[ev.Model] = 0;
    }
    cityData[ev.City].models[ev.Model] += 1;
  });

  const aggregatedData = Object.keys(cityData).map((city) => {
    const models = cityData[city].models;
    const topModel = Object.keys(models).reduce((a, b) => (models[a] > models[b] ? a : b));

    return {
      city,
      totalEVCount: cityData[city].totalEVCount,
      averagePrice: cityData[city].totalPrice / cityData[city].totalEVCount,
      totalValue: cityData[city].totalPrice,
      topModel,
    };
  });
  return aggregatedData.sort((a, b) => b.totalEVCount - a.totalEVCount);
};
