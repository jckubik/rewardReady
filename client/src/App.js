import React from "react";
import { Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";
import "./App.css";
// import LocateMe from "./Components/LocateMe";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddCard from "./components/AddCard";

// import "./styles/output.css";

function App() {
  // const [apiResponse, setApiResponse] = useState();

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
        <Route path="/" element={<Home />} />
      </Routes>
      <AddCard />
      <Footer />
    </div>
  );
}

export default App;
