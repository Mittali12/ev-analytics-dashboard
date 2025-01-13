import React from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { EVData } from "./interface";


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

interface EVTrendsProps {
    parsedData: EVData[];
}

const EVTrends: React.FC<EVTrendsProps> = ({ parsedData }) => {
    const chartData = () => {
        const trends: { [key: number]: number } = {};

        parsedData.forEach((item) => {
            const year = item.ModelYear;
            trends[year] = (trends[year] || 0) + 1;
        });

        const labels = Object.keys(trends).map(Number).sort((a, b) => a - b);
        const counts = labels.map((year) => trends[year]);

        return {
            labels,
            datasets: [
                {
                    label: "EV Count by Model Year",
                    data: counts,
                    borderColor: "#4A90E2",
                    backgroundColor: "rgba(74, 144, 226, 0.5)",
                    fill: true,
                },
            ],
        };
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">EV Trends</h2>
            <Line
                data={chartData()}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: "top",
                        },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                        },
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "Model Year",
                                font: { weight: "bold" },
                            },
                            type: "category", 
                        },
                        y: {
                            title: {
                                display: true,
                                text: "Number of EVs",
                                font: { weight: "bold" },
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default EVTrends;
