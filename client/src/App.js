import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Personal from "./pages/Personal";
import Cards from "./pages/Cards";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ResetPasswordModal from "./components/popups/ResetPasswordModal";
import { store } from "./store";
import { Provider } from "react-redux";
import AuthVerify from "./components/AuthVerify";

function App() {
  const [storeName, setStoreName] = useState("");

  const changeState = (storeData) => {
    setStoreName(storeData);
  }
  return (
    <Provider store={store}>
      <div className="App">
        <Header changeState={changeState} />
        <Routes>
          <Route index element={<Home />} />
          <Route path="personal" element={<Personal />} />
          <Route path="cards" element={<Cards />} />
          <Route path="/" element={<Home />}>
            <Route path="passwordReset" element={<ResetPasswordModal />} />
          </Route>

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
