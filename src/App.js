import React from "react";
import { Routes, Route } from "react-router-dom";
import { Layout, Typography } from "antd";

import { Navbar, Homepage, Cryptos, CryptoDetail, News } from "./components";
import "./sass/app.scss";

const { Header, Footer, Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Navbar />

      <Content className="main-container">
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route path="/cryptos" element={<Cryptos />}></Route>
          <Route path="/crypto/:coinId" element={<CryptoDetail />}></Route>
          <Route path="/news" element={<News />}></Route>
        </Routes>
      </Content>

      <Footer>
        <Typography.Text>Cryptor @2022 - All rights reserved</Typography.Text>
      </Footer>
    </Layout>
  );
}
