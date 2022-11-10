import React, { useRef } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { PORT } from "../constants";
import api from "../utils/api";

const Register = ({ setPopupDisplay, setPopupVisibility }) => {
  const firstName_r = useRef();
  const lastName_r = useRef();
  const email_r = useRef();
  const phone_r = useRef();
  const password_r = useRef();
  const confirmPassword_r = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = firstName_r.current.value;
    const lastName = lastName_r.current.value;
    const email = email_r.current.value;
    const phone = phone_r.current.value;
    const password = password_r.current.value;
    const confirmPassword = confirmPassword_r.current.value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      // fetch(`http://localhost:${PORT}/api/user/register`, {
      //   body: JSON.stringify({
      //     firstName: firstName,
      //     lastName: lastName,
      //     phoneNumber: phone || null,
      //     email: email,
      //     password: password,
      //   }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   method: "POST",
      // })
      let data = {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone || null,
        email: email,
        password: password,
      };
      api.createUser(data).then((res) => {
        if (res.status === 200) {
          alert("Account created successfully");
          setPopupVisibility(false);
        } else {
          console.log(res);
          alert("Account creation failed");
        }
      });
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div
      className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-3xl font-bold">Create Your Free Account</h2>
      <form className="w-full flex flex-col gap-3">
        <div className="flex gap-3">
          <Input
            placeholder="Enter First Name"
            className="w-full rounded-sm py-2"
            name="firstName"
            ref={firstName_r}
            icon={<FontAwesomeIcon icon={regular("circle-user")} />}
          />
          <Input
            placeholder="Enter Last Name"
            className="w-full rounded-sm py-2"
            name="lastName"
            ref={lastName_r}
            icon={<FontAwesomeIcon icon={regular("circle-user")} />}
          />
        </div>
        <Input
          placeholder="Enter Email"
          type="email"
          className="w-full rounded-sm py-2"
          name="email"
          ref={email_r}
          icon={<FontAwesomeIcon icon={solid("envelope")} />}
        />
        <Input
          placeholder="Enter Phone Number"
          className="w-full rounded-sm py-2"
          name="number"
          ref={phone_r}
          icon={<FontAwesomeIcon icon={solid("phone")} />}
        />
        <Input
          placeholder="Enter Password"
          type="password"
          className="w-full rounded-sm py-2"
          name="password"
          ref={password_r}
          icon={<FontAwesomeIcon icon={solid("key")} />}
        />
        <Input
          placeholder="Confirm Password"
          type="password"
          className="w-full rounded-sm py-2"
          name="confirm_password"
          ref={confirmPassword_r}
          icon={<FontAwesomeIcon icon={solid("key")} />}
        />
      </form>
      <div className="flex flex-col gap-4">
        <button className="cta-btn w-full" onClick={handleSubmit}>
          Create Account
        </button>
        <div className="flex gap-4">
          <button
            className="cta-btn w-1/2"
            onClick={() => setPopupVisibility(false)}
          >
            Cancel
          </button>
          <button className="cta-btn w-1/2">Enter As Guest</button>
        </div>
      </div>
      <div
        className="text-shamrock-green underline cursor-pointer"
        onClick={() => {
          setPopupDisplay("login");
        }}
      >
        Already Have an Account? Sign In
      </div>
      <a href="/" className="text-shamrock-green underline">
        Help
      </a>
    </div>
  );
};

export default Register;
