import { EVData } from "@/components/interface";
import Papa from "papaparse";


export const parseCsv = async (filePath: string): Promise<EVData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (result) => {
        const rawData = result.data as Record<string, any>[];
        const formattedData: EVData[] = rawData.map((record) => {
          return {
            VIN: record["VIN (1-10)"] || "",
            County: record.County || "",
            City: record.City || "",
            State: record.State || "",
            PostalCode: record["Postal Code"] || "",
            ModelYear: parseInt(record["Model Year"]) || 0,
            Make: record.Make || "",
            Model: record.Model || "",
            ElectricVehicleType: record["Electric Vehicle Type"] || "",
            CAFVEligibility: record["Clean Alternative Fuel Vehicle (CAFV) Eligibility"] || "",
            ElectricRange: parseInt(record["Electric Range"]) || 0,
            BaseMSRP: parseFloat(record["Base MSRP"]) || 0,
            LegislativeDistrict: parseInt(record["Legislative District"]) || 0,
            DOLVehicleID: parseInt(record["DOL Vehicle ID"]) || 0,
            VehicleLocation: record["Vehicle Location"] || "",
            ElectricUtility: record["Electric Utility"] || "",
            CensusTract: record["2020 Census Tract"] || "",
          };
        });
        resolve(formattedData);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
