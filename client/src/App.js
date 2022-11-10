<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
<<<<<<< HEAD
<<<<<<< HEAD
// import Setting from "./pages/Setting";
import Personal from "./pages/Personal";
import Cards from "./pages/Cards";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import AddCard from "./components/AddCard";
=======
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import './App.css';
// import LocateMe from "./Components/LocateMe";
import Home from './pages/Home';
import Setting from './pages/Setting';
import Personal from './pages/Setting/Personal';
import Cards from './pages/Setting/Cards';
import Header from './components/Header';
import Footer from './components/Footer';
import AddCard from './components/AddCard';
import FindCoupon from './components/FindCoupon';
import RecommendDisplay from './components/RecommendDisplay';
import LocateMe from './components/LocateMe';
>>>>>>> 941c318 (Fixed frontend for card recommendation)
=======
import Setting from "./pages/Setting";
import Personal from "./pages/Setting/Personal";
import Cards from "./pages/Setting/Cards";
=======
// import Setting from "./pages/Setting";
import Personal from "./pages/Personal";
import Cards from "./pages/Cards";
>>>>>>> f090e48 (144-frontend: Refactored code)
import Header from "./components/Header";
import Footer from "./components/Footer";
// import AddCard from "./components/AddCard";
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)

import session from "./context/user";

function App() {
<<<<<<< HEAD
  // const [apiResponse, setApiResponse] = useState();
  const [store, setStore] = useState({data:""});

  const changeState = (storeData) => {
    setStore(storeData);
  };
=======
  const [user, setUser] = useState(null);
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)

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
<<<<<<< HEAD
<<<<<<< HEAD
          <Route path="personal" element={<Personal />} />
          <Route path="cards" element={<Cards />} />
<<<<<<< HEAD
        </Routes>
        <Footer />
      </div>
    </session.Provider>
=======
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* <LocateMe data={store.data} changeState={changeState} /> */}
      {/* <AddCard /> */}
      {/* <FindCoupon /> */}
      {/* <RecommendDisplay store={store.data}/> */}
      <Footer />
    </div>
>>>>>>> 941c318 (Fixed frontend for card recommendation)
=======
          <Route path="setting" element={<Setting />}>
            <Route path="personal" element={<Personal />} />
            <Route path="cards" element={<Cards />} />
          </Route>
=======
          {/* <Route path="personal" element={<Setting />} /> */}
          <Route path="personal" element={<Personal />} />
          <Route path="cards" element={<Cards />} />
>>>>>>> f090e48 (144-frontend: Refactored code)
        </Routes>
        {/* <AddCard /> */}
        <Footer />
      </div>
    </session.Provider>
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
  );
}

export default App;
