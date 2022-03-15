import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography, Button } from "antd";

import icon from "../images/logo.png";

export default function Navbar() {
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="small" />
        <Typography.Title level={3} className="logo">
          <Link to="/">Cryptor</Link>
        </Typography.Title>
        <Button></Button>
      </div>
    </div>
  );
}
