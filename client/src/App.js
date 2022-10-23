import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
// import LocateMe from "./Components/LocateMe";
import Home from "./pages/Home";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import AddCard from "./Components/AddCard";

function App() {
  const [apiResponse, setApiResponse] = useState();

  // function callAPI() {
  //   fetch("http://localhost:9000/testAPI", {
  //     mode: "no-cors",
  //     credentials: "same-origin",
  //   })
  //     .then((res) => res.text())
  //     .then((res) => setApiResponse(res));
  // }

  // useEffect(() => {
  //   callAPI();
  // });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <AddCard />
      <Footer />
    </div>
  );
}

export default App;
