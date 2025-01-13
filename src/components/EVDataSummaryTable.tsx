import React from "react";

interface AggregatedEVData {
    city: string;
    totalEVCount: number;
    averagePrice: number;
    totalValue: number;
    topModel: string;
}

interface EVDataSummaryTableProps {
    data: AggregatedEVData[];
}

const EVDataSummaryTable: React.FC<EVDataSummaryTableProps> = ({ data }) => {
    return (
        <div className="overflow-x-auto shadow-md rounded-lg border bg-white">
            <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-left">City</th>
                        <th className="px-4 py-2 text-left">Total EVs</th>
                        <th className="px-4 py-2 text-left">Average Price</th>
                        <th className="px-4 py-2 text-left">Total Value</th>
                        <th className="px-4 py-2 text-left">Top Model</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry, index) => (
                        <tr key={index} className="border-b">
                            <td className="px-4 py-2">{entry.city}</td>
                            <td className="px-4 py-2">{entry.totalEVCount}</td>
                            <td className="px-4 py-2">{entry.averagePrice.toFixed(2)}</td>
                            <td className="px-4 py-2">{entry.totalValue.toFixed(2)}</td>
                            <td className="px-4 py-2">{entry.topModel}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EVDataSummaryTable;
