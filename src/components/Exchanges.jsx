import React from "react";
import { Row, Table, Typography } from "antd";
import { millify } from "millify";

import { useGetCryptoExchangesQuery } from "../services/cryptoApi";

export default function Exchanges() {
  const { data, isLoading } = useGetCryptoExchangesQuery("razxDUgYGNAdQ");

  if (isLoading) return "Loading...";

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
    },
    {
      title: "Exchange",
      dataIndex: "exchange",
      key: "exchange",
      render: (key, item) => (
        <Row className="exchange-name-container">
          <img src={item.iconUrl} className="crypto-image" alt="coin" />
          <Typography.Title level={5} className="exchange-name">
            {item.name}
          </Typography.Title>
        </Row>
      ),
    },
    {
      title: "24h Trade Volumn",
      dataIndex: "24hVolume",
      key: "24hVolume",
      render: (key, item) => <>{millify(item["24hVolume"])}</>,
    },
    {
      title: "Markets",
      dataIndex: "numberOfMarkets",
      key: "numberOfMarkets",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  return <Table dataSource={data?.data?.exchanges} columns={columns} />;
}
