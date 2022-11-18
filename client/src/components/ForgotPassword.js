import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { sendResetRequest } from "../reduxSlices/userSlice";
import { useDispatch } from "react-redux";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [sentResetEmail, setSentResetEmail] = useState(false);
  const dispatch = useDispatch();

  // Called when user hits "Reset Password" button
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Do nothing if there are still errors
    if (!emailError) {
      // Send email
      await dispatch(sendResetRequest(email));
      setSentResetEmail(true);
    }
  };

  // Checks that the current input is a valid email
  const isValidPassword = (email) => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return !emailRegex.test(email);
  };

  return (
    <div
    className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
    onClick={(e) => e.stopPropagation()}
    >
      
      <h2 className="text-3xl font-bold">Forgot Password</h2>
      {
        sentResetEmail ? 
          <div>
            <p>Password reset successfully!</p>
          </div> : 

      <form className="w-full flex flex-col gap-3">
          <div className="relative">
            <input
                placeholder="Email"
                type="email"
                className="w-full rounded-sm py-2 pl-10"
                name="email"
                icon={<FontAwesomeIcon icon={solid("envelope")}/>}
                onChange={(event) => {
                  setEmail(event.target.value);
                  const valid = isValidPassword(event.target.value);
                  setEmailError(valid);
                  }
                }
                />
                <div className="left-3 bottom-2 absolute">{<FontAwesomeIcon icon={solid("key")} />}</div>
          </div>
          {emailError ? <p className="text-xs text-red-500" >Invalid email.</p> : null}
          <button className="cta-btn" onClick={handleSubmit}>
            Reset Password
          </button>
        </form>}
    </div>
  );
};

export default ForgotPassword;