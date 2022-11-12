import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Cards from "./pages/Cards";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import AddCard from "./components/AddCard";
import { store } from "./store";
import { Provider, useDispatch } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="personal" element={<Personal />} />
          <Route path="cards" element={<Cards />} />
          <Route path="/" element={<Home />} />
        </Routes>
        {/* <LocateMe data={store.data} changeState={changeState} /> */}
        {/* <RecommendDisplay store={store.data}/> */}
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
