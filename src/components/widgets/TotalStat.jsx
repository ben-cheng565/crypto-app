import React from "react";
import { Col, Statistic } from "antd";

export default function TotalStat({ title, value }) {
  return (
    <Col span={12}>
      <Statistic title={title} value={value} />
    </Col>
  );
}
