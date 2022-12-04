import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Wallet from "./pages/Wallet";
import History from "./pages/History";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Favorites from "./pages/Favorites";
import CouponDealDetail from "./components/popups/CouponDealDetail";
import ResetPasswordModal from "./components/popups/ResetPasswordModal";
import Faq from "./pages/FAQ";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthVerify from "./components/AuthVerify";
import Search from "./pages/Search";
import CouponDealDetail from "./components/popups/CouponDealDetail";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="personal" element={<Personal />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="history" element={<History />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="/" element={<Home />}>
            <Route path="passwordReset" element={<ResetPasswordModal />} />
            <Route path="homeDetailView" element={<CouponDealDetail />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
        {/* <LocateMe data={store.data} changeState={changeState} /> */}
        {/* <RecommendDisplay store={store.data}/> */}
        <Footer />
      </div>
      <AuthVerify />
    </Provider>
  );
}

export default App;
