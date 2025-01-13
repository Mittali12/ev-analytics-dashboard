import React from "react";

interface OverviewProps {
    totalEVs: number;
    totalCounties: number;
    maxEVCounty: string;
}

const OverviewCards: React.FC<OverviewProps> = ({ totalEVs, totalCounties, maxEVCounty }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold">Total EVs</h2>
                <p className="text-2xl font-bold">{totalEVs}</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold">Total Counties</h2>
                <p className="text-2xl font-bold">{totalCounties}</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold">Most Common Make</h2>
                <p className="text-2xl font-bold">{maxEVCounty}</p>
            </div>
        </div>
    );
};

export default OverviewCards;
