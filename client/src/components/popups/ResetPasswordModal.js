import { useState } from "react";
import ResetPassword from "../ResetPassword";

const ResetPasswordModal = () => {
  const [show, setShow] = useState(true);
  const [popupDisplay, setPopupDisplay] = useState("reset");

  return show ? (
    <div
      className="w-screen h-screen fixed bg-[#0000009d] top-0 z-50 grid place-items-center font-inter"
      onClick={() => {
        setShow(false);
      }}
    >

      { popupDisplay === "reset" && <ResetPassword />}

    </div>
  )
  : null;
};

export default ResetPasswordModal
