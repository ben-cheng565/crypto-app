import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography, Menu, Layout } from "antd";

import icon from "../images/logo.png";
import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";

export default function Navbar() {
  const [menuVisible, setMenuVisible] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setMenuVisible(false);
    } else {
      setMenuVisible(true);
    }
  }, [screenSize]);

  return (
    <Layout.Header className="header">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={3} className="logo">
          <Link to="/">Cryptor</Link>
        </Typography.Title>
      </div>

      <Menu
        mode="horizontal"
        theme="dark"
        defaultSelectedKeys={["1"]}
        style={{ flex: "auto" }}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FundOutlined />}>
          <Link to="/cryptos">Cryptos</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}
