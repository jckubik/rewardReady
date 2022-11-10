import React, { useContext, useRef, useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { PORT } from "../constants";
import session from "../context/user";
<<<<<<< HEAD
import api from "../utils/api";

const Login = ({ setPopupDisplay, setPopupVisibility }) => {
=======

const Login = ({ setPopupDisplay }) => {
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
  const email_r = useRef();
  const password_r = useRef();

  const [error, setError] = useState("");

  const { setUser } = useContext(session);

<<<<<<< HEAD
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = email_r.current.value;
    const password = password_r.current.value;

    try {
      let loginResponse = await api.login({ email, password });
      console.log(loginResponse);
      setUser(loginResponse);
      setPopupVisibility(false);
    } catch (err) {
      console.log(err);
      setError("Incorrect Email/password");
      return;
=======
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = email_r.current.value;
    const password = password_r.current.value;
    try {
      fetch(`http://localhost:${PORT}/api/user/login`, {
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => {
          if (res.status === 200) {
            // setVisible(false);
            console.log(res);
          } else {
            setError("Incorrect Email/password");
            return;
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setUser(data);
        });
    } catch (e) {
      console.error(e.message);
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
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
<<<<<<< HEAD
<<<<<<< HEAD
          icon={<FontAwesomeIcon icon={solid("envelope")} />}
        />
=======
        >
          <FontAwesomeIcon icon={solid("envelope")} />
        </Input>
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
=======
          icon={<FontAwesomeIcon icon={solid("envelope")} />}
        />
>>>>>>> f090e48 (144-frontend: Refactored code)
        <Input
          placeholder="Enter Password"
          type="password"
          className="w-full rounded-sm py-2"
          name="password"
          ref={password_r}
<<<<<<< HEAD
<<<<<<< HEAD
          icon={<FontAwesomeIcon icon={solid("key")} />}
        />
=======
        >
          <FontAwesomeIcon icon={solid("key")} />
        </Input>
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
=======
          icon={<FontAwesomeIcon icon={solid("key")} />}
        />
>>>>>>> f090e48 (144-frontend: Refactored code)
      </form>
      <button className="cta-btn" onClick={handleSubmit}>
        Login
      </button>
      {error && <p className="text-red-500">{error}</p>}
      <a href="/" className="text-shamrock-green underline">
        Forgot Password?
      </a>
      {/* <button className="cta-btn" onClick={setClickRegister(true)}>
        register
      </button> */}
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
