import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function BarChart(props) {
    const { labels, chartData, min, max, step, text } = props;

    const options = {
        responsive: true,
        scales: {
            y: {
                min: min,
                max: max,
                step: step,
            },
            x: {
                ticks: {
                    font: {
                        size: 10,
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: text,
            }
        },
        maintainAspectRatio: false,
    }

    const data = {
        labels: labels,
        datasets: [
            {
                backgroundColor: '#00bcd4',
                borderColor: '#00bcd4',
                borderWidth: 1,
                data: chartData,
            }
        ]
    }

    return (
        <Bar data={data} options={options} />
    )
}
