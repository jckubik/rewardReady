import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import Personal from "./pages/Setting/Personal";
import Cards from "./pages/Setting/Cards";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import AddCard from "./components/AddCard";

import session from "./context/user";

function App() {
  const [user, setUser] = useState(null);

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
          <Route path="setting" element={<Setting />}>
            <Route path="personal" element={<Personal />} />
            <Route path="cards" element={<Cards />} />
          </Route>
        </Routes>
        {/* <AddCard /> */}
        <Footer />
      </div>
    </session.Provider>
  );
}

export default App;
