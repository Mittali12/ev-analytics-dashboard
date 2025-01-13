'use client';
import React, { useEffect, useState } from "react";
import { parseCsv } from "../utils/parseCsv";
import OverviewCards from "../components/OverviewCards";
import EVTrends from "../components/EVTrends";
import EVByCountryPie from "../components/EVByCountyPie";
import TopEVModelsBar from "../components/TopEVModelsBar";

import { EVData } from "@/components/interface";
import { aggregateEVData } from "@/utils/agreegatedEVData";
import EVDataSummaryTable from "@/components/EVDataSummaryTable";
import Pagination from "@/components/Pagination";


const Dashboard = () => {
  const [data, setData] = useState<EVData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalEVs, setTotalEVs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [aggregatedData, setAggregatedData] = useState<any[]>([]);
  const [totalCounties, setTotalCounties] = useState(0);
  const [mostCommonMake, setMostCommonMake] = useState("");

  const itemsPerPage = 10;



  const totalPages = Math.ceil(aggregatedData.length / itemsPerPage);
  const paginatedData = aggregatedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  const handlePageChange = (page: number) => {
    // Ensure the new page is within valid range
    console.log("page", page)
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await parseCsv("/data/ev-data.csv");
        const aggregated = aggregateEVData(csvData);
        setAggregatedData(aggregated);
        const evCounts = csvData.reduce<Record<string, number>>((acc, curr) => {
          acc[curr.County] = (acc[curr.County] || 0) + 1;
          return acc;
        }, {});

        const makeCounts = csvData.reduce<Record<string, number>>((acc, curr) => {
          acc[curr.Make] = (acc[curr.Make] || 0) + 1;
          return acc;
        }, {});

        setTotalEVs(csvData.length);
        setTotalCounties(Object.keys(evCounts).length);
        setMostCommonMake(
          Object.entries(makeCounts).reduce((a, b) => (a[1] > b[1] ? a : b))[0]
        );

        setData(csvData);
      } catch (error) {
        console.error("Error loading CSV:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center  text-lg">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">EV Analytics Dashboard</h1>
      </header>
      <main className="p-4">
        <OverviewCards
          totalEVs={totalEVs}
          totalCounties={totalCounties}
          maxEVCounty={mostCommonMake}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">EV Trends</h2>
            <EVTrends parsedData={data} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">EV Distribution by Country</h2>
            <EVByCountryPie data={data} />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Top EV Models by Count</h2>
            <TopEVModelsBar data={data} />
          </div>
        </div>
        <main className="p-4">
          <EVDataSummaryTable data={paginatedData} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </main>
      </main>
    </div>
  );
};

export default Dashboard;
