import React, { useContext, useRef, useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../reduxSlices/userSlice";
import { setAccessToken } from "../utils/auth";

const Login = ({ setPopupDisplay, setPopupVisibility }) => {
  const dispatch = useDispatch();
  const email_r = useRef();
  const password_r = useRef();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = email_r.current.value;
    const password = password_r.current.value;

    try {
      let loginResponse = await api.login({ email, password });
      let token = loginResponse.token;
      let user = loginResponse.user;
      // setAccessToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setUser(user));
      setPopupVisibility(false);
      console.log(token);
    } catch (err) {
      setError("Incorrect Email/password");
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
      <a href="/" className="text-shamrock-green underline">
        Forgot Password?
      </a>
      <div
        className="text-shamrock-green underline cursor-pointer"
        onClick={() => {
          setPopupDisplay("register");
        }}
      >
        Register
      </div>
      <a href="/" className="text-shamrock-green underline">
        Help
      </a>
    </div>
  );
};

export default Login;
