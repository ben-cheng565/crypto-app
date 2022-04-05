import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Select, Tabs } from "antd";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

import { Exchanges, WikiInfo, Overview } from ".";

const { Title } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

export default function CryptoDetail() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data, isLoading } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  if (isLoading) return "Loading...";
  const cryptoDetails = data?.data?.coin;

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  return (
    <>
      <Col className="coin-detail-container">
        <Row className="coin-heading-container">
          <img
            src={cryptoDetails?.iconUrl}
            className="crypto-image"
            alt="coin"
          />
          <Title level={2} className="coin-name">
            {cryptoDetails?.name} ({cryptoDetails?.symbol})
          </Title>
        </Row>

        <Tabs defaultActiveKey="1">
          <TabPane tab="Overview" key="1">
            <Overview cryptoDetails={cryptoDetails} coinHistory={coinHistory} />
          </TabPane>
          <TabPane tab="Exchanges" key="2">
            <Exchanges coinId={coinId} />
          </TabPane>
          <TabPane tab="Crypto Wiki" key="3">
            <WikiInfo cryptoDetails={cryptoDetails} />
          </TabPane>
        </Tabs>
      </Col>
    </>
  );
}
