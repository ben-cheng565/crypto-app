import React from "react";
import { Col, Typography } from "antd";

export default function CoinStat({ icon, title, value }) {
  return (
    <Col className="coin-stats">
      <Col className="coin-stats-name">
        <Typography.Text>{icon}</Typography.Text>
        <Typography.Text>{title}</Typography.Text>
      </Col>
      <Typography.Text className="stats">{value}</Typography.Text>
    </Col>
  );
}
