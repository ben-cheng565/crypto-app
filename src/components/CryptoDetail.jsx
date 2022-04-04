import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { millify } from "millify";
import { Row, Col, Typography, Select } from "antd";
import HTMLReactParser from "html-react-parser";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
import CoinStat from "./widgets/CoinStat";

const { Title, Text } = Typography;
const { Option } = Select;

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

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails["24hVolume"] && millify(cryptoDetails["24hVolume"])
      }`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

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

        <Col className="stats-container">
          <Col>
            {stats.map((stat) => (
              <CoinStat key={stat.title} {...stat} />
            ))}
          </Col>

          <Col>
            {genericStats.map((stat) => (
              <CoinStat key={stat.title} {...stat} />
            ))}
          </Col>
        </Col>

        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />

        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <Title level={3} className="coin-details-heading">
              What is {cryptoDetails?.name}?
            </Title>
            {HTMLReactParser(cryptoDetails?.description)}
          </Row>

          <Col className="coin-links">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name} Links
            </Title>
            {cryptoDetails?.links.map((link) => (
              <Row className="coin-link" key={link.id}>
                <Title className="link-name" level={5}>
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </>
  );
}
