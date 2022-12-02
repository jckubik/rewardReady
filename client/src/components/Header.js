import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import LoginRegister from "./popups/LoginRegister";
import LocateMe from "./popups/LocateMe";

import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reduxSlices/userSlice";

const Header = (props) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginRegister, setShowLoginRegister] = useState("inactive");
  const [showLocationUpdater, setShowLocationUpdater] = useState(false);
  // const [storeName, setStoreName] = useState("");
  const [cityName, setCityName] = useState("");
  const [stateName, setStateName] = useState("");
  const [displayLocation, setDisplayLocation] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  // const changeStore = (storeData) => {
  //   setStoreName(storeData);
  //   localStorage.setItem('storeName', JSON.stringify(storeData));
  // };

  const changeCity = (cityData) => {
    localStorage.setItem("cityName", JSON.stringify(cityData));
    setCityName(cityData);
  };

  const changeState = (stateData) => {
    setStateName(stateData);
    localStorage.setItem("stateName", JSON.stringify(stateData));
  };

  const changeDisplayLoc = (boolLoc) => {
    setDisplayLocation(boolLoc);
  };

  useEffect(() => {
    // const storeData = localStorage.getItem('storeName');
    const cityData = localStorage.getItem("cityName");
    const stateData = localStorage.getItem("stateName");
    // setStoreName(JSON.parse(storeData));
    setCityName(JSON.parse(cityData));
    setStateName(JSON.parse(stateData));
  }, []);

  return (
    <>
      <div className="w-full h-32 bg-light-gray ">
        <div className="mx-2 h-full relative items-center flex">
          <div className="flex w-full">
            <div className="flex-1 font-carter-one text-3xl text-left">
              <Link to="/">
                <span className="text-steel-blue inline-block align-middle">
                  Reward
                </span>
                <span className="text-amazon inline-block align-middle">
                  Ready
                </span>
              </Link>
            </div>
            <div className="flex-0 flex items-center">
              <div className="relative">
                <input
                  type="search"
                  className="h-9 rounded-xl body pl-2 pr-10 w-72"
                  placeholder="Search for deals, coupons, and merchants"
                />
                <button className="absolute right-3 bottom-2">
                  <FontAwesomeIcon icon={solid("magnifying-glass")} />
                </button>
              </div>
            </div>
            <div className=" text-left flex items-center">
              <a
                onClick={() => setShowLocationUpdater(true)}
                className="pl-3 cursor-pointer"
              >
                <FontAwesomeIcon icon={solid("map-location")} />
                <span className="pl-2 font-sm text-amazon font-semibold">
                  {cityName == "" ||
                  cityName == undefined ||
                  cityName == null ||
                  (stateName == "" && displayLocation == false)
                    ? "Enter Location"
                    : `${cityName}, ${stateName}`}
                </span>
              </a>
            </div>
            <div className="relative flex flex-1 text-center items-center justify-end">
              <span className="flex align-middle">
                <FontAwesomeIcon icon={regular("circle-user")} className="h-6" />
              </span>
              {user ? (
                <div className="flex">
                  <span
                    className="body pl-1 inline-block align-middle cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    {user.firstName}
                  </span>
                  {showDropdown && (
                    <div
                      className="absolute right-0 top-full z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      onClick={() => setShowDropdown(!showDropdown)}
                      onMouseLeave={() => setShowDropdown(!showDropdown)}
                    >
                      <div className="py-1" role="none">
                        <Link
                          to="/personal"
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Personal
                        </Link>
                        <Link
                          to="/cards"
                          className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          Card Info
                        </Link>
                        <div
                          to="/"
                          className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                          onClick={logoutHandler}
                        >
                          Log out
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="body pl-1 inline-block align-middle cursor-pointer">
                  <span
                    className="text-shamrock-green underline"
                    onClick={() => setShowLoginRegister("login")}
                  >
                    Sign-In
                  </span>
                  &nbsp;or&nbsp;
                  <span
                    className="text-shamrock-green underline"
                    onClick={() => setShowLoginRegister("register")}
                  >
                    Register
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <LoginRegister show={showLoginRegister} setShow={setShowLoginRegister} />
      <LocateMe
        changeState={changeState}
        changeCity={changeCity}
        show={showLocationUpdater}
        setShow={setShowLocationUpdater}
        changeDisplayLoc={changeDisplayLoc}
      />
    </>
  );
};

export default Header;
