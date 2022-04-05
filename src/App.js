import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import { Navbar, Homepage, Cryptos, CryptoDetail, News } from "./components";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />}></Route>
              <Route path="/cryptos" element={<Cryptos />}></Route>
              <Route path="/crypto/:coinId" element={<CryptoDetail />}></Route>
              <Route path="/news" element={<News />}></Route>
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptor @2022 - All rights reserved
          </Typography.Title>
        </div>
      </div>
    </div>
  );
}
