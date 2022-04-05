import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Typography, Row, Col, Statistic, Card } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptos, News, TotalStat } from ".";

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
          <TotalStat
            title="Total Cryptos"
            value={millify(globalStats?.total)}
          />
          <TotalStat
            title="Total Exchanges"
            value={millify(globalStats?.totalExchanges)}
          />
          <TotalStat
            title="Total Market Cap"
            value={millify(globalStats?.totalMarketCap)}
          />
          <TotalStat
            title="Total 24h Volume"
            value={millify(globalStats?.total24hVolume)}
          />
          <TotalStat
            title="Total Markets"
            value={millify(globalStats?.totalMarkets)}
          />
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
