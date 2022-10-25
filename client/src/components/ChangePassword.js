import React, { useContext, useRef, useState } from "react";
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { PORT } from "../constants";
import session from "../context/user";

const ChangePassword = ({ setVisible }) => {
  const currentPassword_r = useRef();
  const password_r = useRef();

  return (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter"
      onClick={() => setVisible(false)}
    >
      <div
        className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold">Login</h2>
        <form className="w-full flex flex-col gap-3">
          <div>
            <div className="w-full text-left">Enter Current Password</div>
            <Input
              placeholder="Enter Email"
              type="password"
              className="w-full rounded-sm py-2"
              name="password"
              ref={currentPassword_r}
            >
              <FontAwesomeIcon icon={solid("key")} />
            </Input>
          </div>
          <div>
            <div className="w-full text-left">Enter New Password</div>
            <Input
              placeholder="Enter Password"
              type="password"
              className="w-full rounded-sm py-2"
              name="password"
              ref={password_r}
            >
              <FontAwesomeIcon icon={solid("key")} />
            </Input>
          </div>
        </form>
        <button className="cta-btn" onClick={() => setVisible(false)}>
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
