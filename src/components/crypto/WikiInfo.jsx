import React from "react";
import { Row, Col, Typography } from "antd";
import HTMLReactParser from "html-react-parser";

const { Title } = Typography;

export default function WikiInfo({ cryptoDetails }) {
  return (
    <Col className="coin-desc-link">
      <Row className="coin-desc">
        <Title level={3} className="coin-details-heading">
          About {cryptoDetails?.name}
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
  );
}
