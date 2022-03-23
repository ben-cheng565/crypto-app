import React, { useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import { Row, Col, Card } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";

export default function Cryptos({ simplified }) {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  // const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const cryptos = cryptosList?.data?.coins;

  if (isFetching) {
    return "Loading...";
  }
  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col key={crypto.uuid} xs={24} sm={12} lg={6} className="crypto-card">
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={<img className="crypto-image" src={crypto.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
