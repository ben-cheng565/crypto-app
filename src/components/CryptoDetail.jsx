import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Typography, Tabs } from "antd";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { Exchanges, WikiInfo, Overview } from ".";
import Loader from "./Loader";

const { Title } = Typography;
const { TabPane } = Tabs;

export default function CryptoDetail() {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const { data, isLoading } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });

  if (isLoading) return <Loader />;

  const cryptoDetails = data?.data?.coin;

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
