import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import LoginRegister from "./popups/LoginRegister";

import "../css/Header.css";
import session from "../context/user";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, setUser } = useContext(session);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLoginRegister, setShowLoginRegister] = useState(false);

  const logoutHandler = () => {
    setUser(null);
  };
  return (
    <>
      <div className="w-full h-32 bg-light-gray ">
        <div className="mx-2 h-full relative items-center flex">
          <div className="absolute top-0 right-0 pt-2">
            <span className="inline-block align-middle">
              <FontAwesomeIcon icon={regular("circle-user")} className="h-6" />
            </span>
            {user ? (
              <div>
                <span
<<<<<<< HEAD
<<<<<<< HEAD
                  className="body pl-1 inline-block align-middle cursor-pointer"
=======
                  className="font-inter text-sm pl-1 inline-block align-middle cursor-pointer"
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
=======
                  className="body pl-1 inline-block align-middle cursor-pointer"
>>>>>>> f090e48 (144-frontend: Refactored code)
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {user.user.firstName}
                </span>
                {showDropdown && (
                  <div
                    class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <div class="py-1" role="none">
                      <Link
<<<<<<< HEAD
<<<<<<< HEAD
                        to="/personal"
=======
                        to="/setting/personal"
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
=======
                        to="/personal"
>>>>>>> f090e48 (144-frontend: Refactored code)
                        class="text-gray-700 block px-4 py-2 text-sm"
                      >
                        Personal
                      </Link>
                      <Link
<<<<<<< HEAD
<<<<<<< HEAD
                        to="/cards"
=======
                        to="/setting/cards"
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
=======
                        to="/cards"
>>>>>>> f090e48 (144-frontend: Refactored code)
                        class="text-gray-700 block px-4 py-2 text-sm"
                      >
                        Card Info
                      </Link>
                      <div
                        to="/"
                        class="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                        onClick={logoutHandler}
                      >
                        Log out
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <span
<<<<<<< HEAD
<<<<<<< HEAD
                className="body pl-1 inline-block align-middle cursor-pointer"
=======
                className="font-inter text-sm pl-1 inline-block align-middle cursor-pointer"
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
=======
                className="body pl-1 inline-block align-middle cursor-pointer"
>>>>>>> f090e48 (144-frontend: Refactored code)
                onClick={() => setShowLoginRegister(true)}
              >
                Sign in or Register
              </span>
            )}
          </div>
          <div className="flex w-full">
            <div className="flex-1 font-carter-one text-3xl text-left">
              <span className="text-steel-blue inline-block align-middle">
                Reward
              </span>
              <span className="text-amazon inline-block align-middle">
                Ready
              </span>
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
            <div className="flex-1 text-left flex items-center">
              <a href="/" className="pl-3">
                <FontAwesomeIcon icon={solid("map-location")} />
                <span className="pl-2 font-sm text-amazon font-semibold">
                  Enter Location
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <LoginRegister show={showLoginRegister} setShow={setShowLoginRegister} />
    </>
  );
};

export default Header;
