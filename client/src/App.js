import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
// import Setting from "./pages/Setting";
import Personal from "./pages/Personal";
import Cards from "./pages/Cards";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import AddCard from "./components/AddCard";

import session from "./context/user";

function App() {
  // const [apiResponse, setApiResponse] = useState();
  const [store, setStore] = useState({data:""});

  const changeState = (storeData) => {
    setStore(storeData);
  };

  return (
    <session.Provider
      value={{
        user,
        setUser,
      }}
    >
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="personal" element={<Personal />} />
          <Route path="cards" element={<Cards />} />
        </Routes>
        <Footer />
      </div>
    </session.Provider>
  );
}

export default App;
