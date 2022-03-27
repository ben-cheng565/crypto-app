import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";

import { useGetNewsQuery } from "../services/newsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import moment from "moment";

const { Text, Title } = Typography;
const { Option } = Select;

export default function News({ simplified }) {
  const count = simplified ? 6 : 12;
  const [category, setCategory] = useState("Cryptocurrency");
  const { data: news } = useGetNewsQuery({
    category: category,
    count: count,
  });
  const { data } = useGetCryptosQuery(100);

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}

      {news?.value.map((item, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={5}>
                  {item.name}
                </Title>
                <img src={item?.image?.thumbnail?.contentUrl} alt="news" />
              </div>
              <p>
                {news.description > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={item.provider[0]?.image?.thumbnail?.contentUrl}
                    alt=""
                  />
                  <Text className="provider-name">
                    {item.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(item.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
