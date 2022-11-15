import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Cards from "./pages/Cards";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthVerify from "./components/AuthVerify";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="personal" element={<Personal />} />
          <Route path="cards" element={<Cards />} />
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
