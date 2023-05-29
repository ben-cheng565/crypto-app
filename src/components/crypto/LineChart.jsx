import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { Row, Typography } from "antd";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChart({ coinHistory, currentPrice, coinName }) {
  const data = useMemo(() => {
    const coinPrice = [];
    const coinTimestamps = [];

    coinHistory?.data?.history?.forEach((historyItem) => {
      coinPrice.push(historyItem.price);
      coinTimestamps.push(new Date(historyItem.timestamp).toLocaleDateString());
    });

    return {
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
  }, [coinHistory]);

  const options = useMemo(
    () => ({
      scales: {
        y: {
          ticks: {
            beginAtZero: true,
          },
        },
      },
    }),
    []
  );

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
