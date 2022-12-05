import React, { useContext, useRef, useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import { useDispatch } from "react-redux";
import { login } from "../reduxSlices/userSlice";
import { getWallet } from "../reduxSlices/walletSlice";
import { Link } from "react-router-dom";

const Login = ({ setShow }) => {
  const dispatch = useDispatch();
  const email_r = useRef();
  const password_r = useRef();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = email_r.current.value;
    const password = password_r.current.value;

    try {
      dispatch(login(email, password));
      setShow("inactive");
    } catch (err) {
      console.log(err);
      setError("Incorrect Email/Password");
      return;
    }
  };

  return (
    <div
      className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-3xl font-bold">Login</h2>
      <form className="w-full flex flex-col gap-3">
        <Input
          placeholder="Enter Email"
          type="email"
          className="w-full rounded-sm py-2"
          name="email"
          ref={email_r}
          icon={<FontAwesomeIcon icon={solid("envelope")} />}
        />
        <Input
          placeholder="Enter Password"
          type="password"
          className="w-full rounded-sm py-2"
          name="password"
          ref={password_r}
          icon={<FontAwesomeIcon icon={solid("key")} />}
        />
      </form>
      <button className="cta-btn" onClick={handleSubmit}>
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <div
        className="text-shamrock-green underline cursor-pointer"
        onClick={() => {
          setShow("forgotPassword");
        }}
      >
        Forgot Password?
      </div>
      <div
        className="text-shamrock-green underline cursor-pointer"
        onClick={() => {
          setShow("register");
        }}
      >
        Register
      </div>
      <div onClick={() => {setShow("inactive");}}>
      <Link to="/faq" className="text-shamrock-green underline">
        Help
      </Link>
      </div>
    </div>
  );
};

export default Login;
