import React from "react";
import { Bar } from "react-chartjs-2"
    ; import { Chart, BarElement } from 'chart.js';

Chart.register(BarElement);

import { EVData } from "@/components/interface";

interface Props {
    data: EVData[];
}

const TopEVModelsBar: React.FC<Props> = ({ data }) => {
    // Count EV models
    const modelCounts = data.reduce<Record<string, number>>((acc, curr) => {
        acc[curr.Model] = (acc[curr.Model] || 0) + 1;
        return acc;
    }, {});

    // Sort and get top 5 models
    const topModels = Object.entries(modelCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const chartData = {
        labels: topModels.map(([model]) => model),
        datasets: [
            {
                label: "Count",
                data: topModels.map(([, count]) => count),
                backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0", "#FFC107"],
            },
        ],
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">EV Top Models</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: true },
                    },
                    scales: {
                        x: { title: { display: true, text: "EV Models" } },
                        y: { title: { display: true, text: "Count" }, beginAtZero: true },
                    },
                }}
            />
        </div>
    );
};

export default TopEVModelsBar;
