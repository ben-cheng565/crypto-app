import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

const { Title } = Typography;

export default function Homepage() {
  const { data, isFetching } = useGetCryptosQuery();
  const globalStats = data?.data?.stats;

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          />
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
    </>
  );
}
