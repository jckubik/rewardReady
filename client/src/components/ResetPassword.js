import { useState } from "react";
import { useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { resetPassword, getEmail, logout, sendResetRequest } from "../reduxSlices/userSlice";
import { useDispatch, useSelector } from "react-redux";


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [newPasswordError, setNewPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [expirationError, setExpirationError] = useState(false);
    const [resetComplete, setResetComplete] = useState(false);
    const [sentResetEmail, setSentResetEmail] = useState(false);
    // const [userEmail, setUserEmail] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useDispatch();
    const { resetEmail } = useSelector(state => state.user);
    const token = searchParams.get("token");
    const expirationDate = searchParams.get("expirationDate");
    const currentDate = Date.now();

    // Called when user hits "Reset Password" button
    const handleSubmit = async (event) => {
      event.preventDefault();

      // Do nothing if there are still errors
      if (newPasswordError || confirmPasswordError || passwordMatchError) {
        return;
      } else if (currentDate <= expirationDate) {
        // Reset the password and clear the token
        await dispatch(resetPassword(newPassword));
        setResetComplete(true);
      } else {
        // Else, grab user email to send new request
        await dispatch(getEmail());
        // Set the email
        // setUserEmail(resetEmail);
        setExpirationError(true);
      }
      // await api.logout();
      await dispatch(logout());
    };

    // Called when user clicks "Send New Reset Email" button
    const handleSendReset = async (event) => {
      event.preventDefault();

      // Send email
      await dispatch(sendResetRequest(resetEmail));

      setExpirationError(false);
      setSentResetEmail(true);
    }



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

        // Message for expired link
        expirationError ? 
          <div className="flex flex-col gap-5">
            <p>Your reset link has expired.</p>
            <button className="cta-btn" onClick={handleSendReset}>
              Send New Reset Email
            </button>
          </div> :

        // Message for confirming reset email sent
        sentResetEmail ?
          <div>
            <p>New Password Reset Sent.</p>
          </div> : 

        // Main reset form
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