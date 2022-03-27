import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic, Card } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptos, News } from "../components";

const { Title } = Typography;

export default function Homepage() {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Title level={3} className="heading">
        Global Crypto Stats
      </Title>
      <Card>
        <Row>
          <Col span={12}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats?.total}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats?.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats?.totalMarketCap)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24h Volume"
              value={millify(globalStats?.total24hVolume)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Markets"
              value={millify(globalStats?.totalMarkets)}
            />
          </Col>
        </Row>
      </Card>
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Top 10 Cryptos
        </Title>
        <Title level={5} className="show-more">
          <Link to="/cryptos">Show more</Link>
        </Title>
      </div>
      <Cryptos simplified />
      <div className="home-heading-container">
        <Title level={3} className="home-title">
          Latest Crypto News
        </Title>
        <Title level={5} className="show-more">
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
}
