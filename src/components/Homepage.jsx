import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

export default function Homepage() {
  const { data, isFetching } = useGetCryptosQuery();

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={5}></Statistic>
          <Statistic title="Total Exchanges" value={5}></Statistic>
          <Statistic title="Total Market Cap" value={5}></Statistic>
          <Statistic title="Total 24h Volume" value={5}></Statistic>
          <Statistic title="Total Markets" value={5}></Statistic>
        </Col>
      </Row>
    </>
  );
}
