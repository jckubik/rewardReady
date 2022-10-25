import Login from "../Login";
import Register from "../Register";
import { useState } from "react";

const LoginRegister = ({ show, setShow }) => {
  const [popupDisplay, setPopupDisplay] = useState("login");
  return show ? (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter"
      onClick={() => {
        setShow(false);
        setPopupDisplay("login");
      }}
    >
      {popupDisplay === "login" && <Login setPopupDisplay={setPopupDisplay} />}
      {popupDisplay === "register" && (
        <Register
          setPopupDisplay={setPopupDisplay}
          setPopupVisibility={setShow}
        />
      )}
    </div>
  ) : null;
};

export default LoginRegister;
