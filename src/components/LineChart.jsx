import React from "react";
import { Line } from "react-chartjs-2";
import { Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ coinHistory, currentPrice, coinName }) {
  const coinPrice = [];
  const coinTimestamps = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
    coinPrice.push(coinHistory?.data?.history[i]?.price);
    coinTimestamps.push(
      new Date(coinHistory?.data?.history[i]?.timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamps,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };
  const options = { scales: { y: { ticks: { beginAtZero: true } } } };

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={3} className="chart-title">
          {coinName} Price Chart
        </Typography.Title>
      </Row>
      <Line data={data} options={options} />
    </>
  );
}
