import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography, Button, Menu } from "antd";

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
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />

        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptor</Link>
        </Typography.Title>

        <Button
          type="link"
          className="menu-control-container"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {menuVisible && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptos">Cryptos</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
}
