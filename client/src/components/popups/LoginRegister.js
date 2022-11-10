import Login from "../Login";
import Register from "../Register";
import { useState } from "react";

const LoginRegister = ({ show, setShow }) => {
  const [popupDisplay, setPopupDisplay] = useState("login");
  return show ? (
    <div
<<<<<<< HEAD
<<<<<<< HEAD
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center"
=======
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter"
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
=======
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center"
>>>>>>> f090e48 (144-frontend: Refactored code)
      onClick={() => {
        setShow(false);
        setPopupDisplay("login");
      }}
    >
<<<<<<< HEAD
      {popupDisplay === "login" && <Login setPopupDisplay={setPopupDisplay} setPopupVisibility={setShow}/>}
=======
      {popupDisplay === "login" && <Login setPopupDisplay={setPopupDisplay} />}
>>>>>>> e3c2ab1 (144: Added login, register, and account profile page)
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
