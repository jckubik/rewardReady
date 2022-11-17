import { useState } from "react";
import { useParams, useSearchParams } from 'react-router-dom'
import Input from "./utils/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { clearCookies, setExpToken } from "../utils/auth";
import api from "../utils/api";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);
    // const { token, expirationDate } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token");
    const expirationDate = searchParams.get("expirationDate");
    const currentDate = Date.now();

    // Called when user hits "Reset Password" button
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(expirationDate);

      // Do nothing if there are still errors
      if (newPasswordError || confirmPasswordError || passwordMatchError) {
        return;
      } else if (currentDate <= expirationDate) {
        // Else set the token from the URL link
        setExpToken(token);
        // Reset the password and clear the token
        await api.resetPassword({ newPassword });
        clearCookies();
        setResetComplete(true);
      } else {
        console.log("error");
      }

    };

    // Checks that the current input is a valid password
    const isValidPassword = (password) => {
      const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      return !passwordRegex.test(password);
    };

  return (
      <div
      className="bg-[#e4e7ea] flex flex-col gap-5 text-center py-10 px-10 min-w-[500px] rounded-lg"
      onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold">Reset Password</h2>
        { resetComplete ? 
      <div>
        <p>Password reset successfully!</p>
      </div> :
        (<form className="w-full flex flex-col gap-3">
          <div className="relative">
            <input
                placeholder="New Password"
                type="password"
                className="w-full rounded-sm py-2 pl-10"
                name="newPassword"
                icon={<FontAwesomeIcon icon={solid("key")} />}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                  const valid = isValidPassword(event.target.value);
                  setNewPasswordError(valid);
                  if (!valid) {
                    setPasswordMatchError(event.target.value === confirmPassword);
                  }
                  }
                }
                />
                <div className="left-3 bottom-2 absolute">{<FontAwesomeIcon icon={solid("key")} />}</div>
          </div>
          <div>
            {newPasswordError ? <p className="text-xs text-red-500" >Invalid password.</p> : null}
          </div>

          <div className="relative">
            <input
              placeholder="Confirm Password"
              type="password"
              className="w-full rounded-sm py-2 pl-10"
              name="confirmPassword"
              icon={<FontAwesomeIcon icon={solid("key")} />}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                const valid = isValidPassword(event.target.value);
                setConfirmPasswordError(valid);
                if (!valid) {
                  setPasswordMatchError(event.target.value !== newPassword);
                }
                }
              }
            />
            <div className="left-3 bottom-2 absolute">{<FontAwesomeIcon icon={solid("key")} />}</div>
          </div>
            {confirmPasswordError ? <p className="text-xs text-red-500" >Invalid password.</p> : null}
            {passwordMatchError ? <p className="text-xs text-red-500" >Passwords do not match.</p> : null}
        <button className="cta-btn" onClick={handleSubmit}>
          Reset Password
        </button>
        </form>)}
    </div>
  );
};

export default ResetPassword;