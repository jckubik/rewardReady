import Login from "../Login";
import Register from "../Register";
import { useState } from "react";
import ForgotPassword from "../ForgotPassword";

const LoginRegister = ({ show, setShow }) => {
  // const [popupDisplay, setPopupDisplay] = useState("login");
  return show !== "inactive" ? (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter"
      onClick={() => {
        setShow("inactive");
      }}
    >
      {show === "login" && <Login setShow={setShow} />}
      {show === "register" && <Register setShow={setShow} />}
      {show === "forgotPassword" && <ForgotPassword />}
    </div>
  ) : null;
};

export default LoginRegister;
